<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="vanmate.utilities.Messages" %>
     <%@page import="vanmate.dao.SchoolDao" %>
      <%@page import="vanmate.admin.*" %>
    <%@page import="java.util.*" %>
    <%@page import="vanmate.beans.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>VANMATE School</title>
<%@include file="/commoncss/allcss.html" %>
</head>
<body style="background-color: #FFE6C7;">
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
		        
		        AdminDao da=new AdminDao();
		        ArrayList<Vehicle_Charges> vehiclelist=da.viewcharge();
		        int c=0;
		        String price[]=new String[3];
		        for(Vehicle_Charges vc:vehiclelist)
		        {
		        	price[c++]=vc.getCharge();
		        }
%>
<div class="container-fluid">
<div class="row" >
<div class="col-5">
        <div class="card mb-5" style="background-color: #FFA559;">
          <div class="card-body text-center">
            <img src="/Van_Mate/images/schoollogin.jpg" alt="avatar"
              class="rounded-circle img-fluid" style="width: 150px;">
            <h5 class="my-3 fw-bolder"><%=s.getSname() %></h5>
            <p class="text mb-1 fw-bold">School,<%=s.getBoard() %></p>
            <p class="text mb-4 fw-medium"><%=s.getStype() %></p>
            <br>
             <p class="text mb-2 fw-medium">OWNER: <%=s.getStype() %></p>
              <p class="text mb-2 fw-medium">EMAIL: <%=s.getEmail() %></p>
               <p class="text mb-2 fw-medium">PHONE: <%=s.getPhone() %></p>
                <p class="text mb-2 fw-medium">CITY: <%=s.getCity() %></p>
                 <p class="text mb-2 fw-medium">ADDRESS: <%=s.getAddress() %></p>
          </div>
          </div>
</div>
<div class="col"><marquee direction="down" height=300px scrollamount=2 class="text-center fw-bolder"><p style="font-size: 40px;font-style: italic;">Heyy School</p></marquee></div>
<div class="col-4">
<img alt="front" class="img-fluid" src="/Van_Mate/images/moving bus.gif" style="height: 470px;">
</div>
</div>
</div>

<div class="container-fluid" style="background-color: #FFE6C7;">
<div class="row">
<h2 class="text-center" style="background-color: #262A56;color: #ffffff;">VEHICLES AVAILABLE</h2>
<div class="col col-sm-auto col-xl-4 col-lg-auto col-md-auto text-center">
<div class="card" style="width: 18rem;">
  <img src="/Van_Mate/images/rickshaw.jpg" class="card-img-top" alt="E-Rickshaw" style="height: 200px;">
  <div class="card-body">
   <h5 class="card-title text-center fw-bolder" style="background-color: #00425A;color: #FCFFE7;">E-Rickshaw</h5>
    <p class="card-text fw-bold">Rs. <%=price[0] %> /month</p>
  </div>
</div>
</div>

<div class="col col-sm-auto col-xl-4 col-lg-auto col-md-auto-4 text-center">
<div class="card" style="width: 18rem;">
  <img src="/Van_Mate/images/van.jpg" class="card-img-top" alt="Car" style="height: 200px;">
  <div class="card-body">
    <h5 class="card-title text-center fw-bolder" style="background-color: #00425A;color: #FCFFE7;">Van</h5>
    <p class="card-text fw-bold">Rs. <%=price[1] %> /month</p>
  </div>
</div>
</div>

<div class="col col-sm-auto col-xl-4 col-lg-auto col-md-auto text-center">
<div class="card" style="width: 18rem;">
  <img src="/Van_Mate/images/car.jpg" class="card-img-top" alt="Car" style="height: 200px;">
  <div class="card-body">
   <h5 class="card-title text-center fw-bolder" style="background-color: #00425A;color: #FCFFE7;">Car</h5>
    <p class="card-text fw-bold">Rs. <%=price[2] %> /month</p>
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