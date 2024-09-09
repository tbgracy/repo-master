export const getServerUrl = () => {
  const url = import.meta.env.VITE_VERCEL_URL
  console.log(url);
  return `https://${url}`
  // if (VERCEL_URL) {
  //   return `http://${VITE_VERCEL_URL}`;
  // }


  // if (VITE_APP_URL) {
  //   return VITE_APP_URL;
  // } else {
  //   return "http://localhost:5173";
  // }
};
