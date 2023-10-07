export interface FcResponse<T> {
  code: string;
  message: string;
  data: T | null;
}
