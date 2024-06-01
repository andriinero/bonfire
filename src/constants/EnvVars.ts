const env = import.meta.env;

export default {
  API_SERVER_URL: env.VITE_API_SERVER_URL ?? 'http://localhost:3000',
} as const;
