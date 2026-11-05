<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="vanmate.utilities.Messages" %>
    <%@page import="vanmate.beans.*" %>
     <%@page import="vanmate.admin.AdminDao" %>
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
             int messageid=Integer.parseInt(request.getParameter("msid"));
				String strsql = "select * from message where messageid=?";
				AdminDao dao = new AdminDao();
		        Msg m=dao.viewMessage(strsql,messageid);
%>

<div style="width: 40%;height: auto;background-color: cyan;margin-left: 45%;text-align: center;">
<h3>Message send by <%=m.getSenderid() %> dated  <%=m.getDate() %></h3>

<h4>Contents are as follows:  <%=m.getMessage() %></h4>
</div>

<%@include file="/commonjs/alljs.html" %>
</body>
</html>