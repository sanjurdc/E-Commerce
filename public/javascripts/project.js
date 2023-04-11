$(document).ready(function(){
var serverURL="http://localhost:3000"
$.getJSON(`${serverURL}/product/fetch_all_categories`,function(data){
  //alert(JSON.stringify(data))
data.category.map((item)=>{
    $('#categoryid').append(
      $('<option>').text(item.categoryname).val(item.categoryid))
    
})
      $('#categoryid').formSelect();  //used for refresh
})
      

$('#categoryid').change(function(){

        $.getJSON(`${serverURL}/product/fetch_all_subcategories`,{'categoryid':$('#categoryid').val()},function(data){
            //alert(JSON.stringify(data))
            $('#subcategoryid').empty()
            $('#subcategoryid').append(
              $('<option>').text('Choose Sub Category')) 

          data.subcategory.map((item)=>{
              $('#subcategoryid').append(
                $('<option>').text(item.subcategoryname).val(item.subcategoryid))

          }) 
          $('#subcategoryid').formSelect();
          })
            
          $.getJSON(`${serverURL}/product/fetch_all_brands`,{'categoryid':$('#categoryid').val()},function(data){
            //alert(JSON.stringify(data))
            $('#brandid').empty()
            $('#brandid').append(
              $('<option>').text('Choose Brands'))
              
          data.brand.map((item)=>{
              $('#brandid').append(
                $('<option>').text(item.brandname).val(item.brandid))
              
          })
          $('#brandid').formSelect();
        })
        })

         
      })