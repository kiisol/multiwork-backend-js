'use strict';

module.exports = ({ strapi }) => ({
  async register(ctx) {
    console.log('Custom register controller called with body:', ctx.request.body);
    const pluginStore = strapi.store({ type: 'plugin', name: 'users-permissions' });
    const settings = await pluginStore.get({ key: 'advanced' });

    const params = ctx.request.body;

    if (!params.email) return ctx.badRequest('Missing email');
    if (!params.username) return ctx.badRequest('Missing username');
    if (!params.password) return ctx.badRequest('Missing password');

    const userWithSameEmail = await strapi.query('plugin::users-permissions.user').findOne({ where: { email: params.email.toLowerCase() } });
    if (userWithSameEmail) return ctx.badRequest('Email already taken');

    const userWithSameUsername = await strapi.query('plugin::users-permissions.user').findOne({ where: { username: params.username } });
    if (userWithSameUsername) return ctx.badRequest('Username already taken');

    const newUser = {
      ...params,
      provider: 'local',
      email: params.email.toLowerCase(),
      username: params.username,
      password: await strapi.plugins['users-permissions'].services.user.hashPassword({ password: params.password }),
      firstName: params.firstName,
      lastName: params.lastName,
      privacyPolicyAccepted: params.privacyPolicyAccepted,
    };

    const user = await strapi.query('plugin::users-permissions.user').create({ data: newUser });

    const jwt = strapi.plugins['users-permissions'].services.jwt.issue({ id: user.id });

    // Используем новый метод для санитизации
    const sanitizedUser = await strapi.service('plugin::users-permissions.user').sanitizeOutput(user);

    ctx.body = { jwt, user: sanitizedUser };
  },
});