<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>VANMATE</title>
<%@include file="/commoncss/allcss.html" %>
</head>
<body>
<%@include file="/headers/admin_header.html" %>
<%
 String mssg=(String)request.getAttribute("message");//to fetch the value from key
 //System.out.println(mssg);
 if(mssg!=null)
 {
%>
<div class="alert alert-warning alert-dismissible fade show" role="alert" style="height: 50px;">
  <strong><%=mssg %></strong>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

<%} %>

<div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
        <div class="card rounded-3">
          <div class="card-body md-5" style="background-color: #ECE8DD;">
            <h2 style="text-align: center;background-color: #579BB1;color: #FFFFE8;" class="fw-bolder">DRIVER DETAILS</h2>
            <form action="/Van_Mate/Driver_Details" method="post" class="form-horizontal needs-validation" novalidate>
              <div class="mb-3 mt-4 row">	
<label for="name" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >DRIVER NAME:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<input type="text" class="form-control" name="drivername" placeholder="Enter driver Name." required="required" >
<div class="invalid-feedback">
      Please driver name.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="phone" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >PHONE NO.</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<input type="tel" class="form-control" name="driverphone" placeholder="Enter phone number." required="required" >
<div class="invalid-feedback">
      Enter Phone number.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="experience" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >EXPERIENCE:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<input type="text" class="form-control" name="experience" placeholder="Enter experience." required="required" >
<div class="invalid-feedback">
      Enter experience.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="ownername" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >LICENSE NO.</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<input type="text" class="form-control" name="licensenumber" placeholder="Enter license number." required="required" >
<div class="invalid-feedback">
      Enter license number.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="validation" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >VALID UPTO:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<input type="date" class="form-control" name="validupto" placeholder="Enter expiry date." required="required" >
<div class="invalid-feedback">
      Enter expiry date.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="address" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >ADDRESS:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<textarea rows="2" cols="30" name="address" required="required"></textarea>
<div class="invalid-feedback">
      Enter address.
    </div>
</div>
</div>
<div class="mb-3 mt-4 row">	
<label for="photo" class="col-lg-3 col-xl-3 col-sm-3 col-md-3 col-form-label text-center fw-bold " >DRIVER PHOTO:</label>
<div class="col-sm-9 col-lg-9 col-xl-9 col-md-9">
<input type="file" class="form-control" name="photo"  >
</div>
</div>
<div class="mb-3 row">
<div class="col-sm-4"></div>
<div class="col-lg-auto col-xl-6 col-sm-auto col-md-auto">
<button type="submit" class="btn btn-outline" style="background-color: #F16767;">ADD</button>
</div>
</div> 
         
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
 <%@include file="/commonjs/alljs.html" %>
<script type="text/javascript" src="/Van_Mate/commonjs/custom_validation.js"></script>
</body>
</html>