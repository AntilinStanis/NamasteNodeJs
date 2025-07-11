const express = require('express');
const router = express.Router();
const SesService = require('../Services/ses.service');


router.post('/sendMail',async function(req,res){
    console.log({INFO:"sendMail function called successfully"});

    try {

         const response = await SesService.run();
           console.log(response);
            res.status(200).send("Mail Send Successfully");
        
    } catch (error) {
        console.log({ERROR:error.message});
        res.status(422).send("Error in sending mail");
    }



});

module.exports = router;