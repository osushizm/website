interface Env {
  DB: D1Database;
}

interface ViewRequest {
  slug: string;
}

interface ViewResponse {
  count: number;
  success: boolean;
}

// 簡易的なbot検出
function isBot(userAgent: string | null): boolean {
  if (!userAgent) return true;
  
  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python/i,
  ];
  
  return botPatterns.some(pattern => pattern.test(userAgent));
}

// レート制限用のキャッシュキー生成
function getRateLimitKey(ip: string, slug: string): string {
  return `ratelimit:${ip}:${slug}`;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    
    // User-Agentチェック（簡易bot対策）
    const userAgent = request.headers.get('User-Agent');
    if (isBot(userAgent)) {
      return new Response(JSON.stringify({ success: false, error: 'Bot detected' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // リクエストボディの解析
    const body = await request.json() as ViewRequest;
    const { slug } = body;
    
    if (!slug) {
      return new Response(JSON.stringify({ success: false, error: 'Slug is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // D1データベースに閲覧数を記録
    const now = new Date().toISOString();
    
    // UPSERT: 存在する場合は+1、存在しない場合は新規作成
    await env.DB.prepare(`
      INSERT INTO views (slug, count, updated_at)
      VALUES (?, 1, ?)
      ON CONFLICT(slug) DO UPDATE SET
        count = count + 1,
        updated_at = ?
    `).bind(slug, now, now).run();
    
    // 更新後のカウントを取得
    const result = await env.DB.prepare(
      'SELECT count FROM views WHERE slug = ?'
    ).bind(slug).first<{ count: number }>();
    
    const count = result?.count || 1;
    
    return new Response(JSON.stringify({ success: true, count }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // 本番環境では適切なオリジンを設定
      },
    });
  } catch (error) {
    console.error('View count error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// GET: 閲覧数を取得（カウントアップなし）
export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    
    if (!slug) {
      return new Response(JSON.stringify({ success: false, error: 'Slug is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const result = await env.DB.prepare(
      'SELECT count FROM views WHERE slug = ?'
    ).bind(slug).first<{ count: number }>();
    
    const count = result?.count || 0;
    
    return new Response(JSON.stringify({ success: true, count }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('View count fetch error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// CORS対応
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
