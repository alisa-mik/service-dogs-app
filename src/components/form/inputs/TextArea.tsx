// @ts-nocheck

import React, { useState, useEffect, useRef } from "react";
import MicIcon from "@mui/icons-material/Mic";
import { TextArea as StyledArea } from "../styledInputs";
import { IInput } from "../InputInjector";
import { Icon } from "@mui/material";

const TextArea: React.FC<IInput> = ({ path, formik }) => {
  const recorderRef = useRef();
  const initValueRef = useRef(formik.values[path] || "");
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognitionInstance = new (window as any).webkitSpeechRecognition();
      recognitionInstance.continuous = true; // Allow continuous listening
      recognitionInstance.interimResults = true; // Capture partial results
      recognitionInstance.lang = "he-IL"; // Set to Hebrew for speech recognition

      recognitionInstance.onerror = (event) => {
        console.error("Recognition error:", event.error);
        setListening(false);
        alert("An error occurred with speech recognition.");
      };

      recorderRef.current = recognitionInstance;
    } else {
      alert("Speech recognition is not supported in this browser.");
    }

    return () => {
      handleStopListening();
    };
  }, []);

  useEffect(() => {
    if (recorderRef.current) {
      recorderRef.current.onstart = () => {
        setListening(true);
      };

      recorderRef.current.onend = () => {
        initValueRef.current = formik.values[path];
        setListening(false); // Ensure state updates when recognition stops
      };

      recorderRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = initValueRef.current;
        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          interimTranscript += transcript;
        }
        formik.setFieldValue(path, interimTranscript);
      };
    }
  }, [formik, path]);

  const handleStartListening = () => {
    if (recorderRef.current) {
      console.log("Starting recognition");
      recorderRef.current.start();
    }
  };

  const handleStopListening = () => {
    if (recorderRef.current) {
      recorderRef.current.stop();

      console.log("Stopping recognition");
    } else {
      console.log("Recognition is not running or already stopped");
    }
  };

  const handleMenualChange = (e) => {
    formik.setFieldValue(path, e.target.value);
    initValueRef.current = e.target.value;
  };

  return (
    <div>
      <StyledArea
        name={path}
        value={formik.values[path]}
        onChange={handleMenualChange}
      />

      <MicIcon
        style={{
          cursor: "pointer",
          color: listening ? "red" : "#000000",
          fontSize: "25px",
        }}
        onClick={listening ? handleStopListening : handleStartListening}
      />
    </div>
  );
};

export default TextArea;
