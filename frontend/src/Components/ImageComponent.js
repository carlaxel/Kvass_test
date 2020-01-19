import React from "react";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "./Image.module.css";

//UPDATE VALUES
const bucket = "insert bucket name";
const region = "eu-north-1";

export default function ImageComponent(props) {
  if (props.local) {
    //IF FILE IS LOCAL
    return (
      <div className={styles.Image}>
        <img
          className={styles.ImageComponent}
          src={props.file}
          alt={props.file.name}
        ></img>
      </div>
    );
  } else if (props.file.loading) {
    //IF FILE UPLOAD IS NOT COMPLETE
    return (
      <Loader
        className={styles.ImageComponent}
        type="Oval"
        color="#FFFFFF"
        height={90}
        width={90}
        timeout={0}
      />
    );
  }
  return (
    //IF FILE FROM BUCKET
    <div className={styles.Image}>
      <img
        className={styles.ImageComponent}
        src={`https://${bucket}.s3.${region}.amazonaws.com/${props.file.Key}`}
        alt={props.file.Key}
      ></img>
    </div>
  );
}
