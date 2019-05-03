const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const hbs = require('hbs');
const path = require('path');
const { check, validationResult } = require('express-validator/check');
const db = require('./config/database');
const port = 3000;

const users = require('./model/UsersModel');
const methodOverride = require('method-override');
// console.log(express.json());return false;
hbs.registerPartials(path.join(__dirname, 'views/section'));
app.set('view engine', 'hbs');
app.set('views', __dirname+'/views');

app.use(methodOverride('_method'));
app.use(favicon(__dirname + '/media/images/favicon.png'));
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit:"200kb" }));
app.use('/media', express.static('media'));
app.get('/', (req, res) => {
    var usersData;
    users.find({}, (err, usersList) => {
        if(err){
            console.log(err);
            res.status(404).send('Please try again');;
        }
        res.render('index', {title:'Users List', users: usersList });
    });

});

app.get('/add-user', (req, res) => {
    res.render('addUser', {title:'Add User'});
});
app.post('/add-user-action', [  check('email_id').isEmail(),
    check('full_name').isLength({ min: 5 })
    ], (req, res )=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        users.create({
            email_id: req.body.email_id,
            full_name: req.body.full_name
          })
          .then(
              () => {
                   res.redirect('/');
              }
          );

});

app.get('/edit-user/:id', (req, res) => {
    var id = req.params.id;
    users.findOne( {_id: id})
    .then((rec)=>
    {

        res.render('editUser', {title: 'Edit User', user_record: rec});
    })
    .catch((err) => {
        console.error(err);
        return res.status(422).json({ errors: errors.array() });
    });

});

app.put('/edit-user-action', (req, res) => {
    users.updateOne({ _id:req.body._id }, {
        full_name:req.body.full_name,
        email_id: req.body.email_id
    } )
    .then(()=>{
         res.redirect('/');
    })
    .catch(()=>{
        console.error(err);
        return res.status(422).json({ errors: errors.array() });
    });
});

app.get('/delete-user/:id', (req, res) => {
    users.deleteOne({ _id: req.params.id }, function( err ) {
            if(err) {
                console.error(err);
                return res.status(422).json({ errors: errors.array() });
            }
            res.redirect('/');
        });
});


app.use(function(req, res, next) {
    res.status(404).send('Page not found.');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});