/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DAJIPAI_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
