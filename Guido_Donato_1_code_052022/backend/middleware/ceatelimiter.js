const rateLimit = require('express-rate-limit');

//Limiteur d'inscription 
const createLimiter = rateLimit({
    windowMs: 60* 60 * 1000, 
      max: 5,
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  module.exports = ('createlimiter', createLimiter);