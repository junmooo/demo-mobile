import { Question } from "@/custom_types/question";
import request from "./axios";

export async function addOrUpdateQuestion(params: Question) {
  return await request({
    url: `/api/interview/addOrUpdateQuestion`,
    method: "post",
    data: params,
  });
}
export async function questions(params: Question) {
  return await request({
    url: `/api/interview/questions`,
    method: "post",
    data: params,
  });
}
export async function deleteQuestion(params: Question) {
  return await request({
    url: `/api/interview/deleteQuestion`,
    method: "get",
    params,
  });
}
