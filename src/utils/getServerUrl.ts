export const getServerUrl = () => {
  const VERCEL_URL = import.meta.env.VERCEL_URL;
  const VITE_APP_URL = import.meta.env.VITE_APP_URL;
  if (VERCEL_URL) {
    return VERCEL_URL;
  }

  if (VITE_APP_URL) {
    return VITE_APP_URL;
  } else {
    return "http://localhost:5173";
  }
};
