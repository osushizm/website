import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export function formatDate(date: Date, formatStr: string = 'yyyy年MM月dd日'): string {
  return format(date, formatStr, { locale: ja });
}

export function formatDateISO(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function formatDateTime(date: Date): string {
  return format(date, 'yyyy年MM月dd日 HH:mm', { locale: ja });
}
