<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
   <head>
      <meta charset="utf-8">
      <title>LiveTrack</title>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css">
	 
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
      <script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"></script>  
      <style>
         html, body {
         height: 100%
         }
         .map {
         height: 100%;
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
		 
		 .leaflet-popup-content{
		 width:260px;
		 
		 }
      </style>
	 

      <script>
        
      </script>
   </head>
   <body>
      <div id="map" class="map"></div>
      <script>
          var marker=null;
          map = L.map('map').setView([26.8467, 80.9462], 13);         
                 // Tile layer using key api at cloudmade.com
                 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                   key: '760506895e284217a7442ce2efe97797',
                   styleId: 103288,
                   maxZoom: 16
                 }).addTo(map);
         
         
               function updateLocation() { 
                 $.ajax({
                  type: 'GET',
                  dataType: "json",
                  //837d53b4-d320-4e33-aeb8-1a7a8fcb253c
                  url: "http://fleet.trackingpath.com/api/v1.0/device/live/"+getUrlParameter("did")+"?access_token=eb404c8b-133d-4d01-965b-479523e12ee3",
                  success:function(data){
         if(marker==null){
         marker = L.marker([data.livedata.latitude, data.livedata.longitude], {}).addTo(map);
                   
         }else{
         
         var newLatLng = new L.LatLng(data.livedata.latitude, data.livedata.longitude);
         marker.setLatLng(newLatLng); 
		
         }
		//  var html="<Table><tr><td><strong>Time</strong></td><td>"+data.livedata.deviceTime+"</td></tr>"+
		// "<tr><td><strong>Address</strong></td><td>"+data.livedata.address+"</td></tr><tr><td><strong>Speed</strong></td><td>"+data.livedata.speed+"</td></tr></table>"	


  var html = "<Table border='0' rules='none'>"
				+ "<tr><td colspan='3' style='background-color:black'></td></tr>"
				+ "<tr><td><strong>Time</strong></td><td>&nbsp;</td><td>" +data.livedata.deviceTime+ "</td></tr>"
				+ "<tr><td><strong>Speed</strong></td><td>&nbsp;</td><td>"+data.livedata.speed+ " Km/h</td></tr>"
				+ "<tr><td><strong>Address</strong></td><td>&nbsp;</td><td>" +data.livedata.address+ "</td></tr>"			
				+ "</Table>";
				 
		 
         marker.bindPopup(html).openPopup();
		 centerLeafletMapOnMarker(map,marker);
                  }});
               }
               
          function centerLeafletMapOnMarker(map, marker) {
			  var latLngs = [ marker.getLatLng() ];
			  var markerBounds = L.latLngBounds(latLngs);
			  map.fitBounds(markerBounds);
			}     
         function getUrlParameter(name) {
          name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
          var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
          var results = regex.exec(location.href);
          return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, '    '));
         };
         updateLocation();
            setInterval(updateLocation, 30000);
      </script>
   </body>
</html>