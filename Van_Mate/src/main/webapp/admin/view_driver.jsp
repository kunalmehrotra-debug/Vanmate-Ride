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
ArrayList<Driver> driverlist=dao.alldriver();
%>

<div class="container-fluid bg-primary"><h4 style="text-align: center;">All Drivers</h4></div>
<table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Phone</th>
      <th scope="col">Experience</th>
      <th scope="col">Licenseno.</th>
      <th scope="col">Validity</th>
      <th scope="col">Address</th>
      <th scope="col">Photo</th>
      <th scope="col">Registered</th>
    </tr>
  </thead>
  <tbody>
  
  <%
for(Driver v: driverlist)
{
	
%>
<tr>
<th><%=v.getDname()%></th>
<th><%=v.getPhone()%></th>
<th><%=v.getExperience()%></th>
<th><%=v.getLicenseno()%></th>
<th><%=v.getValidity()%></th>
<th><%=v.getAddress()%></th>
<th><%=v.getPhoto()%></th>
<th><%=v.getDate()%></th>

</tr>

<%} %>
  </tbody>
</table>




<%@include file="/commonjs/alljs.html" %>
</body>
</html>