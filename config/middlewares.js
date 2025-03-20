module.exports = [
//   'strapi::logger',
//   'strapi::errors',
//   'strapi::security',
//   {
//     name: 'strapi::cors',
//     config: {
//       origin: ['http://localhost:3000'],
//       headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
//       methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//     },
//   },
//   'strapi::poweredBy',
//   'strapi::query',
//   'strapi::body',
//   'strapi::session',
//   'strapi::favicon',
//   'strapi::public',
// 
'strapi::logger',
'strapi::security',  
'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST', 'OPTIONS', 'PUT'],
      headers: ['Content-Type', 'Authorization'],
    },
  },
  'strapi::body',
  'strapi::favicon',
  'strapi::query',
  "strapi::public",
];