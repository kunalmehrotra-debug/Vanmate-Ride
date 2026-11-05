<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="vanmate.utilities.Messages" %>
    <%@page import="vanmate.beans.Parent" %>
     <%@page import="vanmate.dao.ParentDao" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>EditProfile</title>
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
<%@include file="/headers/parent_header.html" %>
			<%
				String strsql = "select * from parent where id=?";
				ParentDao dao = new ParentDao();
		        Parent p=dao.showpProfile(strsql, id);
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
              <h5><%=p.getName() %></h5>
              <p class="fw-bold">Parent</p>
              <i class="far fa-edit mb-5" style="font-size: 25px;"></i>
            </div>
            <div class="col-md-8">
              <div class="card-body p-4">
                <h5 class="fw-bolder">Parent Details:</h5>
                <hr class="mt-0 mb-2">
                <form action="/Van_Mate/Parent_EditProfile" method="post">
                <div class="row">
                  <div class="col-10 mb-2">
                    <h6 class="fw-bold">Email:</h6>
                    <input class="form-control" type="email" name="email" value=<%=p.getEmail()%> aria-label="email">
                  </div>
                  </div>
                   <div class="row">
                  <div class="col-10 mb-2">
                    <h6 class="fw-bold">Phone:</h6>
                    <input class="form-control" type="tel" name="phone" value=<%=p.getPhone()%> aria-label="phone">
                  </div>
                  </div>
                  <div class="row">
                  <div class="col-10 mb-2">
                    <h6 class="fw-bold">City:</h6>
                    <input class="form-control" type="text" name="city" value=<%=p.getCity()%> aria-label="city">
                  </div>
                  </div>
                  <div class="row">
                  <div class="col-10 mb-2">
                    <h6 class="fw-bold">Address:</h6>
                    <textarea class="form-control" name="address" rows="2" cols="20"><%=p.getAddress() %></textarea>
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
<%@include file="/footers/common_footer.html"%>
<%@include file="/commonjs/alljs.html" %>
</body>
</html>