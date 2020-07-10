// INSTRUCTIONS
/*
  Create a new resource model that uses the User
  as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  Your model must contain at least three attributes
  other than the associated user and the timestamps.

  Your model must have at least one helpful virtual
  or query function. For example, you could have a
  book's details output in an easy format: book.format()
*/
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  }
},{
  timestamps: true
});

BookSchema.virtual('details')
.get(function(){
  const detail = this.detail;
  return detail
  .replace(/(<([^>]+)>)/ig,"")
  .substring(0,250);
})

module.exports = mongoose.model('Book', BookSchema);
