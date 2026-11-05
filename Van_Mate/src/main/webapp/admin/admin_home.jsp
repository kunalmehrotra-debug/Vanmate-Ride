<%@page import="vanmate.admin.AdminDao"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="vanmate.utilities.Messages" %>
    <%@page import="vanmate.admin.AdminDao" %>
    <%@page import="vanmate.beans.S_Details" %>
    <%@page import="java.util.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>VanMate Admin</title>
<%@include file="/commoncss/allcss.html" %>
<link rel="stylesheet" href="/Van_Mate/commoncss/link.css">

</head>
<body style="background-image: url('/Van_Mate/images/bus.jpg');background-size: cover;background-repeat: no-repeat;">
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

<h1 style="text-align: center;"></h1>
<%@include file="/headers/admin_header.html" %>
<hr>
<div class="container-fluid">
<h1 style="color: #FDF4F5;background-color: #F3950D;" class="fw-bolder"><marquee direction="left" height="auto" >Hey VANMATE ADMIN</marquee></h1>
<hr>
<div class="row">
<h2 class="text-center fw-bolder" style="background: linear-gradient(to bottom right, #003366 0%, #006666 100%);font-style: italic;color: #ffffff;">VEHICLE ASSIGNMENT</h2>
<div class="col-2" ></div>
<div class="col-4">
<div class="card" style="background-color: #EFF7E1;">
  <h5 class="card-header text-center" style="background-color: #009FBD;">Student Vehicle Allotment</h5>
  <div class="card-body">
   <a href="/Van_Mate/admin/student_vehicle_allotment.jsp">
      <marquee class="fw-bolder fs-3 text-center" direction="down" height="200px" scrollamount="2">
        <img alt="click" src="/Van_Mate/images/clickme.jpeg" class="img-fluid" width="300px" height="150px">
      </marquee>
    </a>
  </div>
</div>
</div>

<div class="col-4">
<div class="card" style="background-color: #EFF7E1;">
  <h5 class="card-header text-center" style="background-color: #009FBD;">Driver Vehicle Allotment</h5>
  <div class="card-body">
   <a href="/Van_Mate/admin/assignvehicle.jsp">
      <marquee class="fw-bolder fs-3 text-center" direction="down" height="200px" scrollamount="2">
        <img alt="click" src="/Van_Mate/images/clickme.jpeg" class="img-fluid" width="300px" height="150px">
      </marquee>
    </a>
  </div>
</div>
</div>
</div>
<br>
<div class="row">
<%
AdminDao dao=new AdminDao();
ArrayList<S_Details> studentlist=dao.viewUnconfirmed();	
%>
<h2 class="text-center fw-bolder" style="background: linear-gradient(to bottom right, #003366 0%, #006666 100%);font-style: italic;color: #ffffff;">VIEW STUDENT'S</h2>
<div class="col-4">
<div class="card" style="background-color: #EFF7E1;">
  <h5 class="card-header text-center" style="background-color: #009FBD;">UnConfirmed Students</h5>
  <div class="card-body">
   <table class="table table-hover text-center" style="border: solid;">
  <thead>
    <tr >
      <th scope="col">Name</th>
      <th scope="col">Standard</th>
      <th scope="col">School</th>
      <th scope="col">Age</th>
    </tr>
  </thead>
  <tbody>

<%
for(S_Details sd: studentlist)
{
	
%>
<tr class="table-light">
<td><%=sd.getStudent_name()%></td>
<td><%=sd.getStandard()%></td>
<td><%=sd.getSchool_name()%></td>
<td><%=sd.getAge()%></td>
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