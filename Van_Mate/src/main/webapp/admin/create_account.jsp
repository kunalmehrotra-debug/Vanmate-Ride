<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>VANMATE ADMIN</title>
<%@include file="/commoncss/allcss.html" %>
</head>
<style>
body {
	color: #999;
	background: #FCFFE7;
	font-family: 'Roboto', sans-serif;
}
.form-control, .form-control:focus, .input-group-addon {
	border-color: #e1e1e1;
	border-radius: 0;
}
.createaccount {
    background-color:#D27685;
	width: 390px;
	margin: 0 auto;
	padding: 30px 0;
}
.createaccount h2 {
background-color:#F9DBBB;
	color: #636363;
	margin: 0 0 15px;
	text-align: center;
}
.createaccount .lead {
	font-size: 14px;
	margin-bottom: 30px;
	text-align: center;
}
.createaccount form {		
	border-radius: 1px;
	margin-bottom: 15px;
	background: #fff;
	border: 1px solid #f3f3f3;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
	padding: 30px;
}
.createaccount .form-group {
	margin-bottom: 20px;
}
.createaccount label {
	font-weight: normal;
	font-size: 13px;
}
.createaccount .form-control {
	min-height: 38px;
	box-shadow: none !important;
	border-width: 0 0 1px 0;
}	
.createaccount .input-group-addon {
	max-width: 42px;
	text-align: center;
	background: none;
	border-bottom: 1px solid #e1e1e1;
	padding-left: 5px;
}
.createaccount .btn, .createaccount .btn:active {        
	font-size: 16px;
	font-weight: bold;
	background: #19aa8d !important;
	border-radius: 3px;
	border: none;
	min-width: 140px;
}
.createaccount .btn:hover, .createaccount .btn:focus {
	background: #179b81 !important;
}
.createaccount a {
	color: #19aa8d;
	text-decoration: none;
}	
.createaccount a:hover {
	text-decoration: underline;
}
.createaccount .fa {
	font-size: 21px;
	position: relative;
	top: 8px;
}
.createaccount .fa-paper-plane {
	font-size: 17px;
}
.createaccount .fa-check {
	color: #fff;
	left: 9px;
	top: 18px;
	font-size: 7px;
	position: absolute;
}
<body>
 <%@include file="/headers/admin_header.html" %>
 
<div class="createaccount">	
    <form action=""" method="post" class="form-horizontal needs-validation" novalidate>
		<h2>Create Account</h2>
        <div class="form-group">
			<div class="input-group">
				<span class="input-group-addon"><i class="fa fa-user"></i></span>
				<input type="text" class="form-control" name="username" placeholder="Enter Username" required="required">
				<div class="invalid-feedback">
                 Enter username
                </div>
			</div>
        </div>
		<div class="form-group">
			<div class="input-group">
				<span class="input-group-addon"><i class="fa fa-lock"></i></span>
				<input type="text" class="form-control" name="password" placeholder="Enter Password" required="required">
				<div class="invalid-feedback">
				 Enter password
                </div>
			</div>
        </div>
        
        <div class="form-group">
			<div class="input-group">
				<span class="input-group-addon"><i class="fa fa-user"></i></span>
				<select class="form-select form-control" aria-label="vehicletype" name="vehicle" required="required">
  <option selected>Select User Type.</option>
  <option value="Parent">Parent</option>
  <option value="School">School</option>
</select>
				<div class="invalid-feedback">
				 Select valid user
                </div>
			</div>
        </div>
		 
        <div class="mb-3 row">
<div class="col-sm-3"></div>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<button type="submit" class="btn btn-outline" style="background-color: #F16767;">Submit</button>
</div>
</div>  
    </form>
</div>
 
 <%@include file="/commonjs/alljs.html" %>
<script type="text/javascript" src="/Van_Mate/commonjs/custom_validation.js"></script>
</body>
</html>