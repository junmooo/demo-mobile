/**
 * 任务状态
 */
export enum StatusEnum {
  null,
  /** 待处理 */
  Pending,
  /** 已处理 */
  Processed,
}

/**
 * 审批状态
 */
export enum ApprovalsStatusEnum {
  /** 拒绝 */
  Disapproved,
  /** 同意 */
  Approved,
  /** 其它 */
  Other,
}

export enum ApproveType {
  Leave = 13204,
  OverTime = 13408,
}

/**
 * 审批状态相对应的文本颜色
 */
export const approvalsStatusTextColor: Record<number, string> = {
  [ApprovalsStatusEnum.Approved]: 'rgba(38, 191, 38, 1)',
  [ApprovalsStatusEnum.Disapproved]: 'rgba(250, 44, 25, 1)',
  [ApprovalsStatusEnum.Other]: '#666',
};
