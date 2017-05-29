// initialize modules in project
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// data
let todos = [
                {text: 'learn angular', done: false, id: 1},
                {text: 'write the content for the next module', done: false, id: 2},
                {text: 'buy cheese', done: true, id: 3},
                {text: 'buy milk', done: true, id: 4}
	        ]

// Puts a limitation on you regarding where you can use Javascript.
app.use(function(req, res, next) { // This is middleware. All middleware shoudl be above endpoints.
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse application/x-www-form-urlencoded - middleware to handle the parsing of requests 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json - middleware to handle the parsing of requests 
app.use(bodyParser.json())

// Send back most up-to-date todos array whenever server gets a request from /.
app.get('/', (req, res) => {
    res.send(todos);
}) 

// When server receives post request from client at url /savetodos, update todos with the received data. i.e. up-to-date todos array.
// Look at terminal for console.logs in server.js.
app.post('/savetodos', (req,res) => {
    res.json({msg:'Post Endpoint reached'})
    todos = req.body
})

app.use(express.static(__dirname + '/react-rest-front/build/static'));

app.listen(process.env.PORT || 8080);