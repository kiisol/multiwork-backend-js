'use strict';

// module.exports = (plugin) => {
//   // Импортируем функцию из controllers/auth
//   const authControllerFactory = require('./controllers/auth');
//   // Вызываем функцию с объектом strapi и получаем контроллер
//   const authController = authControllerFactory({ strapi: plugin.strapi });
//   // Присваиваем метод register
//   plugin.controllers.auth.register = authController.register;
//   return plugin;
// };


// module.exports = (plugin) => {
//   const authControllerFactory = require('./controllers/auth');
//   const authController = authControllerFactory({ strapi: plugin.strapi });
//   plugin.controllers.auth.register = authController.register;
//   return plugin;
// };


module.exports = (plugin) => {
  const authControllerFactory = require('./controllers/auth');
  const authController = authControllerFactory({ strapi: plugin.strapi });
  plugin.controllers.auth.register = authController.register;
  plugin.routes['content-api'].routes.push(...require('./routes/auth').routes);
  return plugin;
};