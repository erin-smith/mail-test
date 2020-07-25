const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msgTemplate = {
  personalizations: [
    {
      to: [
        {
          email: "erin.acumen@gmail.com"
        }
      ],
      subject: "Portfolio Contact: "
    }
  ],
  from: {
    email: "erin.acumen@gmail.com"
  },
  content: [
    {
      type: "text/plain",
      value: "Hello, World!"
    }
  ]
}

var PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.post("/api/mail", function (req, res) {
  let msg = msgTemplate;
  msg.content[0].value = req.body.name + " says:\n" + req.body.message;
  msg.personalizations[0].subject = req.body.email;
  sgMail.send(msg);
  console.log("Sending Mail now.");
  res.json(msg);
});

app.listen(PORT, function ()
{
  console.log("App listening on PORT " + PORT);
});