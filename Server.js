const Pool = require("pg").Pool;
const express = require('express');
const axios = require('axios');


const app = express();
app.use(express.json())


app.get