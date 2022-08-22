import { useState } from "react";
import ReactFileReader from "react-file-reader";
import md5 from "md5";

function App() {
  const [file1, setFile1] = useState({
    fileList: [],
  });

  const [file2, setFile2] = useState({
    fileList: [],
  });

  const [isFileMatch, setIsFileMatch] = useState(undefined);

  const handleFile1Change = (files) => {
    setFile1(files);
  };

  const handleFile2Change = (files) => {
    setFile2(files);
  };

  const handleCompare = () => {
    const file1Md5 = md5(file1.base64);
    const file2Md5 = md5(file2.base64);

    if (file1Md5 != file2Md5) setIsFileMatch(false);
    else setIsFileMatch(true);
  };

  return (
    <div className="App">
      <h1>Checksum Validator</h1>

      <ReactFileReader base64={true} handleFiles={handleFile1Change}>
        <button>Upload File 1</button>
      </ReactFileReader>
      <span>
        file name: {file1.fileList[0]?.name}
        <br />
        size: {file1.fileList[0]?.size}
        <br />
        type: {file1.fileList[0]?.type}
        <br />
        checksum: {file1.base64 ? md5(file1.base64) : null}
        <br />
      </span>

      <ReactFileReader base64={true} handleFiles={handleFile2Change}>
        <button style={{ marginTop: 24 }}>Upload File 2</button>
      </ReactFileReader>
      <span>
        file name: {file2.fileList[0]?.name}
        <br />
        size: {file2.fileList[0]?.size}
        <br />
        type: {file2.fileList[0]?.type}
        <br />
        checksum: {file2.base64 ? md5(file2.base64) : null}
        <br />
      </span>

      <button
        style={{
          marginTop: 24,
          fontSize: 24,
          padding: "12px 40px",
          fontWeight: 600,
        }}
        onClick={handleCompare}
      >
        Check!
      </button>

      {isFileMatch == true ? (
        <h2 style={{ marginTop: 24, color: "green" }}>File match!</h2>
      ) : null}
      {isFileMatch == false ? (
        <h2 style={{ marginTop: 24, color: "red" }}>File mismatch!</h2>
      ) : null}
    </div>
  );
}

export default App;
