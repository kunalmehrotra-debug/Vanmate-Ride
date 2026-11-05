<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="vanmate.utilities.Messages" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>VANMATE ADMIN NOTICE</title>
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

<div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
        <div class="card border-top border-bottom border-3" style="border-color: #f37a27 !important;">
          <div class="card-body " style="background-color: #439A97;">
<h1 style="text-align: center;background-color: #FFFBEB;" class="fw-bolder"><i class='far fa-edit'></i>Noticfication</h1>

<form action="/Van_Mate/Display_Notice" method="post" class="form-horizontal needs-validation" novalidate>

<div class="mb-3 mt-4 row">	
<label for="name" class="col-sm-3 col-form-label text-center fw-bolder ">Topic:</label>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<input type="text" class="form-control" name="topic" placeholder="Enter notice title." required="required">
 <div class="invalid-feedback">
      Enter any topic.
</div>
</div>
</div>

<div class="mb-3 mt-4 row">	
<label for="name" class="col-sm-3 col-form-label text-center fw-bolder ">Content:</label>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<textarea rows="3" cols="40" name="content" required="required"></textarea>
 <div class="invalid-feedback">
      Enter notice contents.
</div>
</div>
</div>

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

<%} %>

<%@include file="/commonjs/alljs.html" %>
<script type="text/javascript" src="/Van_Mate/commonjs/custom_validation.js"></script>
</body>
</html>