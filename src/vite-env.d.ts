/// <reference types="vite/client" />

declare global {
  interface Window {
    openGHLPopup?: () => void;
  }
}

export {};
