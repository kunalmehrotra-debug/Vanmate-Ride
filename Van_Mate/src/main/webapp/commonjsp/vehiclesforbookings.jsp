<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="vanmate.admin.*" %>
    <%@page import="java.util.*" %>
    <%@page import="vanmate.beans.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Vehicles For Booking</title>
<%@include file="/commoncss/allcss.html" %>
<link rel="stylesheet" href="/Van_Mate/commoncss/link.css">

<style type="text/css">
.text {
    font-family: verdana;
    font-size:50px;
    font-weight: 700;
    color: #212A3E;
    text-shadow: 1px 1px 1px #919191,
        1px 2px 1px #919191,
        1px 3px 1px #919191,
        1px 4px 1px #919191,
        1px 5px 1px #919191,
        1px 6px 1px #919191,
        1px 7px 1px #919191,
        1px 8px 1px #919191,
        1px 9px 1px #919191,
        1px 10px 1px #919191,
    1px 18px 6px rgba(16,16,16,0.4),
    1px 22px 10px rgba(16,16,16,0.2),
    1px 25px 35px rgba(16,16,16,0.2),
    1px 30px 60px rgba(16,16,16,0.4);
}
</style>

</head>
<body style="background-color: #FFFBEB;">
<%@include file="/headers/common_header.html" %>
<%
AdminDao dao=new AdminDao();
ArrayList<Vehicle_Charges> vehiclelist=dao.viewcharge();
int c=0;
String price[]=new String[3];
for(Vehicle_Charges vc:vehiclelist)
{
	price[c++]=vc.getCharge();
}
%>
<h1 class="text text-center mb-3">VANMATE VEHICLES</h1>
<div class="container-fluid" >
<div class="row">
<div class="col-4 text-center">
<div class="card" style="width: 18rem;">
  <img src="/Van_Mate/images/rickshaw.jpg" class="card-img-top" alt="E-Rickshaw" style="height: 200px;">
  <div class="card-body">
   <h5 class="card-title text-center fw-bolder" style="background-color: #00425A;color: #FCFFE7;">E-Rickshaw</h5>
    <p class="card-text fw-bold">Rs. <%=price[0] %> /month</p>
  </div>
</div>
</div>

<div class="col-4 text-center">
<div class="card" style="width: 18rem;">
  <img src="/Van_Mate/images/van.jpg" class="card-img-top" alt="Car" style="height: 200px;">
  <div class="card-body">
    <h5 class="card-title text-center fw-bolder" style="background-color: #00425A;color: #FCFFE7;">Van</h5>
    <p class="card-text fw-bold">Rs. <%=price[1] %> /month</p>
  </div>
</div>
</div>

<div class="col-4 text-center">
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

<div class="container-fluid mt-1">
<div class="row text-center">
<b style="font-size: 40px;background-color: #E7AB9A;">For Booking the Student Ride,Please LOGIN.</b>
<div class="col-6 text-center">
<a href="/Van_Mate/parent/parent_login.jsp" style="text-decoration: blink;"><img alt="parent" src="/Van_Mate/images/parentlogin.jpg" style="height: 70px; width: 200px;">
<br>
<b>Parent Login</b></a>
</div>
<div class="col-6 text-center">
<a href="/Van_Mate/school/school_login.jsp" style="text-decoration: blink;"><img alt="school" src="/Van_Mate/images/schoollogin.jpg" style="height: 70px; width: 200px;">
<br>
<b>School Login</b></a>
</div>
</div>
</div>

<br><br><br>
<%@include file="/footers/common_footer.html"%>

<%@include file="/commonjs/alljs.html" %>
</body>
</html>