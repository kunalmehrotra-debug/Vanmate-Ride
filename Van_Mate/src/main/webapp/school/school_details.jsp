<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>VANMATE School Details</title>
<style>
         .map {
         height: 150px;
         }
</style>
 <script>
         function getLocation() { 
           
           if (!navigator.geolocation) {
             alert("Browser doesn't support geolocation");
           } else {
             navigator.geolocation.getCurrentPosition(success, error);
           }
         }
         
         // Get current position successfully
         function success(position) {
           var map, marker,
               latitude = position.coords.latitude,
               longitude = position.coords.longitude;
           
           // Instance map using leaflet
           map = L.map('map').setView([latitude, longitude], 13);
           
           // Tile layer using key api at cloudmade.com
           L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             key: '760506895e284217a7442ce2efe97797',
             styleId: 103288,
             maxZoom: 16
           }).addTo(map);
         
           // Marker using leaflet
           marker = L.marker([latitude, longitude], {
             draggable: 'true'
           }).addTo(map);
         
         
         //Drag Marker
         marker.on('dragend', function(event) {
             var position = marker.getLatLng();
             marker.setLatLng(position, {
               draggable: 'true'
             }).bindPopup(position).update();
             $("#lat").val(position.lat.toFixed(5));
             $("#lon").val(position.lng.toFixed(5)).keyup();
           });
         
           // Popup in leaflet
           marker.bindPopup('<p>Your location</p>').openPopup();
           $("#lat").val(latitude.toFixed(5));
           $("#lon").val(longitude.toFixed(5))
         }
         
         // Get current position fail
         function error() {
           alert('Get current position fail.');
         }
      </script>
<%@include file="/commoncss/allcss.html" %>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
      <script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"></script>  
      
<script>
$(document).ready(function(){
    $("#username").change(function(){
        //alert("hello")
        console.log($(this).val());
        var username = $(this).val();//it will fetch the value from input text
        $.ajax({
            url: "/Van_Mate/School_Registration",
            type : "GET",
            data:{
                'id': username
            },
            //dataType: 'json',
            success: function(response_data){
             // alert(response_data)
              if(response_data!="")
        	  {
				$("#ajaxmsg").text("This userName alredy present")
				$("#username").val("")
        	  }
          else
          {
        	  $("#ajaxmsg").text("")
          }
				
            }
        
                });
    });
})
</script>
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

<div class="container py-4 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
        <div class="card rounded-3">
          <img src="/Van_Mate/images/schoold.jpg" class="w-100" style="border-top-left-radius: .3rem; border-top-right-radius: .3rem;height: 250px;"
            alt="School details">
          <div class="card-body md-5" style="background-color: #F5E9CF; FCFFE7;">
            <h2 style="text-align: center;font-family: Gentona;background-color: #E96479;" class="fw-bolder">SCHOOL REGISTRATION</h2>
            
            <form action="/Van_Mate/School_Registration" method="post" class="form-horizontal needs-validation" novalidate>
            <div class="mb-3 mt-4 row">	
<label for="id" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >ID:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<input type="text" class="form-control" name="schoolid" id="username" placeholder="Enter ID." required="required" >
<span id="ajaxmsg" style="color: red;"></span>
<div class="invalid-feedback">
      Please enter valid id.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="password" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >PASSWORD:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<input type="password" class="form-control" name="schoolpass" placeholder="Enter password." required="required" >
<div class="invalid-feedback">
      Enter a valid password.
    </div>
</div>
</div>
            <div class="mb-3 mt-4 row">	
<label for="name" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >SCHOOL NAME:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<input type="text" class="form-control" name="schoolname" placeholder="Enter school Name." required="required" >
<div class="invalid-feedback">
      Please school name.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">
<label for="location" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >LOCATION:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<div id="map" class="map"></div>
      <input type="hidden" id="lat" name="latitude">
      <input type="hidden" id="lon" name="longitude">
      <script>
         getLocation(event);
      </script>
</div>
</div>

<div class="mb-3 mt-4 row">	
<label for="email" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >EMAIL:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<input type="email" class="form-control" name="schoolemail" placeholder="Enter EMail." required="required" >
<div class="invalid-feedback">
      Enter Email.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="phone" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >PHONE NO.</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<input type="tel" class="form-control" name="schoolphone" placeholder="Enter phone number." required="required" >
<div class="invalid-feedback">
      Enter Phone number.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="affiliation" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >Board Affiliation:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<select class="form-select form-control" aria-label="affiliation" name="affiliation" required="required">
  <option selected>Select Board.</option>
  <option value="UP">UP</option>
  <option value="ICSE">ICSE</option>
  <option value="CBSE">CBSE</option>
</select>
<div class="invalid-feedback">
      Select any board.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="city" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >CITY:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<input type="text" class="form-control" name="schoolcity" placeholder="Enter city." required="required" >
<div class="invalid-feedback">
      Enter City.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="ownername" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >SCHOOL OWNERNAME:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<input type="text" class="form-control" name="ownername" placeholder="Enter owner name." required="required" >
<div class="invalid-feedback">
      Enter owner name.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="address" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >ADDRESS:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<textarea rows="2" cols="30" name="address" required="required"></textarea>
<div class="invalid-feedback">
      Enter school address.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="type" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >SCHOOL TYPE:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<select class="form-select form-control" aria-label="stype" name="schooltype" required="required">
  <option selected>Select Type.</option>
  <option value="Pre Primary">Pre Primary</option>
  <option value="Primary">Primary</option>
  <option value="Middle">Middle</option>
  <option value="Secondary">Secondary</option>
  <option value="Senior Secondary">Senior Secondary</option>
</select>
<div class="invalid-feedback">
      Select any type.
    </div>
</div>
</div>
<div class="mb-3 row">
<div class="col-sm-4"></div>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<button type="submit" class="btn btn-outline" style="background-color: #F16767;">Submit</button>
</div>
</div> 
            </form>
            
          </div>
        </div>
      </div>
    </div>
  </div>

 <%@include file="/commonjs/alljs.html" %>
 <%@include file="/footers/common_footer.html"%>
<script type="text/javascript" src="/Van_Mate/commonjs/custom_validation.js"></script>
</body>
</html>