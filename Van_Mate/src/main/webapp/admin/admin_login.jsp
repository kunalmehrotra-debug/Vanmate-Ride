<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>VanMate</title>
<%@include file="/commoncss/allcss.html" %>
<style type="text/css">
body{
background-color: #20B2AA;
}
.card{
width: 500px;
margin: auto;
}
label{
color: #FF0000;
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

<h1 style="text-align: center;color: #FAEBD7;text-shadow: 2px 2px 4px #000;font-size: 45px;">Welcome VanMate The Student's Ride</h1>
<div class="card mb-3 mt-5">
  <img src="/Van_Mate/images/transport.png" class="card-img-top" alt="Transport image">
  <div class="card-body">
    <h4 class="card-title" style="text-align: center;color: #FF0000">VANMATE ADMIN LOGIN</h4>
    
<form action="/Van_Mate/Admin_Login" method="post" class="form-horizontal needs-validation" novalidate>
<div class="mb-3 mt-4 row">	
<label for="name" class="col-sm-3 col-form-label text-center fw-bolder ">ID:</label>
<div class="col-sm-9">
<input type="text" class="form-control" name="adminid" placeholder="Enter your ID." required="required">
 <div class="invalid-feedback">
      Enter a valid adminID.
</div>
</div>
</div>
<div class="mb-3 row">	
<label for="name" class="col-sm-3 col-form-label text-center fw-bolder">PASSWORD:</label>
<div class="col-sm-9">
<input type="password" class="form-control" name="adminpass" placeholder="Enter password." required="required">
 <div class="invalid-feedback">
      Enter a valid password.
</div>
</div>
</div>
<div class="mb-3 row">
<div class="col-sm-4"></div>
<div class="col-sm-3">
<button type="submit" class="btn btn-outline-success">Submit</button>
</div>
</div>
</form>

</div>
</div>
<%@include file="/commonjs/alljs.html" %>
<script type="text/javascript" src="/Van_Mate/commonjs/custom_validation.js"></script>
</body>
</html>