namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    MINDSDB_USERNAME: string;
    MINDSDB_PASSWORD: string;
  }
}
