declare module 'vite' {
  interface UserConfigExport {
    test?: {
      globals?: boolean;
      environment?: string;
      setupFiles?: string | string[];
      coverage?: {
        provider?: string;
        clean?: boolean;
        all?: boolean;
        reporter?: string[];
        exclude?: string[];
        include?: string[];
      };
    };
  }
}
