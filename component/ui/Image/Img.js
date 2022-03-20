import Image from "next/image";
import classNames from "../../../lib/classNames";
import classes from "./Img.module.scss";

const Img = ({ imgClassName, className = "", positions = {}, ...props }) => {
  if (props.layout && (props.width || props.height)) {
    props.width = null;
    props.height = null;
  }

  if (!props.layout && !props.width && !props.height) {
    props.layout = "fill";
    props.objectFit = "cover";
  }

  if (props.blurDataURL) props.placeholder = "blur";

  return (
    <div className={classNames(classes.wrapper, className)} style={positions}>
      <Image className={imgClassName} {...props} />
    </div>
  );
};

export default Img;
