import React from "react";
import FileSaver from "file-saver";
import "./Transcription.css";

const Transcription = ({ text, loading }) => {
  function downloadTextFile() {
    const file = new Blob([text], {type: 'text/plain;charset=utf-8'});
    FileSaver.saveAs(file, 'transcripion.txt');
  }

  const formatText = (text) => {
    return text.replace(/ (?=[A-Z])/g, "\n");
  };

  return (
    <section
      className="Transcription"
      role="Sección de la transcripción del video"
    >
      <h3>Transcripción:</h3>
      {!loading && (
        <button className="btn_standard" onClick={downloadTextFile}>Descargar transcripción</button>
      )}
      <pre>{formatText(text)}</pre>
    </section>
  );
};

export default Transcription;
