type LoginParam = {
  name: string;
  pwd?: string;
};

interface RegisterParam extends LoginParam {
  phoneNo?: string;
  email?: string;
  remark?: string;
}
