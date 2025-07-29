/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EDAMAM_APP_ID: string
  readonly VITE_EDAMAM_APP_KEY: string
  readonly VITE_EDAMAM_USER_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 