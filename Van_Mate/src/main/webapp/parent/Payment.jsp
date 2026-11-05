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
<title>RidePayment</title>
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
int rid=Integer.parseInt(request.getParameter("rid"));
int charge=Integer.parseInt(request.getParameter("charge"));
Parent p=(Parent)session.getAttribute("parentkey");
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
<div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
        <div class="card border-top border-bottom border-3" style="border-color: #f37a27 !important;">
          <div class="card-body " style="background-color: #FFF4E0;">
<h1 style="text-align: center;background-color: #FFF4E0;" class="fw-bolder"><i class='fab fa-amazon-pay'></i>PaymentDetails</h1>
<form action="/Van_Mate/Booking_Payment" method="post" class="form-horizontal">
<div class="mb-3 mt-4 row">	
<label for="name" class="col-sm-3 col-form-label text-center fw-bolder ">NAME:</label>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<input type="text" class="form-control" name="username" value="<%=p.getName() %>" readonly="readonly">
</div>
</div>

<div class="mb-3 mt-4 row">	
<label for="email" class="col-sm-3 col-form-label text-center fw-bolder ">EMAIL:</label>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<input type="text" class="form-control" name="email" value="<%=p.getEmail()%>" readonly="readonly">
</div>
</div>

<div class="mb-3 mt-4 row">	
<label for="phone" class="col-sm-3 col-form-label text-center fw-bolder ">Phone:</label>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<input type="tel" class="form-control" name="phone" value="<%=p.getPhone()%>" readonly="readonly">
</div>
</div>
<input type="hidden" class="form-control" name="rid" value="<%=rid%>">
<div class="mb-3 mt-4 row">	
<label for="charge" class="col-sm-3 col-form-label text-center fw-bolder ">AMOUNT:</label>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<input type="number" class="form-control" name="charge" value="<%=charge%>" readonly="readonly">
</div>
</div>

 <div class="mb-3 row">
<div class="col-sm-4"></div>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<button type="submit" class="btn btn-outline fw-medium" style="background-color: #F16767;width: 80px;">PAY</button>
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
</body>
</html>