const express = require('express');
const router = require('./router');


const app = express();
app.use(express.json());


app.use('/reviews', router);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server available at http://localhost${PORT}`);
});

module.exports = app;