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
<title>VANMATE ADMIN</title>
<%@include file="/commoncss/allcss.html" %>
</head>
<body>
<%
 String mssg=(String)request.getAttribute("message");//to fetch the value from key
 //System.out.println(mssg);
 if(mssg!=null)
 {
%>
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong><%=mssg %></strong>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

<%} %>
<% 
	AdminDao dao=new AdminDao();
	ArrayList<S_Details> studentlist=dao.viewStudents();	
%>
<%@include file="/headers/admin_header.html" %>
<div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
        <div class="card border-top border-bottom border-3" style="border-color: #f37a27 !important;">
          <div class="card-body " style="background-color: #F6E1C3;">
<h1 style="text-align: center;background-color: #E9A178;" class="fw-bolder"><i class='far fa-edit'></i>Student Vehicle Assignment</h1>
<form action="/Van_Mate/Student_Vehicle_Type" method="post" class="form-horizontal " >


<table class="table table-hover" style="border: solid;">
  <thead>
    <tr >
      <th scope="col">Select</th>
      <th scope="col">Student</th>
      <th scope="col">Standard</th>
      <th scope="col">School</th>
      <th scope="col">Age</th>
      <th scope="col">UserID</th>
    </tr>
  </thead>
  <tbody>
  
<%
for(S_Details sd: studentlist)
{
	
%>
<tr class="table-light">
<td><input type="radio" name="sassign" value=<%=sd.getRequestid() %>></td>
<td><%=sd.getStudent_name()%></td>
<td><%=sd.getStandard()%></td>
<td><%=sd.getSchool_name()%></td>
<td><%=sd.getAge()%></td>
<td><%=sd.getUserid()%></td>
</tr>

<%} %>
</tbody>
</table>

 



 <div class="mb-3 row">
<div class="col-sm-4"></div>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<button type="submit" class="btn btn-outline" style="background-color: #F16767;">Submit</button>
</div>
</div> 	   
</form>
          </div>
        </div>
      </div>
    </div>
  </div>

<%@include file="/commonjs/alljs.html" %>
<script type="text/javascript" src="/Van_Mate/commonjs/custom_validation.js"></script>
</body>
</html>