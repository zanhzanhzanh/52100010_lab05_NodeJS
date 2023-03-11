// Import các module
const configServer = require('./configs/configServer');
const webRouter = require('./router/webRouter');
// Import thư viện
const express = require('express');
const app = express();

// PORT
const PORT = process.env.PORT || 3000;

// config Server
configServer(app, __dirname);

// Set default Redirect
app.get('/', (req, res) => { res.redirect('/public-api/users/'); })

// Get All Web Router
webRouter(app);

// Xử lý lỗi 404
app.use((req, res, next) => {
    res.status(404).render('error', { message: '404 Not Found' });
});

// Nếu có lỗi xảy ra, điều hướng đến trang error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { message: '500 Internal Server Error' });
});

// Listen PORT
app.listen(PORT, () => {
    console.log("Listen on PORT: ", PORT);
})