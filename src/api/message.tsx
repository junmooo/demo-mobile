import { Message } from "@/custom_types/message";
import request from "./axios";

export async function addOrUpdate(params: Message) {
  return await request({
    url: `/api/message/addOrUpdate`,
    method: "post",
    data: params,
  });
}
export async function query(params: Message) {
  return await request({
    url: `/api/message/query`,
    method: "post",
    data: params,
  });
}
export async function deleteMessage(params: Message) {
  return await request({
    url: `/api/message/delete`,
    method: "get",
    params,
  });
}
