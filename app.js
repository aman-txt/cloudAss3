const express = require('express');
const app = express();
const axios = require('axios');

const userRoute = require('./routes/users');

const bodyParser= require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const rootRoute = '';
app.use(express.json());
app.use(rootRoute,userRoute);
app.use((req,res,next) => {
    res.status(200).json({
        message: "Working"
    })

})
async function callOnStart() {

    try {
     
        let payload = { banner: 'B00888136', ip: '35.161.197.91:5000' };
    
        let res = await axios.post('http://52.23.207.11:8081/start', payload);
    
        let data = res.data;
        console.log(data);   
        } catch (error) {
            console.log(error);
        }
}
//callOnStart()

module.exports = app;