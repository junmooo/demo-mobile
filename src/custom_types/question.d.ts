import { AxiosRequestConfig } from "axios";

type Question = {
  id?: number;
  question?: string;
  answer?: string;
  options?: string;
  right?: string;
  explanation?: string;
  // 00 java 01 web
  type?: string;
  comment?: string;
};

declare module "axios" {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
}