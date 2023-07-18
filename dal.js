const MongoClient = require('mongodb').MongoClient;
const url         = 'mongodb://localhost:27017';

//const url       = 'mongodb+srv://user1:euiU8KVvt4onS1Ft@cluster0.3xfr9x4.mongodb.net/';
let db            = null;
 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('fullstackBank');

});

// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email}, function (err, res){
                err ? reject(err) : resolve(res);
            });                
    });    
};


// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {
    var myquery = { email: email };
    var newvalues = { $set: {balance: Number(amount) } };
    db.collection("users")
        .updateOne(myquery, newvalues, function(err, res) {
            err ? reject(err) : resolve(res);
            console.log("1 document updated");  
        });
    });
};

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {create, findOne, find, update, all};