const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Song = new Schema({
    Name_Song: { type: String, required: true },  
    Genre: { type: String, required: true },      
    Album: { type: String, required: true },      
    Singer: { type: String, required: true },     
    Template: { type: String, required: true },   
    URL_Song: { type: String, required: true }    
});

module.exports = mongoose.models.Song || mongoose.model('Song', Song);
