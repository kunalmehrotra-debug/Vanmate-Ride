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
<body style="background-color: #F6F1F1;">
<%@include file="/headers/admin_header.html" %>
<%
AdminDao dao=new AdminDao();
ArrayList<Parent> parentlist=dao.allParent();
%>
<div class="container-fluid">
<h1 style="text-align: center;" class="fw-bolder">ALL PARENTS</h1>
<table class="table table-hover text-center table-striped-columns" style="border: solid;">
  <thead class="table-dark">
    <tr >
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">EMail</th>
      <th scope="col">Phone</th>
      <th scope="col">City</th>
      <th scope="col">Address</th>
    </tr>
  </thead>
  <tbody class="table-group-divider">
  <%
for(Parent p: parentlist)
{
	
%>
<tr class="table-light">
<td><%=p.getId()%></td>
<td><%=p.getName()%></td>
<td><%=p.getEmail()%></td>
<td><%=p.getPhone()%></td>
<td><%=p.getCity()%></td>
<td><%=p.getAddress()%></td>
</tr>

<%} %>
</tbody>
</table>
  
</div>

<%@include file="/commonjs/alljs.html" %>
</body>
</html>