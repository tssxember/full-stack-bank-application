var express     = require('express');
var app         = express();
var cors        = require('cors');
var dal         = require('./dal.js');

//used to serve static files to public directory
app.use(express.static('public'));
app.use(cors());

//create user account
app.get('/account/create/:name/:email/:password', function (req, res){
    dal.create(req.params.name, req.params.email, req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);
        });         
});

//update balance
app.get('/update/:email/:amount', (req,res) => {
    dal.update(req.params.email, req.params.amount)
        .then((user) => {
            console.log(user);
            res.send(user);
        });      

});

//find user
app.get('/findone/:email', (req,res) => {
    dal.findOne(req.params.email)
        .then((user) => {
            console.log(user);
            res.send(user);
        });    
});


//all accounts
app.get('/accounts/all', function (req,res){
    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
        })
})

var port = process.env.PORT || 3000;
app.listen(port);
console.log('running on port' + port);