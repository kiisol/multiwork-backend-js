module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      allowedFields: ['firstName', 'lastName', 'privacyPolicyAccepted'], // Разрешенные поля
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: env('SMTP_PORT', 587),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('SMTP_USERNAME', 'your-email@gmail.com'),
        defaultReplyTo: env('SMTP_USERNAME', 'your-email@gmail.com'),
      },
    },
  },
  documentation: {
    enabled: true,
    config: {
      openapi: '3.0.0',
      info: {
        title: 'MultyWork API',
        description: 'API documentation for MultyWork project',
        version: '1.0.0',
      },
      'x-strapi-config': {
        plugins: ['users-permissions'], // Включаем документацию для users-permissions
      },
    },
  },
});