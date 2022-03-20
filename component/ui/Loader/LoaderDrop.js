import Img from "../Image/Img";
import ProgressBar from "./ProgressBar";
import classes from "./LoaderDrop.module.scss";
import { getBrandImage } from "../../../lib/brandAssets";

const LoaderDrop = ({ loaderProps = getBrandImage("droplet") }) => {
  return (
    <div className={classes.wrapper}>
      <Img
        {...loaderProps}
        className={classes.loader}
        layout="fill"
        objectFit="contain"
      />
      <ProgressBar />
    </div>
  );
};

export default LoaderDrop;
