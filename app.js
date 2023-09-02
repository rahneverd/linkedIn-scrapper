const express = require('express');
const app = express();

// Set static folder path
const path = __dirname + '/public/';
app.use(express.static(path));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', require('./router'));

app.listen(3000, () => {
	console.log('listening on port ' + process.env.PORT);
});
