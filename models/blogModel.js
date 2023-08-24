const mongoose = require('mongoose');

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
    content: {
        type: String,
        required: [true, 'A blog must have content']
    },
    date: Date 
});

const blog = mongoose.model('Blog', blogSchema);

module.exports = blog;