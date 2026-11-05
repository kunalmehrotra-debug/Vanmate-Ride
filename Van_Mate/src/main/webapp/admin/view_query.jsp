<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ page import="vanmate.admin.*" %>
    <%@ page import="java.util.*" %>
    <%@ page import="vanmate.beans.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>VanMate Admin</title>
<%@include file="/commoncss/allcss.html" %>
</head>
<body>
<h1 style="text-align: center;">WELCOME</h1>
<%@include file="/headers/admin_header.html" %>

<%
AdminDao dao=new AdminDao();
ArrayList<Query> querylist=dao.allquery();

%>

<div class="container-fluid bg-primary"><h4 style="text-align: center;">All QUERIES</h4></div>
<table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">EMailId</th>
      <th scope="col">PhoneNumber</th>
      <th scope="col">Message</th>
    </tr>
  </thead>
  <tbody>
<%
for(Query q: querylist)
{
	
%>
<tr>
<th><%=q.getUser_name()  %></th>
<th><%=q.getUser_email() %></th>
<th><%=q.getUser_phone() %></th>
<th><%=q.getUser_doubt() %></th>
</tr>

<%} %>
  </tbody>
</table>




<%@include file="/commonjs/alljs.html" %>
</body>
</html>