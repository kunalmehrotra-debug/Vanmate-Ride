<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Reset Password</title>
<%@include file="/commoncss/allcss.html" %>
</head>
<body>
<%@include file="/headers/common_header.html" %>
<div class="row d-flex justify-content-center align-items-center h-100">
<div class="card text-center mt-3" style="width: 400px;background-color: #F9F5EB;">
    <div class="card-header h5 text-white bg-danger">Password Reset</div>
    <div class="card-body px-5">
        <form action="/Van_Mate/Reset_Password" method="post" class="form-horizontal needs-validation" novalidate >
        <div class="form-outline">
        <label class="form-label fw-medium" for="typeemail">EMail:</label>
        <input type="email" id="Email" name="useremail" class="form-control my-2" placeholder="Enter your email" required="required"/>
         <div class="invalid-feedback">
                    Enter a valid email.
                  </div>
        <label class="form-label fw-medium" for="typepassword">New Password:</label>
            <input type="password" id="pass" name="userpass" class="form-control mb-2" placeholder="Enter password" required="required"/>
         <div class="invalid-feedback">
                    Enter a valid password.
                  </div>
        </div>
        <button type="submit" class="btn btn-outline-danger" >Reset Password</button>
        </form>
  
    </div>
</div>
</div>

<%@include file="/footers/common_footer.html"%>
<%@include file="/commonjs/alljs.html" %>
<script type="text/javascript" src="/Van_Mate/commonjs/custom_validation.js"></script>
</body>
</html>