   express = require('express');
      //config      = require('./config'),
      mongoose    = require('mongoose'),
      util = require('util')


 app = express();
 port = process.env.PORT || 5000;

 app.use(function(req, res, next){
  if(req.headers['x-forwarded-proto'] === 'http'){
    next();
  }else{
    res.redirect('http://' + req.hostname + req.url);
  }
});
//Connecting database
 app.use(function(req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        next();
    });
 configDB = require('./config/database.js');
mongoose.connect(configDB.EvenNodeDB);

 db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection failed:'));
db.once('open', function (callback) {
    console.log("Database :: PakJazba :: connection established successfully.");
});


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/upload',(req, res) =>{
	console.log('--------------'+JSON.stringify(req.query.image)+'-----------------');
	//var image = req.body.image;
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(req.query.image.name))
});

app.listen(port, () => console.log(`Listening on port ${port}`));