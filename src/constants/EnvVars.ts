const env = import.meta.env;

export default {
  RESTAPI_SERVER_URL: env.RESTAPI_SERVER_URL ?? 'http://localhost:3000',
} as const;
