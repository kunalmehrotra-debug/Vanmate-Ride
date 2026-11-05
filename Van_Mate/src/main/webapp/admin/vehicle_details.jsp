<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>VANMATE ADMIN</title>
<%@include file="/commoncss/allcss.html" %>
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
<%@include file="/headers/admin_header.html" %>
<div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
        <div class="card border-top border-bottom border-3" style="border-color: #f37a27 !important;">
          <div class="card-body " style="background-color: #F6E1C3;">
<h1 style="text-align: center;background-color: #E9A178;" class="fw-bolder"><i class='far fa-edit'></i>Vehicle Details</h1>
<form action="/Van_Mate/Vehicle_Details" method="post" class="form-horizontal needs-validation" novalidate>
<div class="mb-3 mt-4 row">	
<label for="name" class="col-sm-3 col-form-label text-center fw-bolder ">Vehicle Type:</label>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<select class="form-select" aria-label="vehicletype" name="vehicle" required="required">
  <option selected>Select Vehicle Type.</option>
  <option value="Van">Van</option>
  <option value="E-Rickshaw">E-Rickshaw</option>
  <option value="Car">Car</option>
</select>
 <div class="invalid-feedback">
      Select a vehicle.
</div>
</div>
</div>

<div class="mb-3 mt-4 row">	
<label for="name" class="col-sm-3 col-form-label text-center fw-bolder ">Vehicle Number:</label>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<input type="text" class="form-control" name="vehicleno" placeholder="Enter vehicle no." required="required">
 <div class="invalid-feedback">
      Enter vehicle number
</div>
</div>
</div>

<div class="mb-3 mt-4 row">	
<label for="name" class="col-sm-3 col-form-label text-center fw-bolder ">Vehicle Description:</label>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<textarea rows="2" cols="30" name="vehicledes" required="required"></textarea>
 <div class="invalid-feedback">
      Enter vehicle description.
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

<%@include file="/commonjs/alljs.html" %>
<script type="text/javascript" src="/Van_Mate/commonjs/custom_validation.js"></script>
</body>
</html>