<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="vanmate.utilities.Messages" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Booking Request School</title>
<%@include file="/commoncss/allcss.html" %>
<style type="text/css">
body
{
background-color: #F8F8FF;
}
.form-horizontal 
    {
	max-width: 600px;
	padding: 30px;
	padding-top:100px;
	margin: auto;
	background-color: #CE5959;
	color: #FFFFFF
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
<div class="alert alert-warning alert-dismissible fade show" role="alert" style="margin-top: 50px;">
  <strong><%=mssg %></strong>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

<%} %>
<%
String id=(String)session.getAttribute("sessionKey");
if(id==null)
{
	request.setAttribute("message",Messages.UNAUTHORIZED_MESSAGE);
	RequestDispatcher rd=request.getRequestDispatcher("/school/school_login.jsp");
	rd.forward(request, response);
}
else{
%>
<%@include file="/headers/school_header.html" %>

<div class="container-fluid">

<form action="/Van_Mate/School_Booking_Request" method="post" class="form-horizontal needs-validation" novalidate >
<h1 style="text-align: center;font-weight: bolder;letter-spacing: 3px;font-size: 50px;font-family: sans-serif;padding-bottom: 30px;">
<i class='fas fa-taxi' style='font-size:70px'></i>Book Vehicle</h1>

<div class="mb-3 mt-4 row">	
<label for="name" class="col-sm-3 col-form-label text-center fw-bolder ">Vehicle Type:</label>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
 
 <select class="form-select" aria-label="type" name="vtype" required="required">
  <option selected>Select Vehicle</option>
  <option value="Car">Car</option>
  <option value="Van">Van</option>
  <option value="E-Rickshaw">E-Rickshaw</option>
</select>
 <div class="invalid-feedback">
                 Select any Vehicle.
 </div>
</div>
</div>

<div class="mb-3 mt-4 row">
<label for="source" class="col-sm-3 col-form-label text-center fw-bolder">Source:</label>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<input type="text" class="form-control" name="source" placeholder="Enter source." required="required">
<div class="invalid-feedback">
                    Enter source.
                  </div>
</div>
</div>
			
<div class="mb-3 mt-4 row">
<label for="destination" class="col-sm-3 col-form-label text-center fw-bolder">Destination:</label>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<input type="text" class="form-control" name="destination" placeholder="Enter destination." required="required">
<div class="invalid-feedback">
                    Enter destination.
                  </div>
</div>
</div>

<div class="mb-3 mt-4 row">
<label for="time" class="col-sm-3 col-form-label text-center fw-bolder">Preferred Timings:</label>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<input type="time" class="form-control" name="timing" placeholder="Enter preferred time." required="required">
<div class="invalid-feedback">
                    Enter time.
                  </div>
</div>
</div>

<div class="mb-3 mt-4 row">
<label for="student" class="col-sm-3 col-form-label text-center fw-bolder">No. of Student:</label>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<input type="number" class="form-control" name="nstudent" placeholder="Enter total students." required="required">
<div class="invalid-feedback">
                    Enter number of student.
                  </div>
</div>
</div>

<div class="mb-3 row">
<div class="col-sm-2"></div>
<button type="submit" class="btn btn-outline-light col-sm-8">Book</button>
</div>

</form>

</div>
<%} %>
<%@include file="/commonjs/alljs.html" %>
<%@include file="/footers/common_footer.html"%>
<script type="text/javascript" src="/Van_Mate/commonjs/custom_validation.js"></script>
</body>
</html>