<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="vanmate.utilities.Messages" %>
    <%@page import="vanmate.beans.*" %>
     <%@page import="vanmate.dao.ParentDao" %>
     <%@page import="vanmate.admin.*" %>
     <%@page import="java.util.*" %>
     
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>VANMATE Parent</title>
<%@include file="/commoncss/allcss.html" %>
<style type="text/css">
.css2{
  color:blue;
  background-color:#FF6969;
  font-size:30px;
  font-family: Leelawadee UI Semilight;
  font-style:italic;
  font-weight:600;
  letter-spacing: 3px;
}
</style>
</head>
<body style="background-color: #FFE6C7;">
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
<marquee class="css2 mb-2" direction="right">For Booking the Ride Click here.</marquee>
<div class="col-5">
        <div class="card mb-5" style="background-color: #FFA559;">
          <div class="card-body text-center">
            <img src="/Van_Mate/images/parents.jpg" alt="avatar"
              class="rounded-circle img-fluid" style="width: 150px;">
            <h5 class="my-3 fw-bolder"><%=p.getName() %></h5>
            <br>
              <p class="text mb-2 fw-medium">EMAIL: <%=p.getEmail() %></p>
               <p class="text mb-2 fw-medium">PHONE: <%=p.getPhone() %></p>
                <p class="text mb-2 fw-medium">CITY: <%=p.getCity() %></p>
                 <p class="text mb-2 fw-medium">ADDRESS: <%=p.getAddress() %></p>
          </div>
          </div>
</div>
<div class="col"><marquee direction="down" height=300px scrollamount=2 class="text-center fw-bolder"><p style="font-size: 40px;font-style: italic;">Heyy Parent</p></marquee></div>
<div class="col-4" >
<img alt="front" class="img-fluid" src="/Van_Mate/images/moving bus.gif" style="height: 400px;">
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