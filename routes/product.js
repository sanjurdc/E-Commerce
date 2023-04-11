var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer');
const { cache } = require('ejs');
const e = require('express');
var LocalStorage=require('node-localstorage').LocalStorage;
localStorage=new LocalStorage('./scratch'); 

/* GET home page. */

router.get('/fetch_all_categories', function(req, res, next) {

  pool.query("select * from category",function(error,result){
      if(error)
      {
        res.status(500).json([]);
      }
     else
     {
      res.status(200).json({category:result})
     }
            })
}); 
router.get('/fetch_all_subcategories', function(req, res, next) {

  pool.query("select * from subcategory where categoryid=?",[req.query.categoryid],function(error,result){
      if(error)
      {
        res.status(500).json([]);
      }
     else
     {
      res.status(200).json({subcategory:result})
     }
            })
}); 
router.get('/fetch_all_brands', function(req, res, next) {

  pool.query("select * from brand where categoryid=?",[req.query.categoryid],function(error,result){
      if(error)
      {
        res.status(500).json([]);
      }
     else
     {
      res.status(200).json({brand:result})
     }
            })
}); 




router.get('/product', function(req, res, next) {
  try{
    var admin=localStorage.getItem('ADMIN')
    if(admin==null)
    {
      res.redirect('/admin/adminlogin'); 
    }
    res.render('productinterface',{message:''});  
  }
   catch(e)
   {
    res.redirect('/admin/adminlogin');
   }
});
 router.post('/submitproduct', upload.any(), function(req, res, next) {
  console.log("Form Data :",req.body) 
  console.log("File :",req.files)
    pool.query("insert into products (categoryid, subcategoryid, brandid, productname, price, offerprice, ratings, description, stock, status, picture) values(?,?,?,?,?,?,?,?,?,?,?)",
    [req.body.categoryid,
      req.body.subcategoryid,
       req.body.brandid, 
       req.body.productname, 
       req.body.price,
        req.body.offerprice,
         req.body.ratings, 
         req.body.description,
          req.body.stock, 
          req.body.status, 
         // req.body.picture (picture in body ,enctype="multipart/form-data" removes the picture in body )
         //req.files[0].originalname  //when picture is save to same name then this is applied
         req.files[0].filename        //used for unique id
        ],
          
          function(error,result){
     if(error)
     {
        console.log('ERROR:',error)
        res.render('productinterface',{message:'Server Error ....'})
     }
     else
     {
        console.log('RESULT:',result)
        res.render('productinterface',{message:'Record Successfully Submitted ....'})
     }
    })
    
  });

  /// display product ///

  router.get('/display_all_products', function(req, res, next) {

    
    
    pool.query("select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname, (select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname, (select B.brandname from brand B where B.brandid=P.brandid) as brandname from products P",function(error,result){
    if(error)
 {
  console.log('ERROR:',error)
  res.render("displayallproducts",{status:false,data:'Server Error....'})
 }
 else
 {
     
  if(result.length==0)
  {
    res.render("displayallproducts",{status:false,data:"No Record Found .... "})
  }
  else
  {
    
    res.render("displayallproducts",{status:true,data:result})
  }
 }
  });
})
  


  ///// end display product ////


router.get('/update_all_products',function(req,res){

  

  pool.query("select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname, (select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname, (select B.brandname from brand B where B.brandid=P.brandid) as brandname from products P",function(error,result){
 
    if(error)
 {
  console.log('ERROR:',error)
  res.render("updateproduct",{status:false,data:'Server Error....'})
 }
 else
 {
  if(result.length==0)
  {
    res.render("updateproduct",{status:false,data:"No Record Found .... "})
  }
  else
  {
    res.render("updateproduct",{status:true,data:result})
  }
 }
 
  })


  /// login ///

  

})

module.exports = router;
