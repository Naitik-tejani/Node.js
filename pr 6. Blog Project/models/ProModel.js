const mongoose = require('mongoose');

const userDetailsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

  

});
const UserDetails = mongoose.model('UserDetails', userDetailsSchema);
module.exports = UserDetails;