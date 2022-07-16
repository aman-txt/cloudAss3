const express = require('express');
const crypto = require("crypto");
const router = express.Router();

module.exports = router;
const NodeRSA = require('node-rsa');
const bodyParser = require('body-parser')
const fs = require('fs');
const { json } = require('express');

const AWS = require('aws-sdk');

var pvtkey= '';
var pubkey= '';
fs.readFile("private_key.txt","utf8",function(err, data){
      
   
    pvtkey = new NodeRSA(data);
    
});
fs.readFile("public_key.txt","utf8",function(err, data){
    
    pubkey = new NodeRSA(data);
    
});

const { setTimeout } = require('timers/promises');

 router.post('/decrypt',async (req, res) => {

    try {
        await setTimeout(2000, 'result')
        const data = req.body;
        console.log("pvtkey"+pvtkey);
        if (data === undefined) {
            return res.status(404).json({
                message: "missing attributes",
                success: false,
            })
        }

      
        const text = data.message;
        const decrypted = pvtkey.decrypt(text, 'utf8');
        console.log('decrypted: ', decrypted);


        return res.status(200).json({
            response: decrypted
        })
        
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Server Error",
            success: false,

        })
    }
})

router.post('/encrypt',async (req, res) => {

  
    try {
        await setTimeout(2000, 'result')
        const data = req.body;
        console.log("pubkey"+pubkey);
        if (data === undefined) {
            return res.status(404).json({
                message: "missing attributes",
                success: false,
            })
        }

        const text = data.message;
         const encrypted = pubkey.encrypt(text, 'base64');
         console.log('encrypted: ', encrypted);
        

        return res.status(200).json({
            response: encrypted
        })
        
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Server Error",
            success: false,

        })
    }
})



