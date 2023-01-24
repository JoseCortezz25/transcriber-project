import React from "react";
import YouTube from "react-youtube";
import { InfoAlert } from "../Alerts/Alerts";
import "./VideoPlayer.css";

const VideoPlayer = ({ URL }) => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };

  const videoId = URL.split("?v=")[1];
  return (
    <section className="VideoPlayer" role="Sección del video a transcribir">
      <YouTube videoId={videoId} opts={opts} onReady={(event) => {}} />
      <InfoAlert text="Si el video no aparece, revisa el link que escribiste" />
    </section>
  );
};
export default VideoPlayer;
