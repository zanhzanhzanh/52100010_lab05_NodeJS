const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const rateLimiter = require('rate-limiter-flexible');

const configServer = (app, localDir) => {
    // Config ENV
    require('dotenv').config();

    // Config cho view engine
    app.engine(
        "handlebars",
        exphbs.create({
            defaultLayout: "main",
            extname: ".handlebars",
            layoutsDir: path.join(localDir, "views/layouts"),
            helpers: {
                toString: function (object) {
                    return encodeURIComponent(JSON.stringify(object));
                }
            }
        }).engine
    );

    // Set view engine
    app.set("view engine", "handlebars");

    // Set path views
    app.set('views', path.join(localDir, '/views'));

    // Config Session
    app.use(session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false
    }));

    // Use Flash
    app.use(flash());

    // Config Rate Limiter
    const limiter = new rateLimiter.RateLimiterMemory({
        points: 6,
        duration: 1,
    });

    // Use Limiter
    app.use('/public-api', (req, res, next) => {
        const clientIp = req.ip;
        limiter.consume(clientIp)
            .then(() => {
                next();
            })
            .catch((err) => {
                res.status(429).send('<h1>Too Many Requests</h1>');
            });
    });
}

module.exports = configServer;