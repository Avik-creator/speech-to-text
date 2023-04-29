import React, { useState } from "react";
import RecordButton from "./RecordButton";
import Result from "./Result";
import DownloadButton from "./DownloadButton";
import LanguageSelect from "./LanguageSelect";
import ClearButton from "./ClearButton";
import "../App.css";

const SpeechToText = ({ languages }) => {
  const [recording, setRecording] = useState(false);
  const [text, setText] = useState("");
  const [language, setLanguage] = useState(languages[0].code);

  const speechToText = () => {
    try {
      const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new recognition();
      recognitionInstance.lang = language;
      recognitionInstance.interimResults = true;

      setRecording(true);
      setText("");

      recognitionInstance.start();

      recognitionInstance.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;

        if (event.results[0].isFinal) {
          setText((prevText) => prevText + "\n" + speechResult);
        } else {
          setText((prevText) => prevText + " " + speechResult);
        }
      };

      recognitionInstance.onspeechend = () => {
        speechToText();
      };

      recognitionInstance.onerror = (event) => {
        stopRecording();
        if (event.error === "no-speech") {
          alert("No speech was detected. Stopping...");
        } else if (event.error === "audio-capture") {
          alert(
            "No microphone was found. Ensure that a microphone is installed."
          );
        } else if (event.error === "not-allowed") {
          alert("Permission to use microphone is blocked.");
        } else if (event.error === "aborted") {
          alert("Listening Stopped.");
        } else {
          alert("Error occurred in recognition: " + event.error);
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

  const stopRecording = () => {
    setRecording(false);
  };

  const download = () => {
    const filename = "speech.txt";
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container">
      <p className="heading">Speech to Text</p>
      <div className="options">
        <div className="anguage">
          <p>Language</p>
          <LanguageSelect
            languages={languages}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
        </div>
      </div>
      <div class="line"></div>
        <RecordButton recording={recording} onClick={speechToText}/>
        <p className="heading">Result: </p>
        <Result text={text} />
        <div className="buttons">
          <DownloadButton  disabled={!text} onClick={download} />
          <ClearButton  disabled={!text} onClick={() => setText('')} />
        </div>
    </div>
  );
};

export default SpeechToText;
