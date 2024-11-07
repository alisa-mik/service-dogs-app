declare global {
    interface Window {
      webkitSpeechRecognition: {
        new (): SpeechRecognitionResult;
      };
    }
  }