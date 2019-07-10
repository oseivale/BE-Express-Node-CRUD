const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var db

MongoClient.connect('mongodb+srv://db-test-app:db123@app-test-vsti2.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
    if (err) return console.log(err)
    db = client.db('app-test')
    app.listen(3000, () => {
        console.log('listen on 3000')
    })
})

app.use(bodyParser.urlencoded({useNewUrlParser: true}))

app.get('/', (req, res) => {
    var cursor = db.collection('quotes').find().toArray( function(err, result){
        if (err) return console.log(err)
        
        res.render( 'index.ejs', {quotes: result})
    })    
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
})


app.set('view engine', 'ejs')
