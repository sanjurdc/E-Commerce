var express = require('express');
var router = express.Router();
var pool=require('./pool')
var LocalStorage=require('node-localstorage').LocalStorage;
localStorage=new LocalStorage('./scratch'); 

///// Login 1 ////
router.get('/adminlogin', function(req, res, next) {
  
    res.render('adminlogin',{message:'',status:false});
  
  });
 
    

  /////// End Login 1 /////

  // logout //

  router.get('/adminlogout', function(req, res, next) {
    localStorage.removeItem('ADMIN');
    res.redirect('/admin/adminlogin');
  });

  // End logout //

  ////// Dashboard /////
 
  router.get('/dashboard', function(req, res, next) {

    var query="select count(*) as countproducts, sum(stock) as countstock from products ; select count(*) as countcategory from category ; select count(*) as countbrand from brand ; "
    
    pool.query(query,function(error,result){
      if(error)
      {
        console.log(error)
        res.render('dashboard',{status:false,message:'Server Error',result:[]});
      }
      else
      {console.log("xxxx",result[1][0].countcategory)
        var admin=JSON.parse(localStorage.getItem('ADMIN'))
        res.render('dashboard',{admin:admin,status:true,message:'',result:result});
      }
    })
    
  });

  /////// Login 2 //////
  router.post('/check_admin_login', function(req, res, next) {
    pool.query("select * from admins where (emailid=? or mobilenumber=?) and password=?",
     [req.body.emailid,req.body.emailid,req.body.password],function(error,result){
      
           if(error)
           {
            console.log(error)
            res.render('adminlogin',{message:'Server Error',status:true});
           }
           else
           {
            if(result.length==1)
            { console.log("RESULT:",result[0])
              localStorage.setItem('ADMIN',JSON.stringify(result[0]))           // use for security key as save login details 
             res.redirect('/admin/dashboard')
            }
            else
            {
              res.render('adminlogin',{message:'Invalid Emailid/Password',status:false});
            }
           }
    })
    
   
  });

  module.exports = router;