const express = require('express');
const fs = require('fs');

const app = express();

const port = 4000;

//creating server
app.listen(port, ()=>{
    console.log('From port 3000')
})