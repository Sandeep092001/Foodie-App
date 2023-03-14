// EXPRESS

const express = require("express");
const app = express();
// const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded());
// app.use(bodyParser.json());

const accountSid = "ACd7166b7f34eae32a2910240056f2c002";
const authToken = "3391e44df26ccb976b745d705cba99c2";
const verifySid = "VAd54d23dd3aad348df5642d72820e8aae";
const client = require("twilio")(accountSid, authToken);

const port = process.env.PORT || 3000;
app.post("/sendOtp", (req, res) => {
  var number = "+91" + req.body.phone;
  console.log(number);

 
// client.verify.v2.services
// .create({friendlyName: 'Foodie Login'})
// .then(service => console.log(service.sid));

  client.verify.v2
    .services(verifySid)
    .verifications.create({to: number, channel: "sms", template: {body: 'Your Foodie verification code is: {{code}}'}})
    .then((verification) => res.json({ status: verification.status }));
});

app.post("/verifyOtp", (req, res) => {
  var otpCode = req.body.otp;
  var phone = "+91" + req.body.phone;
  console.log(otpCode, phone);

  const accountSid = "ACd7166b7f34eae32a2910240056f2c002";
  const authToken = "3391e44df26ccb976b745d705cba99c2";
  const verifySid = "VAd54d23dd3aad348df5642d72820e8aae";
  const client = require("twilio")(accountSid, authToken);

  client.verify.v2
    .services(verifySid)
    .verificationChecks.create({ to: phone, code: otpCode })
    .then((verification_check) =>
      res.json({ status: verification_check.status })
    );
});

app.post("/userData", (req, res) => {
  const MongoClient = require("mongodb-legacy").MongoClient;
  var url =
    "mongodb+srv://Sandeep4769:sandeep4769@cluster0.o5rf9r0.mongodb.net/foodie";
 
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    var dbo = db.db("foodie");
    var data = {fullname: req.body.fullName, phone: req.body.phone, email: req.body.email, address: req.body.address}
    dbo.collection("userLoginData").insertOne(data, (err, res) => {
    if (err) throw err;
   
    console.log("inserted");
    db.close();
    });
  });
  
    res.json({status: 'success'});
 
 
});

app.listen(port, () => {
  console.log(`server is running at PORT ${port}`);
});

// EXpress End
