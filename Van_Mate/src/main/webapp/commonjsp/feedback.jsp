<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>VanMate</title>
<%@include file="/commoncss/allcss.html" %>
<style type="text/css">
img{
float: left;
width: 760px;
height: 462px;
}
.card
{
background-color:#F9F9F9;
width:500px;
margin:;
}
</style>
</head>
<body>
<%
 String mssg=(String)request.getAttribute("message");//to fetch the value from key
 //System.out.println(mssg);
 if(mssg!=null)
 {
%>
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong><%=mssg %></strong>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

<%} %>

<%@include file="/headers/common_header.html" %>
<br>
<div class="container-fluid" style="background-image:url('/Van_Mate/images/daniel-monteiro-47VpDiZzzEQ-unsplash.jpg');">
<div class="row">
<div class="col-2"></div>
<div class="col-4">
<img alt="hi" src="/Van_Mate/images/daniel-monteiro-47VpDiZzzEQ-unsplash.jpg" >
</div>
<div class="col-6">
<div class="card">
  <div class="card-body">
    <h1 class="text-center" style="font-family: Arial;font-style: italic;text-shadow: 1px 1px 2px black, 0 0 5px red;"><i class='far fa-envelope-open' style='font-size:36px'></i>
    FeedBack</h1>
  <form action="/Van_Mate/User_Feedback" method="post" class="form-horizontal needs-validation" novalidate>
<div class="mb-3 mt-4 row">	
<label for="name" class="col-sm-3 col-form-label text-center fw-bolder ">NAME:</label>
<div class="col-sm-9">
<input type="text" class="form-control" name="username" placeholder="Enter your Name." required="required" >
<div class="invalid-feedback">
      Please provide a name.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="email" class="col-sm-3 col-form-label text-center fw-bolder ">EMAIL:</label>
<div class="col-sm-9">
<input type="email" class="form-control" name="useremail" placeholder="Enter your Mail Id." required="required">
<div class="invalid-feedback">
      Please provide a valid email.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="phone" class="col-sm-3 col-form-label text-center fw-bolder ">PhoneNo.</label>
<div class="col-sm-9">
<input type="tel" class="form-control" name="userphone" placeholder="Enter your number." >
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="rating" class="col-sm-3 col-form-label text-center fw-bolder ">Rating:</label>
<div class="col-sm-9">
<select name="userratings" required="required">
<option value="">Choose Ratings.</option>
    <option value="1">1*</option>
    <option value="2">2**</option>
    <option value="3">3***</option>
    <option value="4">4****</option>
    <option value="5">5*****</option>
</select>
<div class="invalid-feedback">
      Please provide ratings.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="feedback" class="col-sm-3 col-form-label text-center fw-bolder ">Feedback:</label>
<div class="col-sm-9">
<textarea name="userfeedback" rows="1" cols="20" required="required"></textarea><div class="invalid-feedback">
      Please provide a valid feedback.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">
<div class="col-sm-4"></div>
<div class="col-sm-8">
<button type="reset" class="btn btn-secondary btn-sm">RESET</button>
<button type="submit" class="btn btn-secondary btn-sm">SUBMIT</button>
</div>
</div>
</form>
</div>
</div>
 </div>
</div>
</div>
<hr>
<%@include file="/footers/common_footer.html"%>
<%@include file="/commonjs/alljs.html" %>
<script type="text/javascript" src="/Van_Mate/commonjs/custom_validation.js"></script>
</body>
</html>