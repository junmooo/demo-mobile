import request from "./axios";

export function upload(params: FormData) {
  return request({
    url: `/api/upload`,
    method: "post",
    data: params,
  }).then((res) => {
    if (res.data.retStatus === "1") {
      return Promise.resolve(res?.data?.data || []);
    }
  });
}
