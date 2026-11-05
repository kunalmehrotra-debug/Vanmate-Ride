<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>VANMATE Parent Registration</title>
<%@include file="/commoncss/allcss.html" %>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script>
$(document).ready(function(){
    $("#username").change(function(){
        //alert("hello")
        console.log($(this).val());
        var username = $(this).val();//it will fetch the value from input text
        $.ajax({
            url: "/Van_Mate/Parent_Registration",
            type : "GET",
            data:{
                'id': username
            },
            //dataType: 'json',
            success: function(response_data){
              //alert(response_data)
              if(response_data!="")
            	  {
					$("#ajaxmsg").text("This userName alredy present")
					$("#username").val("")
            	  }
              else
              {
            	  $("#ajaxmsg").text("")
              }
					
                }
            
            
                });
    });
})
</script>

</head>
<body>
<%@include file="/headers/common_header.html" %>

<%
 String mssg=(String)request.getAttribute("IDExistence");//to fetch the value from key
 //System.out.println(mssg);
 if(mssg!=null)
 {
%>
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong><%=mssg %></strong>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

<%} %>

<div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
        <div class="card rounded-3">
          <img src="/Van_Mate/images/register.jpg" class="w-100" style="border-top-left-radius: .3rem; border-top-right-radius: .3rem;height: 250px;"
            alt="School details">
          <div class="card-body md-5" style="background-color: #E9A178;">
            <h2 style="text-align: center;background-color:#F6E1C3;font-family: Simplifica ; " class="fw-bolder">PARENT REGISTRATION</h2>
            
            <form action="/Van_Mate/Parent_Registration" method="post" class="form-horizontal needs-validation" novalidate>
            <div class="mb-3 mt-4 row">	
<label for="id" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >ID:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<input type="text" class="form-control" name="parentid" id="username" placeholder="Enter ID." required="required" >

<span id="ajaxmsg" style="color: red;"></span>

<div class="invalid-feedback">
      Please enter valid id.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="password" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >PASSWORD:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<input type="password" class="form-control" name="parentpass" placeholder="Enter password." required="required" >
<div class="invalid-feedback">
      Enter a valid password.
    </div>
</div>
</div>
            <div class="mb-3 mt-4 row">	
<label for="name" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >NAME:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<input type="text" class="form-control" name="parentname" placeholder="Enter Your Name." required="required" >
<div class="invalid-feedback">
      Please enter your name.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="email" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >EMAIL:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<input type="email" class="form-control" name="parentemail" placeholder="Enter EMail." required="required" >
<div class="invalid-feedback">
      Enter Email.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="phone" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >PHONE NO.</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<input type="tel" class="form-control" name="parentphone" placeholder="Enter phone number." required="required" >
<div class="invalid-feedback">
      Enter Phone number.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="city" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >CITY:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<input type="text" class="form-control" name="parentcity" placeholder="Enter city." required="required" >
<div class="invalid-feedback">
      Enter City.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="address" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >ADDRESS:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<textarea rows="2" cols="30" name="address" required="required"></textarea>
<div class="invalid-feedback">
      Enter your address.
    </div>
</div>
</div>
<div class="mb-3 row">
<div class="col-sm-4"></div>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<button type="submit" class="btn btn-outline" style="background-color: #F16767;">Submit</button>
</div>
</div> 
            </form>
            
          </div>
        </div>
      </div>
    </div>
  </div>
<%@include file="/footers/common_footer.html"%>
 <%@include file="/commonjs/alljs.html" %>
<script type="text/javascript" src="/Van_Mate/commonjs/custom_validation.js"></script>
</body>
</html>