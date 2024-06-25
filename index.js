const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('App successfully deployed!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
