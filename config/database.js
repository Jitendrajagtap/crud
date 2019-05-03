const mongoose = require('mongoose');

// const server = '127.0.0.1:27017';
// const database_name = 'case_study';

// mlab
const server = 'mongodb+srv://case_study:case_study@cluster0-2zdaw.gcp.mongodb.net/case_study?retryWrites=true'
const database_name = 'case_study';

class Database {
    constructor() {
      this._connect()
    }

    _connect() {
      mongoose.connect(server,{ useNewUrlParser: true })
      .then(()=>{
          console.log('Connected to database');
      })
      .catch((err)=>{
          console.error('Unable to connect.');
          console.error(err);
      }); 
    }

}

module.exports = new Database();