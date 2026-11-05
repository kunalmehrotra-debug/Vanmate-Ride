<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>ForgotPassword</title>
<%@include file="/commoncss/allcss.html" %>
</head>
<body>
<%@include file="/headers/common_header.html" %>
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

<div class="row d-flex justify-content-center align-items-center h-100">
<div class="card text-center mt-3" style="width: 400px;background-color: #F9F5EB;">
    <div class="card-header h5 text-white bg-danger">Password Reset</div>
    <div class="card-body px-5">
        <p class="card-text py-2">
            Enter your email address for verification to reset your password.
        </p>
        <form action="/Van_Mate/Forgot_Password" method="post" class="form-horizontal needs-validation" novalidate >
        <div class="form-outline">
            <input type="email" id="Email" name="useremail" class="form-control my-2" placeholder="Enter your email" required="required"/>
         <div class="invalid-feedback">
                    Enter a valid email.
                  </div>
        </div>
        <button type="submit" class="btn btn-outline-danger" >Reset Password</button>
        </form>
        <div class="d-flex justify-content-between mt-4">
            <a class="" href="/Van_Mate/parent/parent_login.jsp">Login</a>
            <a class="" href="/Van_Mate/parent/parent_details.jsp">Register</a>
        </div>
    </div>
</div>
</div>
<%@include file="/footers/common_footer.html"%>
<%@include file="/commonjs/alljs.html" %>
<script type="text/javascript" src="/Van_Mate/commonjs/custom_validation.js"></script>
</body>
</html>