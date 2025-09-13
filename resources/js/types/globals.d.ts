import { AppPageProps } from '@/types/index';
import { route } from 'ziggy-js';
import { Page, Router, createHeadManager } from '@inertiajs/core';

declare global {
  // allow using route() directly without import
  const route: typeof route;
}

export {};

declare global {
  interface Window {
    Ziggy: any; // or use `Config` if you want strict typing
  }
}

declare module 'vite/client' {
  interface ImportMetaEnv {
    readonly VITE_APP_NAME: string;
    [key: string]: string | boolean | undefined;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
    readonly glob: <T>(pattern: string) => Record<string, () => Promise<T>>;
  }
}

declare module '@inertiajs/core' {
  interface PageProps extends InertiaPageProps, AppPageProps {}
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $inertia: typeof Router;
    $page: Page;
    $headManager: ReturnType<typeof createHeadManager>;
    route: typeof route; 
  }
}
