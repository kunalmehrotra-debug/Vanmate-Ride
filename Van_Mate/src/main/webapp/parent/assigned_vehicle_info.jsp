<%@page import="vanmate.admin.AdminDao"%>
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
<title>Parent Assigned Vehicle Info</title>
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
<%
    ParentDao dao=new ParentDao();
    ArrayList<vanmate.beans.Driver> driverlist=dao.viewAssignedVehicle(id);
%>
<%@include file="/headers/parent_header.html" %>

<div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
        <div class="card border-top border-bottom border-3" style="border-color: #f37a27 !important;">
          <div class="card-body " style="background-color: #57C5B6;">
<h1 style="text-align: center;background-color: #E9A178;" class="fw-bolder"><i class='far fa-edit'></i>Assigned Vehicle Details</h1>


<table class="table table-hover" style="border: solid;">
  <thead>
    <tr >
      <th scope="col">DriverName</th>
      <th scope="col">Phone No.</th>
      <th scope="col">VehicleNumber</th>
      <th scope="col">Track</th>
    </tr>
  </thead>
  <tbody>
  
<%
for(vanmate.beans.Driver d: driverlist)
{
	S_Details s=d.getSd();
	Vehicle v=d.getVehicle();
%>
<tr class="table-light">
<td><%=d.getDname()%></td>
<td><%=d.getPhone()%></td>
<td><%=s.getVehicle_number() %>
<td><a href="/Van_Mate/parent/trackvehicle.jsp?did=<%=v.getDevice_id() %>">Track</a></td>
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
<%@include file="/footers/common_footer.html"%>
<%@include file="/commonjs/alljs.html" %>
</body>
</html>