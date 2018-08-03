module.exports = function(app, db) {
  var ObjectID = require('mongodb').ObjectID;

  /*-----POST---*/
    app.post('/students', (req, res) => {
      const item = { name: 'Lakhvinder', phone: '854585451' };
      db.collection('student').insert(item, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
        }
      });
    });

/*------GET(All)-----*/
    app.get('/students', (req, res) => {
      db.collection('student').find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    });

/*-------GET(Single)------*/
    app.get('/students/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      db.collection('student').findOne(details, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send(item);
        } 
      });
    });

  /*---DELETE---*/
    app.delete('/students/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      db.collection('student').remove(details, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send('Student ' + id + ' deleted!');
        } 
      });
    });

/*---PUT---*/
    app.put('/students/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      const student = { name: 'Rajesh' };
      db.collection('student').update(details, student, (err, result) => {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(student);
        } 
      });
    });

  };