interface ApproveUrlParams {
  language?: 'zh_CN' | 'en_US' | undefined;
  easyToken?: string | undefined;
}

interface ApproveParams extends ApproveUrlParams {
  isApproved: number;
  pageSize: number;
  page: number;
  workflowTypeCode?: number;
}

interface File {
  fileName: string;
  src: string;
  type: string;
}

type BatchApprove = {
  idList: string;
  agreeFlag: number;
  approveRemark: string | undefined;
  workflowTypeCode: number | undefined;
};

interface CommonResponse {
  retStatus: number;
  errmsg: string | null;
}

interface displayItem {
  value: number;
  label: number;
  displayFlag: number;
}

interface Approveinfo {
  title: string;
  tip: string | null;
  billtraceId: number;
  orderId: number;
  approveStatus: string | null;
  approveType: string;
  displayItemList: displayItem[];
  approveStatusCode: number;
  approveTypeCode: number;
}
interface ApproveResponse extends CommonResponse {
  data?: {
    approveInfoList: Approveinfo[];
    dataTotal: number;
    pageTotal: number;
  } | null;
}

interface ApproveType {
  workflowTypeName: string;
  workflowTypeCode: string;
}

interface ApproveDetail {
  baseInfo: {
    applicant: { empId: number; photo: string };
    items: { label: string; show: number; text: string }[];
    title: string;
  };
  inApprove: number;
  appInfo: { items: appInfoOri[] }[];
  info?: AppInfo[];
}

type AppInfo = {
  name: string;
  opinions: string;
  approvalTime: string;
  comments: string | null;
};

type appInfoOri = { label: string; name: string; text: string; show: number };
