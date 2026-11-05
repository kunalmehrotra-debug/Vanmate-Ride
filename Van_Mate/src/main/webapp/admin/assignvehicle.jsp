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
String id=(String)session.getAttribute("admin_key");
if(id==null)
{
	request.setAttribute("message",Messages.UNAUTHORIZED_MESSAGE);
	RequestDispatcher rd=request.getRequestDispatcher("/admin/admin_login.jsp");
	rd.forward(request, response);
}
else{
%>
<%@include file="/headers/admin_header.html" %>

<% 
	AdminDao dao=new AdminDao();
	ArrayList<Driver> driverlist=dao.availabledriver();	
	ArrayList<Vehicle> vehiclelist=dao.availablevehicle();
%>
<div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
        <div class="card border-top border-bottom border-3" style="border-color: #f37a27 !important;">
          <div class="card-body " style="background-color: #57C5B6;">
<h1 style="text-align: center;background-color: #E9A178;" class="fw-bolder"><i class='far fa-edit'></i>AssignVehicle</h1>
<form action="/Van_Mate/Assign_Vehicle" method="post" class="form-horizontal needs-validation" novalidate>
<div class="mb-3 mt-4 row">	
<label for="name" class="col-sm-3 col-form-label text-center fw-bolder ">Choose Driver:</label>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
 
 <select class="form-select" aria-label="driverchoose" name="choosedriver">
  <option selected>Select Driver</option>
  <%
  for(Driver d: driverlist)
  {
  %>
  <option value=<%=d.getId() %>><%=d.getDname() %></option>
  <%} %>
</select>
 
</div>
</div>

<div class="mb-3 mt-4 row">	
<label for="name" class="col-sm-3 col-form-label text-center fw-bolder ">Choose Vehicle:</label>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">

<table class="table table-hover" style="border: solid;">
  <thead>
    <tr >
      <th scope="col">Select</th>
      <th scope="col">Vehicle type</th>
      <th scope="col">VehicleNo.</th>
    </tr>
  </thead>
  <tbody>
  
<%
for(Vehicle v: vehiclelist)
{
	
%>
<tr class="table-light">
<td><input type="radio" name="vehicleassign" value=<%=v.getVehicle_number() %>></td>
<td><%=v.getVehicle_type()%></td>
<td><%=v.getVehicle_number()%></td>

</tr>

<%} %>
</tbody>
</table>

 
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

<%} %>

<%@include file="/commonjs/alljs.html" %>
<script type="text/javascript" src="/Van_Mate/commonjs/custom_validation.js"></script>
</body>
</html>