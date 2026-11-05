<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="vanmate.utilities.Messages" %>
    <%@page import="vanmate.beans.*" %>
    <%@page import="vanmate.dao.SchoolDao" %>
    <%@page import="java.util.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>View Confirmed Bookings</title>
<%@include file="/commoncss/allcss.html" %>
<style type="text/css">
body
{
background-color: #F8F8FF;
}
.form-horizontal 
    {
	max-width: 900px;
	padding: 30px;
	padding-top:60px;
	margin: auto;
	background-color: #008B8B;
	color: #FFFFFF
	}
.table
{
margin-left: 50px;

}
</style>
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
String id=(String)session.getAttribute("sessionKey");
if(id==null)
{
	request.setAttribute("message",Messages.UNAUTHORIZED_MESSAGE);
	RequestDispatcher rd=request.getRequestDispatcher("/school/school_login.jsp");
	rd.forward(request, response);
}
else{
%>
<%@include file="/headers/school_header.html" %>
<% 
	SchoolDao dao=new SchoolDao();
	ArrayList<B_Request> confirmlist=dao.viewConfirm(id);
	School s=dao.viewDetails(id);
	session.setAttribute("schoolkey", s);
%>
<div class="container py-5 h-100 "></div>
    <div class="row d-flex justify-content-center  align-items-center h-100">
      <div class="col-10">
        <div class="card border-top border-bottom border-3" style="border-color: #F0F0F0 !important;">
          <div class="card-body " style="background-color: #088395;">
<h1 style="text-align: center;background-color: #088395;color: #ffffff;" class="fw-bolder"><i class='fas fa-archive'></i>CONFIRMED REQUESTS</h1>
<hr>
<div class="table-responsive ">
<table class="table table-hover text-center table-striped-columns" style="border: solid;">
  <thead class="table-dark">
  <thead>
    <tr >
      <th scope="col">Vehicle</th>
      <th scope="col">Source</th>
      <th scope="col">Destination</th>
      <th scope="col">Time</th>
      <th scope="col">No.of Students</th>
      <th scope="col">Status</th>
      <th scope="col">StudentInformation</th>
      <th scope="col">Charge</th>
      <th scope="col">PayNow</th>
    </tr>
  </thead>
  <tbody class="table-group-divider">
  
<%
for(B_Request br: confirmlist)
{
	
%>
<tr class="table-light">
<td><%=br.getVehicletype()%></td>
<%
int charge=dao.viewCharge(br.getVehicletype());
%>
<td><%=br.getSource()%></td>
<td><%=br.getDestination()%></td>
<td><%=br.getTiming()%></td>
<td><%=br.getNo_students()%></td>
<td><%=br.getStatus()%></td>
<%if(dao.checkStudentdetails(br.getRequestid())) 
{
%>
<td>Done</td>
<%}
else{
%>
<td><a href="/Van_Mate/school/student_details.jsp?rid=<%=br.getRequestid()%>" >Click Here for students details</a></td>
<%} %>
<td><%=charge %></td>
<%if(dao.checkpayment(br.getRequestid())) 
{
%>
<td>Paid</td>
<%}
else{
%>
<td><a href="/Van_Mate/school/Payment.jsp?charge=<%=charge%>&rid=<%=br.getRequestid()%>"><button type="button" style="background-color: #E96479;color: #ffffff;">PayNow</button></a></td>
<%} %>
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
<%@include file="/footers/common_footer.html"%>
</body>
</html>