/**
 * 클래스 문자열 조립 헬퍼.
 *
 * 주의: 클래스는 반드시 리터럴 문자열이어야 한다.
 * Tailwind v4 스캐너는 `btn-${color}` 같은 템플릿 리터럴을 읽지 못하므로,
 * 조건부 클래스는 항상 리터럴 룩업 맵(`Record<T, string>`)을 거쳐서 넣는다.
 */
export function cx(...parts: unknown[]): string {
  // `cond && 'class'`에서 cond가 ReactNode일 수 있으므로 문자열만 남긴다
  return parts.filter((part): part is string => typeof part === 'string' && part !== '').join(' ');
}

/** daisyUI 시맨틱 색상 */
export type Color =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

/** daisyUI 크기 스케일 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** 상태 표현용 색상 (성공/경고/오류/정보) */
export type StatusColor = 'info' | 'success' | 'warning' | 'error';
