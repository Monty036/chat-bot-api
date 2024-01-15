const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const accountSid = 'AC5244376cf702b70ff35802cbd22de305';
const authToken = 'bbb20e69bddffce436842c3bc00b4792';
const client = require('twilio')(accountSid, authToken);


app.post('/send-whatsapp', async (req, res) => {
  const {to, name ,date,numberOfPeople} = req.body;

  client.messages
    .create({
        body:"Your table has been booked!\nHere are the credentials:\nName: " + name+"\n"+
        "Phone no: "+to+"\n"+
        "Date: "+date+"\n"+
        "Number Of People: "+numberOfPeople,
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+91'+to
    })
    .then(message => console.log(message.sid))
    .catch(error => {
      if(error){
        return res.status(500).send(error);
      }
    });

    return res.send("message send successfully")

    
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// client.messages
//     .create({
//         body: 'Hey aman',
//         from: 'whatsapp:+14155238886',
//         to: 'whatsapp:+917064196955'
//     })
//     .then(message => console.log(message.sid))
//     .catch(error => console.error(error));
