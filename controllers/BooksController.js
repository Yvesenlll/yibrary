// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation
 

  The resource controller must contain the 7 resource actions:
  - index
  - show
  - new
  - create
  - edit
  - update
  - delete
*/
const viewPath = ('books');
const Book = require('../models/book');
const User = require('../models/user');


exports.index = async (req, res) => {
  try{
      const books = await Book
      .find()
      .populate('user')
      .sort({updatedAt: 'desc'});

      res.render(`${viewPath}/index`, {
      pageTitle: 'Library',
      books: books
      }); 
  }catch(error){
      req.flash('danger', `There was an error displaying the library: ${error}`)
      res.redirect('/')
  }
};

exports.show = async (req, res) => {
  try {
      // console.log(req.params);
  const book = await Book.findById(req.params.id)
  .populate('user');
  // req.flash('success', 'test 123');
   res.render(`${viewPath}/show`, {
       pageTitle: Book.title,
       book: book
   });
  } catch (error) {
      req.flash('danger', `There was an error displaying the book: ${error}`)
      res.redirect('/')
  }
  
};

exports.new = (req,res) => {

  res.render(`${viewPath}/new`, {
      pageTitle: "New Book"
  });
};

exports.create = async (req,res) => {
  try {
      const {user: email} = req.session.passport;
      const user = await User.findOne({email: email});
      const bookID = await Book.create({user: user._id, ...req.body});        
      req.flash('success', 'Book created successfully');
      
      res.redirect(`/books/${bookID.id}`);
  } catch (error) {
      req.flash('danger', `There was an error creating the book: ${error}`);
      req.session.formData = req.body;
      res.redirect('books/new');
  }

};

exports.edit = async (req, res) => {

  try {
      const book = await Book.findById(req.params.id);
   // req.flash('success', 'test 123');
      res.render(`${viewPath}/edit`, {
      pageTitle: book.title,
      formData: book
   });
  } catch (error) {
      req.flash('danger', `There was an error accessing the book: ${error}`)
      res.redirect('/')
  }
};

exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});

    let book = await Book.findById(req.body.id);
    if (!book) throw new Error('Book could not be found');

    const attributes = {user: user._id, ...req.body};
    await Book.validate(attributes);
    await Book.findByIdAndUpdate(attributes.id, attributes);

    req.flash('success', 'The book was updated successfully');
    res.redirect(`/books/${req.body.id}`);
  } catch (error) {
    req.flash('danger', `There was an error updating this book: ${error}`);
    res.redirect(`/books/${req.body.id}/edit`);
  }
};


exports.delete = async (req, res) => {
  try {
        console.log(req.body);
        await Book.deleteOne({_id: req.body.id});
        req.flash('success', 'The book was deleted successfully');
        res.redirect(`/books`);
      } catch (error) {
        req.flash('danger', `There was an error deleting this book: ${error}`);
        res.redirect(`/books`);
      }
};







