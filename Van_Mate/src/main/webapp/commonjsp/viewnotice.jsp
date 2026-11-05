<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="vanmate.admin.AdminDao" %>
    <%@page import="java.util.*" %>
     <%@page import="vanmate.beans.Notice" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Notification</title>
<style type="text/css">
body {
  background-color: #f5f7fa;
}


</style>
<%@include file="/commoncss/allcss.html" %>
</head>
<body>
<h1 style="text-align: center;">WELCOME</h1>
<%@include file="/headers/common_header.html" %>
<%
AdminDao dao=new AdminDao();
ArrayList<Notice> noticelist=dao.allnotice();
%>

<%
for(Notice n: noticelist)
{
	
%>
<div class="container">
  <section class="mx-auto my-5" style="max-width: 23rem;">
    <div class="card" style="background-color: #408E91;color: #FFFFFF">
      <div class="card-body">
          <h5 class="card-title"><%=n.getTopic() %></h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">Dated: <%=n.getDate() %></h6>
          <p class="mb-0 mt-2 font-italic">
            <%=n.getContent() %>
          </p>
      </div>
    </div>
    
  </section>
</div>
<%} %>
<%@include file="/footers/common_footer.html"%>
<%@include file="/commonjs/alljs.html" %>
</body>
</html>