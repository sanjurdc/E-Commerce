var mysql=require("mysql")
var pool=mysql.createConnection({
   host:'localhost',
   port:3306,
   database:'minor project', 
   user:'root',
   password:'Sanjay@12',
   multipleStatements:true
})
module.exports=pool