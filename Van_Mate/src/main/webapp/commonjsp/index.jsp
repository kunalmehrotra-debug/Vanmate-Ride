<%@page import="vanmate.utilities.CommonDao"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ page import="java.util.*" %>
    <%@ page import="vanmate.beans.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>VanMate</title>
<%@include file="/commoncss/allcss.html" %>
<style type="text/css">
.testimonial-card .card-up {
  height: 120px;
  overflow: hidden;
  border-top-left-radius: .25rem;
  border-top-right-radius: .25rem;
}

.aqua-gradient {
  background: linear-gradient(40deg, #2096ff, #05ffa3) !important;
}

.testimonial-card .avatar {
  width: 120px;
  margin-top: -60px;
  overflow: hidden;
  border: 5px solid #fff;
  border-radius: 50%;
}
</style>
<link rel="stylesheet" href="/Van_Mate/commoncss/link.css">
</head>
<body>
<%@include file="/headers/common_header.html" %>
<%
CommonDao dao=new CommonDao();
ArrayList<Notice> notice=dao.viewNotice();
%>
<div class="container-fluid">
<marquee direction="right"> <h1 style="text-align: center;background-color: #F9E2AF;font-family: Noto">Welcome VanMate The Student's Ride</h1></marquee>

<div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel" >
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" >
    <div class="carousel-item active" data-bs-interval="10000">
      <img src="/Van_Mate/images/bus.jpg" class="d-block w-100" alt="first" height="400px">
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src="/Van_Mate/images/track.jpg" class="d-block w-100" alt="second" height="400px">
    </div>
    <div class="carousel-item">
      <img src="/Van_Mate/images/safer.png" class="d-block w-100" alt="third" height="400px">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

<div class="row mt-2" style="background-color: #088395;">
<div class="col col-sm-auto col-xl-3 col-mx-auto">
<div class="card mx-auto my-3" style="width: 21rem;">
 <a href="/Van_Mate/parent/parent_details.jsp"><img src="/Van_Mate/images/registerclick.png" class="card-img-top " alt="register"></a> 
  <div class="card-body">
    <h5 class="card-title text-center" style="background-color: #FFF9DE;">PARENT REGISTRATION</h5>
  </div>
</div>
</div>
<div class="col col-sm-auto col-xl-3 col-mx-auto">
<div class="card mx-auto my-3" style="width: 21rem;">
  <div class="card-header fw-bolder text-center" style="background-color: #FFF9DE;">
    NOTICE
  </div>
  <div class="card-body ">
  <marquee direction="right" style="margin: auto;" class="bg-warning">
 
    <table class="table-warning">
    <%
    for(Notice n: notice) 
    {
    %>
    <tr class="table-warning fw-bolder" style="font-size: 15px;">
    <th class="table-warning"><%=n.getContent() %></th>
    </tr>
    <%} %>
    </table>
     </marquee>
  </div>
</div>
</div>
<div class="col col-sm-auto col-xl-3 col-mx-auto">
<div class="card mx-auto my-3" style="width: 21rem;">
  <div class="card-header fw-bolder text-center" style="background-color: #FFF9DE;">
    VEHICLE AND CHARGES
  </div>
  <div class="card-body">
    <h4 class="card-title">VEHICLE TYPE AND THEIR CHARGES</h4>
   <a href="/Van_Mate/commonjsp/vehiclesforbookings.jsp" style="text-decoration: blink;"><p class="card-text text-center fw-bold">CLICK HERE</p></a> 
  </div>
</div>
</div>
<div class="col col-sm-auto col-xl-3 col-lg-auto col-md-auto">
<div class="card mx-auto my-3" style="width: 21rem;">
  <a href="/Van_Mate/school/school_details.jsp"><img src="/Van_Mate/images/registerclick.png" class="card-img-top " alt="register" ></a>
  <div class="card-body">
    <h5 class="card-title text-center" style="background-color: #FFF9DE;">SCHOOL REGISTRATION</h5>
  </div>
</div>
</div>
</div>

<section>
  <div class="row d-flex justify-content-center">
    <div class="col-md-10 col-xl-8 text-center">
      <h3 class="mb-2 mt-2 fw-bolder" style="background-color: #F9E2AF;">SERVICE RESPONSES</h3>
      <p class="fw-medium">
        Feedbacks from our satisfied Users
      </p>
    </div>
  </div>

  <div class="row text-center">
    <div class="col-md-4 mb-5 mb-md-0">
      <div class="card testimonial-card">
        <div class="card-up" style="background-color: #9d789b;"></div>
        <div class="avatar mx-auto bg-white">
          <img src="/Van_Mate/images/school.jpg"
            class="rounded-circle img-fluid" />
        </div>
        <div class="card-body">
          <h4 class="mb-4">Lucknow Public School</h4>
          <hr />
          <p class="dark-grey-text mt-4">
            <i class="fas fa-quote-left pe-2"></i>Quality of vehicles are good.
          </p>
        </div>
      </div>
    </div>
    <div class="col-md-4 mb-5 mb-md-0">
      <div class="card testimonial-card">
        <div class="card-up" style="background-color: #7a81a8;"></div>
        <div class="avatar mx-auto bg-white">
          <img src="/Van_Mate/images/school.jpg"
            class="rounded-circle img-fluid" />
        </div>
        <div class="card-body">
          <h4 class="mb-4">CMS</h4>
          <hr />
          <p class="dark-grey-text mt-4">
            <i class="fas fa-quote-left pe-2"></i>Drivers are trustworthy.Anytime we can contact them.
          </p>
        </div>
      </div>
    </div>
     <div class="col-md-4 mb-0">
      <div class="card testimonial-card">
        <div class="card-up" style="background-color: #6d5b98;"></div>
        <div class="avatar mx-auto bg-white">
          <img src="/Van_Mate/images/parents.jpg"
            class="rounded-circle img-fluid" />
        </div>
        <div class="card-body">
          <h4 class="mb-4">Rohit Chauhan</h4>
          <hr />
          <p class="dark-grey-text mt-4">
            <i class="fas fa-quote-left pe-2"></i>Always pick and drop my child on time.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
<br>
</div>
<%@include file="/footers/common_footer.html"%>
<%@include file="/commonjs/alljs.html" %>
</body>
</html>