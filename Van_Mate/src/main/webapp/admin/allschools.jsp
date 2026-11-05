<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ page import="vanmate.admin.*" %>
    <%@ page import="java.util.*" %>
    <%@ page import="vanmate.beans.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Van_Mate</title>
<%@include file="/commoncss/allcss.html" %>
</head>
<body>
<%@include file="/headers/admin_header.html" %>
<%
AdminDao dao=new AdminDao();
ArrayList<School> schoolist=dao.allSchool();
%>
<div class="container-fluid">
<h1 style="text-align: center;" class="fw-bolder">ALL SCHOOLS</h1>
<table class="table table-hover text-center table-striped-columns" style="border: solid;">
  <thead class="table-dark">
    <tr >
      <th scope="col">ID</th>
      <th scope="col">SchoolName</th>
      <th scope="col">EMail</th>
      <th scope="col">Phone</th>
      <th scope="col">City</th>
      <th scope="col">Address</th>
    </tr>
  </thead>
  <tbody class="table-group-divider">
  <%
for(School s: schoolist)
{
	
%>
<tr class="table-light">
<td><%=s.getId()%></td>
<td><%=s.getSname()%></td>
<td><%=s.getEmail()%></td>
<td><%=s.getPhone()%></td>
<td><%=s.getCity()%></td>
<td><%=s.getAddress()%></td>
</tr>

<%} %>
</tbody>
</table>
  
</div>





<%@include file="/commonjs/alljs.html" %>
</body>
</html>