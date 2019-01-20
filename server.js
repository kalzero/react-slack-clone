const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require("@pusher/chatkit-server");

const app = express();

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:34f7d685-7cbf-42ef-b022-3e8900a5bb8c',
  key: '2199ce5c-b015-474c-b102-a92313e159b2:8xQ6VFUqpVkZwESIEZR9H3vcCMf/6Nq2t1MVrY04dGs='
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/createuser", (req, res) => {
  const { username } = req.body;    
  chatkit.createUser({
    id: username,
    name: username
  })
  .then(() => res.sendStatus(201))
  .catch(error => {
    if (error === 'services/chatkit/user_already_exists') {
      res.sendStatus(200);
    } else {
      res.status(error.status).json(error);      
    }
  });
});

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id
  });
  res.status(authData.status).send(authData.body);
});


const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
});
