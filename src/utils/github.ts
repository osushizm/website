export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
}

export async function getPinnedRepos(username: string): Promise<GitHubRepo[] | null> {
  try {
    // GitHub GraphQL APIを使用してピン留めリポジトリを取得
    // 本番環境ではGitHub Personal Access Tokenが必要
    // ここでは簡易的にREST APIでユーザーのリポジトリを取得
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    
    if (!response.ok) {
      console.error('GitHub API error:', response.status);
      return null;
    }
    
    const repos: GitHubRepo[] = await response.json();
    return repos.slice(0, 6);
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
    return null;
  }
}

export function getGitHubProfileUrl(username: string): string {
  return `https://github.com/${username}`;
}
