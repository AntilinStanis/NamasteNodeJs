const { SESClient }  = require("@aws-sdk/client-ses");
// Set the AWS Region.
const REGION = "ap-south-1";
// Create SES service object.
const sesClient = new SESClient({ region: REGION,
    credentials:{
        accessKeyId:"AKIA5E6Z3V5ZC3DYRHOW",
        secretAccessKey:"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"
    }
 });
module.exports = { sesClient };