import { useState } from "react";
import "./index.css";
import axios from "axios";
import iconLogo from "./assets/scriber.svg";
import arrowRightIcon from "./assets/arrow-short-right2.svg";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import Transcription from "./components/Transcription/Transcription";
import Loader from "./components/Loaders/Loaders";
import { InfoAlert } from "./components/Alerts/Alerts";

function App() {
  const [search, setSearch] = useState("");
  const [text, setText] = useState("");
  const [isPressButton, setIsPressButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_URL = "http://127.0.0.1:5000/transcribe";

  const getTranscription = async () => {
    setLoading(true);
    return axios.get(API_URL, {
      params: {
        url: search,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPressButton(true);
    getTranscription()
      .then((res) => {
        setText(res.data.text);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <div className="App__header">
        <div className="App__welcome">
          <img src={iconLogo} alt="" />
        </div>
        <div className="App__search">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name=""
              id=""
              placeholder="Text URL youtube video"
              onChange={({ target }) => setSearch(target.value)}
            />
            <button type="submit">
              <img src={arrowRightIcon} alt="" />
            </button>
          </form>
          {!(search.length > 0) && (
            <InfoAlert text="Escribe el link del video de youtube y oprime el boton '>' para comenzar." />
          )}
        </div>
      </div>
      {isPressButton && search ? (
        <div className="App__body">
          {!loading ? (
            <Transcription text={text} loading={loading} />
          ) : (
            <div className="WaitMessage">
              <Loader />
              <p>
                Toma un break. Esto tomará un tiempo dependiendo de que tan
                largo es el video.
              </p>
            </div>
          )}
          <VideoPlayer URL={search} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
