<%@page import="org.apache.catalina.valves.StuckThreadDetectionValve"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="vanmate.utilities.Messages" %>
    <%@page import="vanmate.beans.*" %>
     <%@page import="vanmate.dao.ParentDao" %>
     <%@page import="java.util.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>VANMATE Parent</title>
<%@include file="/commoncss/allcss.html" %>
</head>
<body>
<%
String id=(String)session.getAttribute("sessionKey");
if(id==null)
{
	request.setAttribute("message",Messages.UNAUTHORIZED_MESSAGE);
	RequestDispatcher rd=request.getRequestDispatcher("/parent/parent_login.jsp");
	rd.forward(request, response);
}
else{
%>
<%@include file="/headers/parent_header.html" %>
<div>
			<h3>Hello <%=id %></h3>	
</div>
<% 
	ParentDao dao=new ParentDao();
	ArrayList<Msg>messageList=dao.sentItem(id);			
%>

<div class="container-fluid bg-primary"><h4 style="text-align: center;margin-top: 80px;">Messages Sent</h4></div>
<form action="/Van_Mate/DeleteSentItem" method="post">
<table class="table">
  <thead>
    <tr>
      <th scope="col">Select</th>
      <th scope="col">ReceiverId</th>
      <th scope="col">Subject</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody>
  
  <%
for(Msg m : messageList)
{
%>
<tr>
<th><input type="checkbox" name="chk" value="<%=m.getMessageid()%>">
<th><%=m.getReceiverid() %></th>
<th><%=m.getSubject()%></th>
<th><%=m.getDate() %></th>
</tr>

<%} %>
  </tbody>
</table>
<button type="submit">Submit</button>
</form>
<%} %>
<%@include file="/footers/common_footer.html"%>
<%@include file="/commonjs/alljs.html" %>
</body>
</html>