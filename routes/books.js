const {new: _new,index, show, create, edit, update, delete:_delete }= require('../controllers/BooksController');

function auth (req, res, next, message, redirectPath){
    if(!req.isAuthenticated()){
        req.flash('danger', message);
        return res.redirect(redirectPath);
    }
next();
}
module.exports = router => {
    router.get('/books', index); // this is public
    router.get('/books/new', auth, _new);   // this is authenticated
    router.post('/books', auth, create);// this is authenticated
    router.post('/books/update', auth,  update);// this is authenticated
    router.post('/books/delete', auth, _delete);// this is authenticated
    router.get('/books/:id/edit', auth, edit);// this is authenticated
    router.get('/books/:id', show);// this is public 
}

