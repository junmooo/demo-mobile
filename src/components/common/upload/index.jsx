import { useRef } from "react";
import PropTypes from "prop-types";
import "./index.less";

const Upload = (props) => {
  const myFilebutton = useRef();

  const {
    uploadRef,
    formats,
    maxSize,
    onChange,
    multiple,
    onCheck,
    icon,
    iconSize,
    maxCount,
  } = props;
  const beforeUpload = (files) => {
    if (files.length > maxCount) {
      return false;
    }
    for (let i = 0; i < files.length; i++) {
      const isLt = files[i].size / 1024 / 1024 < maxSize;
      return isLt;
    }
  };

  // 选择一个文件时onchange时间被触发
  const fileSelected = () => {
    const files = myFilebutton.current.files;
    if (maxCount && maxSize && !beforeUpload(files)) {
      onCheck(`选取文件必须少于${maxCount}个, 且小于${maxSize}MB!`);
      return;
    }
    onChange(files);
  };

  const uploadButton = (
    <div className="upload-btn-warp">
      <img
        src={icon || ""}
        style={{ width: iconSize || "0px" }}
        alt="upload icon"
      />
    </div>
  );

  return (
    <div>
      <div ref={uploadRef} onClick={() => myFilebutton.current.click()}>
        {icon && (
          <img
            src={icon || ""}
            style={{ width: iconSize || "0px" }}
            alt="upload icon"
          />
        )}
      </div>
      <input
        ref={myFilebutton}
        type="file"
        multiple={multiple}
        style={{ display: "none" }}
        accept={formats && formats.join(",")}
        onChange={() => fileSelected()}
      />
    </div>
  );
};

Upload.propTypes = {
  formats: PropTypes.array,
  maxSize: PropTypes.number,
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  onCheck: PropTypes.func,
  icon: PropTypes.string,
  iconSize: PropTypes.string,
  maxCount: PropTypes.number,
  uploadRef: PropTypes.any,
};

Upload.defaultProps = {
  onChange: () => {},
  multiple: false,
  onCheck: () => {},
  icon: null,
  iconSize: null,
  maxCount: 5,
};

export default Upload;
