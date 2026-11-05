<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>VanMate</title>
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


<div class="container py-5 ">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-6 col-sm-10">
        <div class="card" style="border-radius: 1rem;border-color: #191825;">
          <div class="row ">
            <div class="col-sm-6 col-lg-5 ">
              <img src="/Van_Mate/images/parents.jpg"
                alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
            </div>
            <div class="col-sm-6 col-lg-7 d-flex align-items-center">
              <div class="card-body text-black " style="background-color: #F9DBBB;border-radius:1rem; ">

                <form action="/Van_Mate/Parent_Login" method="post" class="form-horizontal needs-validation" novalidate >
                  <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="fas fa-bus fa-2x me-3" style="color: #ff6219;"></i>
                    <span class="h1 fw-bolder mb-0">VANMATE</span>
                  </div>

                  <h5 class="fw-bold mb-3" style="letter-spacing: 1px;text-align: center;font-size: 34px;background-color:#FCFFE7;">
                  <i class="fas fa-user-friends" style="color: #ff6219;"></i>Parent Login</h5>
<hr>
                  <div class="form-outline row mb-4">
                  <div class="col-sm">
                  <label class="form-label fw-bold" for="id">ParentID:</label>
                  <div class="col-sm">
                  <input type="text" id="id" name="parentid" class="form-control" placeholder="Enter UserId." required="required" />
                  <div class="invalid-feedback">
                    Enter a valid ID.
                  </div>
                  </div>
                  </div> 
                  </div>

                  <div class="form-outline row mb-4">
                  <div class="col-sm">
                  <label class="form-label fw-bold" for="password">Password:</label>
                  <div class="col-sm">
                  <input type="password" id="pass" name="parentpass" class="form-control" placeholder="Enter Password." required="required"/>
                  <div class="invalid-feedback">
                  Enter a valid password.
                  </div>
                  </div>
                  </div>        
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                    <a href="/Van_Mate/parent/forgotpassword.jsp"><p class="fw-medium">Forgot Password?</p></a>
                  </div>
                
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

<%@include file="/footers/common_footer.html"%>
<%@include file="/commonjs/alljs.html" %>
<script type="text/javascript" src="/Van_Mate/commonjs/custom_validation.js"></script>
</body>
</html>