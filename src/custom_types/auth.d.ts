type LoginParam = {
  operName: string;
  operPwd?: string;
};

interface RegisterParam extends LoginParam {
  phoneNo?: string;
  operEmail?: string;
  remark?: string;
}
