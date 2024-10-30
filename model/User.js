const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User_ne = new Schema({
    Email : {type: String, require : true},
    UserName : {type : String, require : true},
    PassWord : {type : Number , require : true},
});

module.exports = mongoose.models.User_ne || mongoose.model('user',User_ne)
