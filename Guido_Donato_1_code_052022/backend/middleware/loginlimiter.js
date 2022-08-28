
const rateLimit = require('express-rate-limit');
//Limiteur de connexion
const  loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 10, 
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` header
});

module.exports = ('loginlimiter', loginLimiter);