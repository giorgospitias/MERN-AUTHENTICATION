declare global {
  interface Window {
    env: { [key: string]: string };
  }
}

export const BE_URL = window.env
  ? window.env.BE_URL
  : import.meta.env.VITE_BACKEND_URL;
