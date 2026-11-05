<%@page import="org.w3c.dom.html.HTMLDivElement"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="vanmate.utilities.Messages" %>
    <%@page import="vanmate.beans.*" %>
     <%@page import="vanmate.admin.AdminDao" %>
     <%@page import="java.util.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Vehicle Assignment</title>
<%@include file="/commoncss/allcss.html" %>
</head>
<body>
<%
 int rid=(int)request.getAttribute("requestid");//to fetch the value from key
%>

<%@include file="/headers/admin_header.html" %>

<% 
	AdminDao dao=new AdminDao();
	String vtype=dao.getVehicletype(rid);
	ArrayList<Vehicle> vehiclelist=dao.requestedVehicle();
%>
<div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
        <div class="card border-top border-bottom border-3" style="border-color: #f37a27 !important;">
          <div class="card-body " style="background-color: #57C5B6;">
<h1 style="text-align: center;background-color: #E9A178;" class="fw-bolder"><i class='far fa-edit'></i>Vehicle Details</h1>
<form action="/Van_Mate/Student_Vehicle_Allotment" method="post" class="form-horizontal needs-validation" novalidate>
<div class="mb-3 mt-4 row">	
<label for="vtype" class="col-sm-3 col-form-label text-center fw-bolder ">Selected Vehicle Type:</label>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
 
 <input type="text" value=<%=vtype %> readonly="readonly">
 
</div>
</div>

<div class="mb-3 mt-4 row">	
<label for="vehicle" class="col-sm-3 col-form-label text-center fw-bolder ">Select Vehicle:</label>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">

<select class="form-select" aria-label="vehiclechoose" name="vehiclechoose">
  <option >Select <%=vtype %></option>
  <%
  for(Vehicle v: vehiclelist)
  {
  %>
  <option value=<%=v.getVehicle_number()%>><%=v.getVehicle_number()%></option>
  <%} %>
</select>

</div>
</div>
<input type="hidden" value=<%=rid %> name="rid">


 <div class="mb-3 row">
<div class="col-sm-4"></div>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<button type="submit" class="btn btn-outline" style="background-color: #F16767;">Assign</button>
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