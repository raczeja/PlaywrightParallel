export interface EnvironmentConfig {
  baseURL: string;
  apiURL: string;
  timeout: number;
  retries: number;
  users: {
    admin: {
      username: string;
      password: string;
    };
    standard: {
      username: string;
      password: string;
    };
  };
}

const environments: Record<string, EnvironmentConfig> = {
  dev: {
    baseURL: 'https://practice.expandtesting.com',
    apiURL: 'https://practice.expandtesting.com/api',
    timeout: 30000,
    retries: 1,
    users: {
      admin: {
        username: 'practice',
        password: 'SuperSecretPassword!',
      },
      standard: {
        username: 'practice',
        password: 'SuperSecretPassword!',
      },
    },
  },
  staging: {
    baseURL: 'https://staging.example.com',
    apiURL: 'https://staging.example.com/api',
    timeout: 45000,
    retries: 2,
    users: {
      admin: {
        username: 'admin@staging.com',
        password: 'staging_admin_pass',
      },
      standard: {
        username: 'user@staging.com',
        password: 'staging_user_pass',
      },
    },
  },
  prod: {
    baseURL: 'https://www.example.com',
    apiURL: 'https://www.example.com/api',
    timeout: 60000,
    retries: 3,
    users: {
      admin: {
        username: 'admin@prod.com',
        password: 'prod_admin_pass',
      },
      standard: {
        username: 'user@prod.com',
        password: 'prod_user_pass',
      },
    },
  },
};

export function getEnvironmentConfig(env: string = 'dev'): EnvironmentConfig {
  const config = environments[env.toLowerCase()];
  if (!config) {
    throw new Error(`Environment configuration for "${env}" not found. Available: ${Object.keys(environments).join(', ')}`);
  }
  return config;
}

export function getCurrentEnvironment(): string {
  return process.env.ENV || 'dev';
}
