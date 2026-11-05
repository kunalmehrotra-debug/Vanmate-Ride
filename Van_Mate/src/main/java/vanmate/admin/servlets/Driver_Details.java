package vanmate.admin.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import vanmate.admin.AdminDao;
import vanmate.beans.*;
import vanmate.utilities.Messages;

/**
 * Servlet implementation class Driver_Details
 */
@WebServlet("/Driver_Details")
public class Driver_Details extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @param d 
     * @param validity 
     * @param photo 
     * @param address 
     * @param lnumber 
     * @param experience 
     * @param phone 
     * @param dname 
     * @see HttpServlet#HttpServlet()
     */
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String dname=request.getParameter("drivername");
		String phone=request.getParameter("driverphone");
		String experience=request.getParameter("experience");
		String lnumber=request.getParameter("licensenumber");
		String validity=request.getParameter("validupto");
		String address=request.getParameter("address");
		String photo=request.getParameter("photo");
		
        java.util.Date d=new java.util.Date();
		
		java.sql.Date sd=new java.sql.Date(d.getTime());
		
		Driver dd=new Driver(dname,phone,experience,lnumber,address,phone,validity,sd);
		AdminDao dao=new AdminDao();
		int status=dao.addDriver(dd);
		if(status>0)
		{
			request.setAttribute("message", Messages.Success_Message);//setting value in request scope
			RequestDispatcher dispatcher=request.getRequestDispatcher("/admin/driver_details.jsp");
			dispatcher.forward(request, response);//forward the request on the specified URL
		}
	}

}
