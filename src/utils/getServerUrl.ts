export const getServerUrl = () => {
  const vercelUrl = import.meta.env.VITE_VERCEL_URL
  if (vercelUrl) {
    return `https://${vercelUrl}`
  } else {
    return 'http:localhost:5173'
  }
};
