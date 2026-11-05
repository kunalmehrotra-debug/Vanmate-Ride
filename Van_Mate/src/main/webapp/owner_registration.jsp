<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>registration</title>

  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
      <script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"></script>  
<%-- <%@include file="/views/common/allcss.html" %> --%>

 <style>
         html, body {
         height: 100%
         }
         .map {
         height: 300px;
         }
         .btn {
         background-color: rgba(10, 10, 230, .5);
         border: 0;
         color: #fff;
         padding: 10px;
         text-shadow: 0 0 1px rgba(0, 0, 0, .3);
         text-decoration: none;
         margin: 0.5rem 0 1rem;
         display: inline-block;
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
</head>

<%-- 
<%@include file="/views/headers/navbar.html" %> --%>


<body>


	<div class="container h-100" >
	<div class="d-flex justify-content-center">
		<div class="card mt-5 col-md-6 animated bounceInDown myForm">
			<div class="card-header">
			<p class="animate-charcter" style="font-size: 40px;text-align: center"><b><i class='fas fa-user-cog'></i> Contact Us Form</b></p>
			</div>
			<div class="card-body">
	<form  action="/owner/owner_registration" method="post" class="needs-validation" novalidate>
					<div id="dynamic_container">
						
						
						<div class="input-group mt-3">
							<div class="input-group-prepend">
								<span class="input-group-text br-15"><i class="fas fa-user-graduate"></i></span>
							</div>
				<input type="text" name="username" placeholder="Enter Your Name" class="form-control" required/>
				
				<div class="invalid-feedback">
        Enter Your name Please
      </div>
				
				
					
						<div class="input-group mt-3">
							<div class="input-group-prepend">
								<span class="input-group-text br-15"><i class="fas fa-user-graduate"></i></span>
							</div>
				<input type="password" name="password" placeholder="Enter Your Name" class="form-control" required/>
				
				<div class="invalid-feedback">
        Enter Your password Please
      </div>
				
				
				
					
						<div class="input-group mt-3">
							<div class="input-group-prepend">
								<span class="input-group-text br-15"><i class="fas fa-user-graduate"></i></span>
							</div>
				<input type="tel" name="phone" placeholder="Enter Your Name" class="form-control" required/>
				
				<div class="invalid-feedback">
        Enter Your password Please
      </div>
				
				
				
						</div>
						<div class="input-group mt-3">
							<div class="input-group-prepend">
								<span class="input-group-text br-15"><i class="fas fa-at"></i></span>
							</div>
							<input type="email" required  name="email" placeholder="Enter Your Email" class="form-control"/>
							
							<div class="invalid-feedback">
        Enter Your Email Please
      </div>
						</div>
						
		
		
		<div id="map" class="map"></div>
      Lat : <input type="text" id="lat" name="latitude">
      Lon : <input type="text" id="lon" name="longitude">
      <script>
         getLocation(event);
      </script>
	
				
			<div class="card-footer text-center">
				<!-- <a class="btn btn-secondary btn-sm" id="add_more"><i class="fas fa-plus-circle"></i> Add</a>
				<a class="btn btn-secondary btn-sm" id="remove_more"><i class="fas fa-trash-alt"></i> Remove</a> -->
				<button  style="width: 150px;height: 50px" class="btn btn-success btn-sm float-right submit_btn"><i class="fas fa-arrow-alt-circle-right"></i> <b>Submit</b></button>
			</div>
			</form>
				
			</div>
		</div>
	</div>
	</div>

<%-- <%@include file="/views/common/alljs.html" %>
<script src="/views/common/custom_validation.js"></script> --%>
</body>
</html>