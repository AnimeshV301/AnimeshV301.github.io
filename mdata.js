var mongoose = require('mongoose');
var CustmerSchema = new  mongoose.Schema({
    name:  String, // String is shorthand for {type: String}
    email: String,
    address:   String,
    city: String,
    pin:Number
  });
  var CustmerModel = mongoose.model('Custmer', CustmerSchema);
  
  var Custmer = new CustmerModel({
      name:`Animesh`,
      email:`animeshv2558@gmail.com`,
      address:`lucnow`,
      city:`Lucknow`,
      pin:226021
  });
  console.log(Custmer);