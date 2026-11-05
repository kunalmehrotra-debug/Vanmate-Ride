<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="vanmate.utilities.Messages" %>
    <%@page import="vanmate.beans.Admin_Details" %>
     <%@page import="vanmate.admin.AdminDao" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Admin EditProfile</title>
<%@include file="/commoncss/allcss.html" %>
</head>
<body>
<%
 String mssg=(String)request.getAttribute("message");//to fetch the value from key
 //System.out.println(mssg);
 if(mssg!=null)
 {
%>
<div class="alert alert-warning alert-dismissible fade show" role="alert" style="margin-top: 70px;">
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
			<%
				String strsql = "select * from admin_details where id=?";
				AdminDao dao = new AdminDao();
		        Admin_Details ad=dao.showpProfile(strsql, id);
			%>
  <div class="container py-5 h-100" style="margin-top: 100px;">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-lg-6 mb-4 mb-lg-0">
        <div class="card mb-3" style="border-radius: .5rem;background-color: #FFDD83">
          <div class="row g-0">
            <div class="col-md-4 gradient-custom text-center text-black"
              style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                alt="Avatar" class="img-fluid my-5" style="width: 80px;" />
              <h5><%=ad.getName()%></h5>
              <p class="fw-bold">ADMIN ID: <%=ad.getId() %></p>
              <i class="far fa-edit mb-5" style="font-size: 25px;"></i>
            </div>
            <div class="col-md-8">
              <div class="card-body p-4">
                <h5 class="fw-bolder">Your Details:</h5>
                <hr class="mt-0 mb-2">
                <form action="/Van_Mate/Admin_EditProfile" method="post">
                <div class="row">
                  <div class="col-10 mb-2">
                    <h6 class="fw-bold">Password:</h6>
                    <input class="form-control" type="password" name="adminpass" value=<%=ad.getPass()%> aria-label="password">
                  </div>
                  </div>
                   <div class="row">
                  <div class="col-10 mb-2">
                    <h6 class="fw-bold">Phone:</h6>
                    <input class="form-control" type="tel" name="phone" value=<%=ad.getPhone()%> aria-label="phone">
                  </div>
                  </div>
                  <div class="row">
                  <div class="col-10 mb-2">
                    <h6 class="fw-bold">EMail:</h6>
                    <input class="form-control" type="email" name="email" value=<%=ad.getEmail()%> aria-label="email">
                  </div>
                  </div>
                  <hr class="mt-0 mb-2">
                  <div class="row">
                  <div class="col-2"></div>
                  <div class="col-5">
                  <button type="submit" class="btn btn-primary mb-3">EditProfile</button>
                  </div>
                  </div>
               </form>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

<%} %>
<%@include file="/commonjs/alljs.html" %>
</body>
</html>