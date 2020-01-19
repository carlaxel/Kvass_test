import React from "react";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "./Image.module.css";

export default function ImageComponent(props) {
  if (props.local) {
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
    return (
      <Loader
        className={styles.ImageComponent}
        type="Oval"
        color="#FFFFFF"
        height={90}
        width={90}
        timeout={0} //3 secs
      />
    );
  }
  return (
    <div className={styles.Image}>
      <img
        className={styles.ImageComponent}
        src={`https://kvass.s3.eu-north-1.amazonaws.com/${props.file.Key}`}
        alt={props.file.Key}
      ></img>
    </div>
  );
}

//file={URL.createObjectURL(file2)
