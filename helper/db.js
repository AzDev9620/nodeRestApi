const mongoose = require('mongoose');

module.exports = start = () => {
    try{
        mongoose.connect(process.env.DB_URL).then(data => {
            console.log(`Biz bazaga onlayn ulandik...`)
        }).catch(err => {
            console.log(err)
        });
    }catch(err) {
        console.log(err)
    }   
}