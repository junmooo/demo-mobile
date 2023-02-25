import { AxiosRequestConfig } from "axios";

type Message = {
  id?: string;
  messageContent?: string;
  style?: string;
  authorId?: string;
  authorName?: string;
  createdTime?: number;
  updatedTime?: number;
  type?: string;
  comment?: string;
};

type CardStyle = { angle: string; bgc: string; ftc: string; sdc: string };

declare module "axios" {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
}
