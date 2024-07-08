import { useEffect } from "react";

import { Container, Row, Col, Button, Stack } from "react-bootstrap";

import { useDebounce, useStore } from "./hooks";
import {
  LanguageSelector,
  ArrowsIcon,
  ClipboardIcon,
  TextArea,
  SpeakerIcon,
} from "./components";
import { AUTO_LANG, SelectorType, VOICE_FOR_LANGUAGE } from "./interfaces";
import { translate } from "./services/translate";

import "./App.css";

function App() {
  const {
    isLoading,
    fromLanguage,
    fromText,
    toLanguage,
    translation,
    swapLang,
    changeFromLang,
    changeToLang,
    changeFromText,
    changeTranslation,
  } = useStore();

  const debouncedFromText = useDebounce(fromText, 500);

  useEffect(() => {
    if (debouncedFromText === "") return;

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then((result) => {
        if (result == null) return;
        changeTranslation(result);
      })
      .catch(() => {
        changeTranslation("Error");
      });
  }, [debouncedFromText, fromLanguage, toLanguage]);

  const handleClipboard = () => {
    navigator.clipboard.writeText(translation).catch(() => {});
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(translation);
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage];
    speechSynthesis.speak(utterance);
  };

  return (
    <Container fluid>
      <h2 style={{ textAlign: "center" }}>Google Translator</h2>
      <Row>
        <Col>
          <Stack gap={3}>
            <LanguageSelector
              type={SelectorType.FROM}
              defaultLanguage={fromLanguage}
              onChange={changeFromLang}
            />
            <TextArea
              onChange={changeFromText}
              type={SelectorType.FROM}
              value={fromText}
            />
          </Stack>
        </Col>
        <Col xs="auto">
          <Button
            variant="link"
            type="button"
            onClick={swapLang}
            disabled={fromLanguage === AUTO_LANG}
          >
            <ArrowsIcon />
          </Button>
        </Col>
        <Col xs="auto">
          <Stack gap={3}>
            <LanguageSelector
              type={SelectorType.TO}
              defaultLanguage={toLanguage}
              onChange={changeToLang}
            />
            <div style={{ position: "relative" }}>
              <TextArea
                onChange={changeTranslation}
                type={SelectorType.TO}
                value={translation}
                loading={isLoading}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  display: "flex",
                }}
              >
                <Button variant="link" onClick={handleClipboard}>
                  <ClipboardIcon />
                </Button>
                <Button variant="link" onClick={handleSpeak}>
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
