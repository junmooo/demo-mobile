import request from './axios';

export function getList(params: ApproveParams) {
  return request({
    url: `/WebMobile/api/batch/getApproveList`,
    method: 'get',
    params,
  }).then((res) => {
    if (res.data.retStatus === '1') {
      return Promise.resolve(res?.data?.data || {});
    }
  });
}

// 查询审批类型
export function getApproveTypeList() {
  return request({
    url: `/WebMobile/api/batch/getApproveTypeList`,
    method: 'get',
    params: {},
  }).then((res) => {
    if (res.data.retStatus === '1') {
      return Promise.resolve(
        res?.data?.data.map((item: ApproveType) => {
          return { text: item.workflowTypeName, value: item.workflowTypeCode };
        }) || [],
      );
    }
  });
}

// 查看附件
export function getFile(fileId: string) {
  return request({
    url: `/WebMobile/common/getFile?fileId=${fileId}`,
    method: 'get',
  });
}

// 批量审批
export function approval(data: BatchApprove) {
  return request({
    url: `/WebMobile/api/batch/approve`,
    method: 'post',
    data: JSON.stringify(data),
    headers: { 'content-type': 'text/plain' },
  });
}

function formatAppInfo(data: appInfoOri[][]) {
  if (!data || data?.length === 0) {
    return [];
  }
  const info = data?.map((element: appInfoOri[]) => {
    const tmpObj: AppInfo = {
      name: '',
      opinions: '',
      approvalTime: '',
      comments: null,
    };
    element.forEach((item: appInfoOri) => {
      switch (item.name) {
        case 'approverName':
          tmpObj.name = item.text;
          break;
        case 'approvalStatusValue':
          tmpObj.opinions = item.text;
          break;
        case 'approvalTime':
          tmpObj.approvalTime = item.text;
          break;
        case 'approvalComments':
          tmpObj.comments = item.text;
          break;
      }
    });
    return tmpObj;
  });
  return info;
}

// 获取详情
export function getDetail(params: { id: number | undefined; approveTypeCode: number | undefined }) {
  return request({
    url: `/WebMobile/api/batch/getDetail/${params.id}?workflowTypeCode=${params.approveTypeCode}`,
    // url: `/WebMobile/api/batch/getDetail/1761?workflowTypeCode=${params.approveTypeCode}`,
    method: 'get',
  }).then((res) => {
    if (res.data.retStatus === '1') {
      const info = formatAppInfo(res.data.data.appInfo.items);
      res.data.data.info = info;
      return Promise.resolve(res.data.data);
    }
  });
}
