import React, { useState, useEffect } from "react";

import ImageContainer from "./Components/ImageContainer";
import styles from "./App.module.css";
import "./App.css";

import checkSuffix from "./Functions/CheckfileSuffix";

function App() {
  const [inputFile, setInputFile] = useState("");
  const [blob, setBlob] = useState("");
  const [fileList, setFileList] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!checkSuffix(blob.name)) {
      window.alert("not a compliant file");
      return;
    }

    let loading = {
      loading: true,
      Key: blob.name
    };
    setFileList([...fileList, loading]);
    let data = await fetch("/api-v1/uploadPicture", {
      method: "POST",
      body: inputFile
    });
    console.log(data);
    setFileList([...fileList, blob]);
  }

  useEffect(() => {
    async function fetchData() {
      let data = await fetch("/api-v1/listObjects");
      data = await data.json();
      console.log(data);
      setFileList(data.Contents);
    }
    fetchData();
  }, []);

  function handleChange(e) {
    let file = new FormData();
    file.append("section", "general");
    file.append("action", "previewImg");
    file.append("image", e.target.files[0]);
    console.log(e.target.files[0]);
    setInputFile(file);
    setBlob(e.target.files[0]);
  }

  return (
    <div className="App-header">
      <ImageContainer fileList={fileList} setFileList={setFileList} />
      <form onSubmit={handleSubmit} className={styles.Form}>
        <input type="file" onChange={handleChange}></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
