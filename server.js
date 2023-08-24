
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// const testblog = new blog({
//     user_name : 'ShradhaB',
//     content:'This is my first Blog',
//     date:new Date()
// })

// testblog.save().then(doc=>{
//     console.log(doc);
// }).catch(err=>{
//     console.log(err)
// })

const port = process.env.PORT ||  4000;

//creating server
app.listen(port, ()=>{
    console.log('From port 4000..', port)
})