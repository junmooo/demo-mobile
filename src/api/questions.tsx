import request from "./axios";

export async function addQuestions(params: Question) {
  const res = await request({
    url: `/api/interview/addQuestion`,
    method: "post",
    data: params,
  });
  if (res.data.retStatus === 1) {
    return Promise.resolve(res?.data?.data || {});
  }
}
