const express = require('express');
const app = express();

app.set('port', 3000);

app.use(express.static('./_build/'))

app.listen(app.get('port'), () => {
    console.log(`start the server at: http://127.0.0.1:${app.get('port')}/`)
});
