export const getServerUrl = () => {
  const VITE_VERCEL_URL = import.meta.env.VITE_VERCEL_URL;
  const VITE_APP_URL = import.meta.env.VITE_APP_URL;

  if (VITE_VERCEL_URL) {
    return `http://${VITE_VERCEL_URL}`;
  }

  if (VITE_APP_URL) {
    return VITE_APP_URL;
  } else {
    return "http://localhost:5173";
  }
};
