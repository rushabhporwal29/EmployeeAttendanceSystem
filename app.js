const express=require('express');
const mongoose=require('mongoose');
const employeeRoutes=require('./routes/employeeRoutes');
const attendanceRoutes=require('./routes/attendanceRoutes');
const morgan= require('morgan');

// Express app
const app=express();

// MongoDB Connection
const dbURL = 'mongodb://localhost:27017/employee'
mongoose.connect(dbURL,{ useNewUrlParser: true , useUnifiedTopology: true })
    .then(() => {
        console.log('Database connection successful');
        app.listen(3000);
        console.log('Listening at port 3000');
    })
    .catch(err => {
        console.error('Database connection error')
        
    });

//register view engine
app.set('view engine','ejs');

// 3rd party middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

// Static Files
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('auth',{auth:{signUp:"hidden"}});
});

app.get('/:id',(req,res)=>{
    let auth={
        login:"hidden",
        signUp:"hidden"
    }
    auth[req.params.id]="";
    res.render('auth',{auth:auth});
});
app.post('/login',(req,res)=>{

})

app.post('/signUp',(req,res)=>{
    res.render('auth',{auth:{signUp:"hidden"}}); 
})

app.use('/employee',employeeRoutes);

app.use('/attendance',attendanceRoutes)


