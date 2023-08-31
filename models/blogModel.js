const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then((con)=>{
    console.log(con, "CONNECTION ESTABLISED")
})

const blogSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: [true, 'A blog must have a username'],
        unique: true
    },
    title: String,
    body: {
        type: String,
        required: [true, 'A blog must have content']
    },
    image: String,
    createdAt: Date
});

const blog = mongoose.model('Blog', blogSchema);

module.exports = blog;