<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
 
 <script>
 $(document).ready(function()
		 {
	 //alert("hello jquery")
	 
	 $("#btnshow").click(function()
			 {
		 $("#p1").show()
			 });//btnshow close
	 
	 $("#btnhide").click(function()
			 {
		 $("#p1").hide()
			 });//btnhide close
			 
			 
         })
 </script>
 
</head>
<body>

<p id="p1" style="display: none;">hello jquery</p>

<button type="button" id="btnshow">show</button>

<button type="button" id="btnhide">hide</button>
</body>
</html> 