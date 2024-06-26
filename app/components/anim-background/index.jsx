import { Animator, AnimatorGeneralProvider, BleepsProvider } from "@arwes/react";
import Background from "./background";

const DefAnimOptions = {
  duration: {
    enter: 0.15,
    exit: 0.15,
    stagger: 0.05,
  },
};

const DefBleepOptions = {
  master: { volume: 0.8 },
  categories: {
    background: { volume: 0.3 },
    transition: { volume: 0.5 },
    interaction: { volume: 0.7 },
    notification: { volume: 1 },
  },
  bleeps: {
    click: {
      category: "interaction",
      sources: [
        { src: "/assets/sounds/click.webm", type: "audio/webm" },
        { src: "/assets/sounds/click.mp3", type: "audio/mpeg" },
      ],
    },
    open: {
      category: "interaction",
      sources: [
        { src: "/assets/sounds/open.webm", type: "audio/webm" },
        { src: "/assets/sounds/open.mp3", type: "audio/mpeg" },
      ],
    },
    close: {
      category: "interaction",
      sources: [
        { src: "/assets/sounds/close.webm", type: "audio/webm" },
        { src: "/assets/sounds/close.mp3", type: "audio/mpeg" },
      ],
    },
    info: {
      category: "notification",
      sources: [
        { src: "/assets/sounds/info.webm", type: "audio/webm" },
        { src: "/assets/sounds/info.mp3", type: "audio/mpeg" },
      ],
    },
    error: {
      category: "notification",
      sources: [
        { src: "/assets/sounds/error.webm", type: "audio/webm" },
        { src: "/assets/sounds/error.mp3", type: "audio/mpeg" },
      ],
    },
    intro: {
      category: "transition",
      sources: [
        { src: "/assets/sounds/intro.webm", type: "audio/webm" },
        { src: "/assets/sounds/intro.mp3", type: "audio/mpeg" },
      ],
    },
    content: {
      category: "transition",
      sources: [
        { src: "/assets/sounds/content.webm", type: "audio/webm" },
        { src: "/assets/sounds/content.mp3", type: "audio/mpeg" },
      ],
    },
    type: {
      category: "transition",
      sources: [
        { src: "/assets/sounds/type.webm", type: "audio/webm" },
        { src: "/assets/sounds/type.mp3", type: "audio/mpeg" },
      ],
      loop: true,
    },
    assemble: {
      category: "transition",
      sources: [
        { src: "/assets/sounds/assemble.webm", type: "audio/webm" },
        { src: "/assets/sounds/assemble.mp3", type: "audio/mpeg" },
      ],
      loop: true,
    },
  },
};

const AnimBG = ({
  children,
  animDisabled = true,
  animOptions = DefAnimOptions,
  bgImage = "/default-bg.png",
  bleepsDisabled = true,
  bleepOptions = DefBleepOptions,
  isIndexPage = true,
} = {}) => {
  return (
    <AnimatorGeneralProvider {...animOptions} disabled={animDisabled}>
      <BleepsProvider {...bleepOptions} common={{ disabled: bleepsDisabled }}>
        <Animator combine manager="stagger">
          <Background animated={!animDisabled} bgImage={bgImage} isIndexPage={isIndexPage} />
          {children}
        </Animator>
      </BleepsProvider>
    </AnimatorGeneralProvider>
  );
};

export default AnimBG;
