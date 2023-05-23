import * as Sentry from '@sentry/browser';

export interface SentryConfig {
  release: string;
  environment: string;
  dsn: string;
  attachStacktrace: boolean;
}

export const initSentry = (config?: Partial<SentryConfig>) => {
  if (!['localhost', '127.0.0.1', ''].includes(window.location.hostname)) {
    if (!config?.dsn) {
      console.warn('Sentry DSN is required to initialize Sentry');
      return;
    }
    const sentryConfig: Partial<SentryConfig> = {
      ...{
        release: `exmg-cms`,
        environment: 'development',
        attachStacktrace: true,
      },
      ...config,
    };
    console.info('Initialized Sentry', sentryConfig);
    Sentry.init(sentryConfig);
  } else {
    console.info('Sentry disabled running locally');
  }
};

export const captureException = (error: unknown) => {
  Sentry.captureException(error);
};
