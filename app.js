const express = require('express');
const app = express();
const PORT = 3000;

// Set static folder path
const path = __dirname + '/public/';
app.use(express.static(path));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', require('./router'));

app.listen(PORT, () => {
	console.log('listening on port ' + PORT);
});
