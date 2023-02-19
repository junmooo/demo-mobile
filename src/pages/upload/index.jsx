import { memo, useState } from "react";
import { FilePicker, Toast, Badge } from "zarm";
import { Plus, Close } from "@zarm-design/icons";
import "./index.less";

const MAX_FILES_COUNT = 12;

const onBeforeSelect = () => {
  // alert("执行 onBeforeSelect 方法");
};

const Upload = memo(() => {
  const [files, setFiles] = useState([]);

  const onSelect = (selFiles) => {
    const newFiles = files.concat(selFiles);
    if (newFiles.length > MAX_FILES_COUNT) {
      Toast.show(`最多只能选择${MAX_FILES_COUNT}张图片`);
      return;
    }

    setFiles(newFiles);
  };

  const remove = (index) => {
    const newFiles = [].concat(files);
    newFiles.splice(index, 1);
    setFiles(newFiles);
    Toast.show("删除成功");
  };

  const imgRender = () => {
    return files.map((item, index) => {
      return (
        <div>
          <Badge
            key={+index}
            className="file-picker-item"
            shape="circle"
            text={
              <span className="file-picker-closebtn">
                <Close />
              </span>
            }
            onClick={() => remove(index)}
          >
            <div className="file-picker-item-img">
              <a
                href={item.thumbnail}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={item.thumbnail} alt="" />
              </a>
            </div>
          </Badge>
        </div>
      );
    });
  };

  return (
    <div className="upload-ctn">
      {imgRender()}
      {files.length < MAX_FILES_COUNT && (
        <FilePicker
          multiple
          className="file-picker-btn"
          accept="image/*"
          onBeforeSelect={onBeforeSelect}
          onChange={onSelect}
        >
          <Plus color="#11AA66" size="lg" />
        </FilePicker>
      )}
    </div>
  );
});

export default Upload;
