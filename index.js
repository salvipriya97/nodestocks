const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const axios = require('axios');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;


//Setup body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// API key pk_4d070474f63f4609bf5267b62aabc4c5
// Get stock details
function call_api(finishApi, ticker

  // ticker
  ) {
  // axios.get('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_4d070474f63f4609bf5267b62aabc4c5')
	axios.get('https://cloud.iexapis.com/stable/stock/'+ticker+'/quote?token=pk_4d070474f63f4609bf5267b62aabc4c5')
  .then(response => {
    finishApi(response);
  }, error => {
    console.log(error);
  });
}


// Set handlers middleware
app.engine('.handlebars', exphbs.engine({ extname: '.handlebars', defaultLayout: "main"}));
app.set('view engine', 'handlebars');


// Set handlebars GET routes
app.get('/', function (req, res) {
	call_api(function(doneApi) {
    res.render('home', {
    	stock: doneApi
  });
	}, "fb");
	
});

// Set handlebars POST routes
app.post('/', function (req, res) {
  call_api(function(doneApi) {
    // inputStock = req.body.stock_ticker;
    res.render('home', {
      stock: doneApi,
  });
  }, req.body.stock_ticker)
  // , req.body.stock_ticker
  
});



// Create about page route
app.get('/about.html', (req, res) => {
    res.render('about');
});


app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Listening to port: ' + PORT));