const mongoose = require('mongoose');
const URI = 'mongodb://localhost/mern-bd';

mongoose.connect(URI)
    .then(BD => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;