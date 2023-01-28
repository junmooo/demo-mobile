export function getList() {
  return new Promise<API.BaseApiResult<API.ApprovalList>>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: [
          {
            id: 1,
            type: 1,
            type_display: '年假',
            status: 0,
            status_display: '待处理',
            time_difference: '10分钟前',
            title: '这是一个请假申请，非常的紧急，你懂我意思吗？',
            start_time: '2022-10-30',
            end_time: '2022-11-30',
            note: '因为心情不好所以请一个月假去摆烂',
            approval_status: 1,
            approval_status_display: '同意',
          },
          {
            id: 2,
            type: 2,
            type_display: '事假',
            status: 1,
            status_display: '已处理',
            time_difference: '10分钟前',
            title: '报告领导，我想请假',
            start_time: '2022-10-30',
            end_time: '2022-11-30',
            approval_status: 0,
            approval_status_display: '拒绝',
          },
        ],
      } as API.BaseApiResult<API.ApprovalList>);
    }, 1000);
  });
}
