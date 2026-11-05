<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>VanMate</title>
<%@include file="/commoncss/allcss.html" %>
<style type="text/css">
.formbg{
background-color: #F3EFE0;
}
.form-horizontal 
    {
	max-width: 600px;
	padding: 30px;
	padding-top:100px;
	margin: auto;
	background-image:url("/Van_Mate/images/daniel-monteiro-47VpDiZzzEQ-unsplash.jpg");
	background-size:cover;
	background-repeat:no-repeat;
	background-position:center;
	color: #E96479;
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

<div class="container-fluid formbg">

<form action="/Van_Mate/Query" method="post" class="form-horizontal needs-validation" novalidate>
<h1 style="text-align: center;font-weight: bolder;letter-spacing: 3px;font-size: 40px;font-family: sans-serif;">
<i class='fas fa-comments' style='font-size:40px'></i>
QUERY</h1>

<div class="mb-3 row">	
<label for="name" class="col-sm-3 col-form-label text-center fw-bolder">NAME:</label>
<div class="col-sm-9">
<input type="text" class="form-control" name="username" placeholder="Enter your Name." required="required">
 <div class="invalid-feedback">
      Please provide a valid username.
    </div>
</div>
</div>

<div class="mb-3 row">
<label for="mail" class="col-sm-3 col-form-label text-center fw-bolder">EMAIL:</label>
<div class="col-sm-9">
<input type="email" class="form-control" name="useremail" placeholder="Enter your Mail." required="required">
 <div class="invalid-feedback">
      Please provide a valid EMail.
    </div>
</div>
</div>
			
<div class="mb-3 row">
<label for="phone" class="col-sm-3 col-form-label text-center fw-bolder">PhoneNO.:</label>
<div class="col-sm-9">
<input type="tel" class="form-control" name="userphone" placeholder="Enter your phoneno." required="required">
 <div class="invalid-feedback">
      Please provide a valid number.
    </div>
</div>
</div>

<div class="mb-3 row">
<label for="query" class="col-sm-3 col-form-label text-center fw-bolder">Query:</label>
<div class="col-sm-9">
<textarea rows="2" cols="10" class="form-control" name="userquery" placeholder="Enter Query." required="required"></textarea>
 <div class="invalid-feedback">
      Please provide any query.
    </div>
</div>
</div>

<div class="mb-3 row">
<button type="submit" class="btn  btn-lg" style="background-color: #E96479;">Submit</button>
</div>
</form>

</div>

<%@include file="/footers/common_footer.html"%>
<%@include file="/commonjs/alljs.html" %>
<script type="text/javascript" src="/Van_Mate/commonjs/custom_validation.js"></script>
</body>
</html>