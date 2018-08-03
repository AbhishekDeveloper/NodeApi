const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
const port = 3000;
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/',function(req,res){
    res.send({Status:'Sucess' });
});

MongoClient.connect(db.URL, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})