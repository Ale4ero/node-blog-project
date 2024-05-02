const express = require('express');

//third party logger middleware
const morgan = require('morgan');

const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://Balo:Ferb2002@nodetut.s4mqryf.mongodb.net/Balo-Blog?retryWrites=true&w=majority&appName=nodetut'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to db')
        //listen for requests
        app.listen(3000);
    })
    .catch((err)=> console.log(err));

//register view engine 
app.set('view engine', 'ejs');


// middleware & static files
app.use(express.static('public'));
//middleware to accept form data
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });


//routes
app.get('/', (req, res)=>{
    res.redirect('/blogs');
})
app.get('/about', (req, res)=>{
    // res.send('<p>home page</p>');
    res.render('about', { title: 'About'});
})


//blog routes
app.use('/blogs',blogRoutes);





//404 page
app.use((req, res)=>{
    res.status(404).render('404', { title: '404'})
})

app.use((req, res, next)=>{
    console.log('in the next middleware');
    next();
})

