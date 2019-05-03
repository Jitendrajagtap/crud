const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const path = require('path');
const db = require('./config/database');
const userRoutes = require('./routes/Users');

const port = (process.env.PORT) || 3000;

const methodOverride = require('method-override');
// console.log(express.json());return false;
hbs.registerPartials(path.join(__dirname, 'views/section'));
app.set('view engine', 'hbs');
app.set('views', __dirname+'/views');

// middleware:
app.use(session({secret:'myfirstapp'}));
app.use(methodOverride('_method'));
app.use(favicon(__dirname + '/media/images/favicon.png'));
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit:"200kb" }));
app.use('/media', express.static('media'));
app.use(flash());

app.use('/', userRoutes);

app.use(function(req, res, next) {
    res.status(404).send('Page not found.');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});