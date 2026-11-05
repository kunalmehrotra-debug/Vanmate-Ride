<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="vanmate.utilities.Messages" %>
    <%@page import="vanmate.beans.School" %>
     <%@page import="vanmate.dao.SchoolDao" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>VANMATE School</title>
<%@include file="/commoncss/allcss.html" %>
</head>
<body>
<h1>School home page</h1>
<%
String id=(String)session.getAttribute("sessionKey");
if(id==null)
{
	request.setAttribute("message",Messages.UNAUTHORIZED_MESSAGE);
	RequestDispatcher rd=request.getRequestDispatcher("/school/school_login.jsp");
	rd.forward(request, response);
}
else{
%>
<%@include file="/headers/school_header.html" %>
<%
				String strsql = "select * from school where id=?";
				SchoolDao dao = new SchoolDao();
		        School s=dao.showpProfile(strsql, id);
			%>
  <div class="container py-5 h-100" style="margin-top: 100px;">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-lg-6 mb-4 mb-lg-0">
        <div class="card mb-3" style="border-radius: .5rem;background-color: #FFDD83">
          <div class="row g-0">
            <div class="col-md-4 gradient-custom text-center text-black"
              style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIrAG6kBLUsk8DXsH0eMWnmYNXHL6wm1lh792FXT5SFuuIQ_A0SfwDLkrsJSMhncc-1CqDkxTkvno&usqp=CAU&ec=48665701"
                alt="Avatar" class="img-fluid my-5" style="width: 80px;" />
              <h5><%=s.getSname() %></h5>
              <p class="fw-bold">AffiliatesTo: <%=s.getBoard() %></p>
               <p class="fw-bold"><%=s.getStype()%> School</p>
               <hr class="mt-0 mb-2">
                <p class="fw-bold">QwnerName: <%=s.getOwner() %></p>
              <i class="far fa-edit mb-5" style="font-size: 25px;"></i>
            </div>
            <div class="col-md-8">
              <div class="card-body p-4">
                <h5 class="fw-bolder">School Details:</h5>
                <hr class="mt-0 mb-2">
                <form action="/Van_Mate/School_EditProfile" method="post">
                <div class="row">
                  <div class="col-10 mb-2">
                    <h6 class="fw-bold">Email:</h6>
                    <input class="form-control" type="email" name="email" value=<%=s.getEmail()%> aria-label="email">
                  </div>
                  </div>
                   <div class="row">
                  <div class="col-10 mb-2">
                    <h6 class="fw-bold">Phone:</h6>
                    <input class="form-control" type="tel" name="phone" value=<%=s.getPhone()%> aria-label="phone">
                  </div>
                  </div>
                  <div class="row">
                  <div class="col-10 mb-2">
                    <h6 class="fw-bold">City:</h6>
                    <input class="form-control" type="text" name="city" value=<%=s.getCity()%> aria-label="city">
                  </div>
                  </div>
                  <div class="row">
                  <div class="col-10 mb-2">
                    <h6 class="fw-bold">Address:</h6>
                    <textarea class="form-control" name="address" rows="2" cols="20"><%=s.getAddress() %></textarea>
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
<%@include file="/footers/common_footer.html"%>
</body>
</html>