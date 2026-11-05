<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="vanmate.utilities.Messages" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Admin Compose</title>
<%@include file="/commoncss/allcss.html" %>
<style type="text/css">
body
{
background-color: #F8F8FF;
}
.form-horizontal 
    {
	max-width: 600px;
	padding: 30px;
	padding-top:100px;
	margin: auto;
	background-color: #008B8B;
	color: #FFFFFF
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

<div class="container-fluid">

<form action="/Van_Mate/Admin_Compose" method="post" class="form-horizontal needs-validation" novalidate >
<h1 style="text-align: center;font-weight: bolder;letter-spacing: 3px;font-size: 50px;font-family: sans-serif;padding-bottom: 30px;">
<i class='fas fa-comments' style='font-size:70px'></i>COMPOSE</h1>

<div class="mb-3 row">	
<label for="sid" class="col-sm-3 col-form-label text-center fw-bolder">SenderID:</label>
<div class="col-sm-9">
<input type="text" class="form-control" name="sid" value=<%= id%> readonly="readonly">
</div>
</div>

<div class="mb-3 row">
<label for="rid" class="col-sm-3 col-form-label text-center fw-bolder">ReceiverID:</label>
<div class="col-sm-9">
<input type="text" class="form-control" name="rid" placeholder="Enter Receiver's Id" required="required">
<div class="invalid-feedback">
                    Enter a valid Receiver's ID.
                  </div>
</div>
</div>
			
<div class="mb-3 row">
<label for="subject" class="col-sm-3 col-form-label text-center fw-bolder">Subject:</label>
<div class="col-sm-9">
<input type="text" class="form-control" name="subject" placeholder="Enter Subject" required="required">
<div class="invalid-feedback">
                    Enter subject.
                  </div>
</div>
</div>

<div class="mb-3 row">
<label for="message" class="col-sm-3 col-form-label text-center fw-bolder">Message:</label>
<div class="col-sm-9">
<textarea rows="2" cols="10" class="form-control" name="message" placeholder="Enter Message." required="required"></textarea>
<div class="invalid-feedback">
                    Enter a message.
                  </div>
</div>
</div>

<div class="mb-3 row">
<div class="col-sm-2"></div>
<button type="submit" class="btn btn-outline-light col-sm-8">Submit</button>
</div>

</form>

</div>
<%} %>
<%@include file="/commonjs/alljs.html" %>
<script type="text/javascript" src="/Van_Mate/commonjs/custom_validation.js"></script>
</body>
</html>