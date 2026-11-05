<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="vanmate.utilities.Messages" %>
    <%@page import="vanmate.dao.ParentDao" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Parent Compose</title>
<%@include file="/commoncss/allcss.html" %>
<style type="text/css">
body
{
background-color: #F8F8FF;
}
.form-horizontal 
    {
	max-width: 800px;
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
String rid=request.getParameter("rid");
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
<%
				String strsql = "select * from booking_request where userid=? and status=? and requestid=?";
				ParentDao dao = new ParentDao();
		        int nos=dao.studentNumber(strsql,id,Integer.parseInt(rid));
%>
<div class="container-fluid">

<form action="/Van_Mate/Parent_Student_Details" method="post" class="form-horizontal needs-validation" novalidate >
<h1 style="text-align: center;font-weight: bolder;letter-spacing: 3px;font-size: 50px;font-family: sans-serif;padding-bottom: 30px;">
<i class='fas fa-comments' style='font-size:70px'></i>Student's Detail</h1>

<div class="mb-3 row">
<label for="sname" class="col-sm-3 col-form-label text-center fw-bolder">Student Name:</label>
<div class="col-sm-9">
<%
for(int i=1;i<=nos;i++)
	{
%>
<input type="text" class="form-control" name="sname" placeholder="Enter student <%=i %> name." required="required">
<div class="invalid-feedback">
                    Enter student name please.
</div>
<br>
<div class="mb-3 row">
<label for="standard" class="col-sm-3 col-form-label text-center fw-bolder">Standard:</label>
<div class="col-sm-9">
<input type="text" class="form-control" name="standard" placeholder="Enter Student <%=i %> standard" required="required">
<div class="invalid-feedback">
                    Enter standard.
</div>
</div>
</div>

<div class="mb-3 row">
<label for="age" class="col-sm-3 col-form-label text-center fw-bolder">Age:</label>
<div class="col-sm-9">
<input type="number" class="form-control" name="age" placeholder="Enter Student <%=i %> age" required="required">
<div class="invalid-feedback">
                    Enter age.
</div>
</div>
</div>
 <br>        
<%} %>
</div>
</div>

<div class="mb-3 row">
<label for="schoolname" class="col-sm-3 col-form-label text-center fw-bolder">School Name:</label>
<div class="col-sm-9">
<input type="text" class="form-control" name="schoolname" placeholder="Enter School name." required="required">
<div class="invalid-feedback">
                    Enter student's school name.
</div>
</div>
</div>

<div class="mb-3 row">	
<label for="userid" class="col-sm-3 col-form-label text-center fw-bolder">UserID:</label>
<div class="col-sm-9">
<input type="text" class="form-control" name="userid" value=<%= id%> readonly="readonly">
</div>
</div>
<input type="hidden" name="rid" value=<%=rid %>>
<div class="mb-3 row">
<div class="col-sm-2"></div>
<button type="submit" class="btn btn-outline-light col-sm-8">Submit</button>
</div>

</form>

</div>
<%} %>
<%@include file="/footers/common_footer.html"%>
<%@include file="/commonjs/alljs.html" %>
<script type="text/javascript" src="/Van_Mate/commonjs/custom_validation.js"></script>
</body>
</html>