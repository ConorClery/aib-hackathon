const express = require('express');
const app     = express();
const port    = 	process.env.PORT || 80;
const path = require('path');
const ejs = require('ejs');
const bodyParser = require("body-parser");
const router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.set('view engine', 'ejs');


//Define Routes below
let home_page_routes = require('./routes/home.js');
router.get('/', home_page_routes);

let browse_routes = require('./routes/browse.js');
router.get('/browse', browse_routes);

let wiki = require('./routes/wiki.js');
router.get('/browse', wiki);

//Error Routes
router.get('*', (req,res) => {
	console.log('missing-page');
	res.render(__dirname + '/public/page/missing-page');
});

//Apply the routes to our application
app.use('/', router);


//START THE SERVER
//==================================================================================
app.listen(port, '0.0.0.0');
console.log('Server open at  localhost:' + port);
module.exports = router;
