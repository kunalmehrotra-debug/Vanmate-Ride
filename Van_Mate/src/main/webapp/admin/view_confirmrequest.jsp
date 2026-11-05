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
<title>View Confirmed Request</title>
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
	ArrayList<B_Request> confirmlist=dao.viewConfirm();	
%>
<div class="container py-3 h-100 ">
    <div class="row d-flex justify-content-center  align-items-center h-100">
      <div class="col">
        <div class="card border-top border-bottom border-3" style="border-color: #F0F0F0 !important;">
          <div class="card-body " style="background-color: #088395;">
<h1 style="text-align: center;background-color: #088395;color: #ffffff;" class="fw-bolder"><i class='fas fa-archive'></i>CONFIRMED REQUESTS</h1>
<hr>
<table class="table table-hover table-striped-columns text-center" style="border: solid;">
  <thead class="table-dark">
    <tr >
      <th scope="col">User</th>
      <th scope="col">Vehicle</th>
      <th scope="col">Source</th>
      <th scope="col">Destination</th>
      <th scope="col">Time</th>
      <th scope="col">No.of Students</th>
      
      
    </tr>
  </thead>
  <tbody class="table-group-divider">
  
<%
for(B_Request br: confirmlist)
{
	
%>
<tr class="table-light">
<td><%=br.getUserid()%></td>
<td><%=br.getVehicletype()%></td>
<td><%=br.getSource()%></td>
<td><%=br.getDestination()%></td>
<td><%=br.getTiming()%></td>
<td><%=br.getNo_students()%></td>
</tr>

<%} %>
</tbody>
</table>
</div>
        </div>
      </div>
    </div>
  </div>
<%} %>
<%@include file="/commonjs/alljs.html" %>
</body>
</html>