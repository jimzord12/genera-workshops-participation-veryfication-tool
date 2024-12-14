/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EXPRESS_SERVER_URL: string; // Add your custom env variable here
  // Add other variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
