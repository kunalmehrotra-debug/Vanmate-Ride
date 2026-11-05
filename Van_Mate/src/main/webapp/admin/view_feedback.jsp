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
ArrayList<Feedback> feedlist=dao.allfeedback();
%>

<div class="container-fluid bg-primary"><h4 style="text-align: center;">FEEDBACKS</h4></div>
<table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">EMailId</th>
      <th scope="col">PhoneNumber</th>
      <th scope="col">Feedback</th>
      <th scope="col">Ratings</th>
    </tr>
  </thead>
  <tbody>
  
  <%
for(Feedback f: feedlist)
{
	
%>
<tr>
<th><%=f.getName() %></th>
<th><%=f.getEmail()%></th>
<th><%=f.getPhone() %></th>
<th><%=f.getFeedback_text() %></th>
<th><%=f.getRating() %></th>
</tr>

<%} %>
  </tbody>
</table>




<%@include file="/commonjs/alljs.html" %>
</body>
</html>