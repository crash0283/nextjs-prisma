import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let employee = new Schema({
  em_name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  contact_number: {
      type: String,
      required: true
  },
  years_in_company: {
    type: Number,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

mongoose.models = {};

let Employee = mongoose.model('Employee', employee);

export default Employee;