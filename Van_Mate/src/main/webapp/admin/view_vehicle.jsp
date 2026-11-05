<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ page import="vanmate.admin.*" %>
    <%@ page import="java.util.*" %>
    <%@ page import="vanmate.beans.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>VANMATE Admin</title>
<%@include file="/commoncss/allcss.html" %>
</head>
<body>
<h1 style="text-align: center;">WELCOME</h1>
<%@include file="/headers/admin_header.html" %>

<%
AdminDao dao=new AdminDao();
ArrayList<Vehicle> vehiclelist=dao.allvehicle();
%>

<div class="container-fluid bg-primary"><h4 style="text-align: center;">All Vehicle</h4></div>
<table class="table">
  <thead>
    <tr>
      <th scope="col">VehicleType</th>
      <th scope="col">Vehicle Number</th>
      <th scope="col">VehicleDescription</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody>
  
  <%
for(Vehicle v: vehiclelist)
{
	
%>
<tr>
<th><%=v.getVehicle_type()%></th>
<th><%=v.getVehicle_number()%></th>
<th><%=v.getVehicle_description() %></th>
<th><%=v.getDate() %></th>

</tr>

<%} %>
  </tbody>
</table>




<%@include file="/commonjs/alljs.html" %>
</body>
</html>