/// <reference types="react-scripts" />

declare namespace API {
  type BaseApiResult<T = unknown> = {
    success: boolean;
    data: T;
    errorCode?: number;
    errorMessage?: string | Record<unknown, unknown>;
  };

  type ApprovalList = Partial<ApprovalListItem>[];

  type ApprovalListItem = {
    id: number;
    /** 类型 */
    type: number;
    type_display: string;
    /** 状态（待处理、已处理） */
    status: number;
    status_display: string;
    /** 审批状态（同意、拒绝） */
    approval_status: number;
    approval_status_display: string;
    /** 时间差 */
    time_difference: string;
    /** 主题 */
    title: string;
    /** 开始时间 */
    start_time: string;
    /** 结束时间 */
    end_time: string;
    /** 备注 */
    note: string;
  };
}
