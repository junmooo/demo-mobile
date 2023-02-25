import { memo, useState } from "react";
import Upload from "@/components/common/upload";
import { uploads } from "@/api/files";
import FileUtils from "@/utils/file";
import "./index.less";
import { Toast } from "antd-mobile";
import { useRequest } from "ahooks";
import MyNavBar from "@/components/common/navbar";

const MAX_FILES_COUNT = 5;
const log = console.log;

const UploadFile = memo(() => {
  const [preImgs, setPreImgs] = useState<string[]>([]);
  const { run } = useRequest(uploads, {
    manual: true,
    onSuccess: (res) => {
      log(21, res);
    },
    onFinally: () => {
      Toast.clear();
    },
  });

  const handlFileUpload = (
    form: FormData,
    file: File,
    reader: FileReader,
    pres: string[]
  ) => {
    form.append("files", file);
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      pres.push(e.target?.result as string);
    };
  };

  const onChange = async (files: File[]) => {
    Toast.show({
      icon: "loading",
      duration: 1000,
      content: "上传处理中…",
    });
    const m = 1024 * 1024;
    const formData = new FormData();
    const pres = [...preImgs];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let quality = 1;
      if (file.size > 8 * m) quality = 0.5;
      else if (file.size > 5 * m) quality = 0.6;
      else if (file.size > 2 * m) quality = 0.8;
      const reader = new FileReader();
      if (quality !== 1) {
        FileUtils.fileResizeToFile(file, quality, (res: Blob) => {
          const tempFile = new window.File([res], file.name, {
            type: "image/jpeg",
            lastModified: file.lastModified,
          });
          handlFileUpload(formData, tempFile, reader, pres);
        });
      } else {
        handlFileUpload(formData, file, reader, pres);
      }
    }
    const destLength = files.length + preImgs.length;
    const interval = setInterval(() => {
      if (pres.length === destLength) {
        setPreImgs(pres);
        run(formData);
        clearInterval(interval);
        return;
      }
    }, 500);
  };

  return (
    <div className="upload-ctn">
      <MyNavBar title="上传测试" />
      {preImgs.map((img) => (
        <img src={img} alt="preview" width="100%" key={img} />
      ))}

      <Upload
        formats={["image/png", "image/jpg", "image/jpeg", "image/gif"]}
        maxSize={10}
        multiple={true}
        iconSize={"25px"}
        maxCount={MAX_FILES_COUNT}
        onCheck={(msg) => {
          Toast.show({ icon: "fail", content: msg });
        }}
        onChange={onChange}
      />
    </div>
  );
});

export default UploadFile;
