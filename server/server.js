const path = require("path"),
      express = require("express"),
      fileUpload = require('express-fileupload'),
      fetch = require('node-fetch'),
      fs = require('fs'),
      util = require('util');
const passport = require('./passport');
const bodyParser = require('body-parser');

const dbConnection = require('../database');
const user = require('./routes/user');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);


const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser('fraggle-rock'));

app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

app.use(fileUpload());

//sessions
app.use(
  session({
    secret: 'fraggle-rock',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: dbConnection }),
  })
)

app.use( (req, res, next) => {
  console.log('req.session', req.session);
  return next();
});

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser


// Routes
app.use('/user/', user);

app.post('/user', (req, res) => {
  console.log('user signup');
  req.session.username = req.body.username;
  res.send('success');
})

const readFile = util.promisify(fs.readFile);

const api_url = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAbOxH-4pY6k2hqnjj-OTMNuotQxKgS95A";

async function getStuff(file) {
  const encoded = await file.toString('base64');
  let request_body = {
    "requests": [
      {
        "image": {
          "content": encoded
        },
        "features": [
          {
            "type": "TEXT_DETECTION"
          }
        ],
        "imageContext": {
          "languageHints": ['bn', 'en']
        }
      }
    ]
  };

  request_body = await JSON.stringify(request_body);

  const response = await fetch(api_url, {
    method: 'POST',
    body: request_body
  });

  return await response.json();
  
}

app.get("/api/hello", function (req, res) {
  res.redirect('/login');
});

app.put("/upload", function (req, res) {
  getStuff(req.files.img.data)
    .then(data => res.send({"data": data.responses[0].fullTextAnnotation.text}))
    .catch(err => res.send(err));
});
/////Translate///////
app.post('/translate', (req, res) => {

});
//Start the server
app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);

});
