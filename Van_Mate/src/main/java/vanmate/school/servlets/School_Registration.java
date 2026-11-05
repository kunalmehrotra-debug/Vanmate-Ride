package vanmate.school.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import vanmate.beans.School;
import vanmate.dao.SchoolDao;

/**
 * Servlet implementation class School_Registration
 */
@WebServlet("/School_Registration")
public class School_Registration extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public School_Registration() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String userid=request.getParameter("id");
		System.out.println(userid);
		
		response.setContentType("text/html");
		PrintWriter out=response.getWriter();
		// out.println("Hello Browser i am sending data using AJAX");
		
		
		SchoolDao dao=new SchoolDao();
		boolean status=dao.checkId(userid);
		if(status)
			out.println("UserID already exist.");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String id=request.getParameter("schoolid");
		String pass=request.getParameter("schoolpass");
		String sname=request.getParameter("schoolname");
		String email=request.getParameter("schoolemail");
		String phone=request.getParameter("schoolphone");
		String affiliation=request.getParameter("affiliation");
		String city=request.getParameter("schoolcity");
		String owner=request.getParameter("ownername");
		String address=request.getParameter("address");
		String stype=request.getParameter("schooltype");
		String lat=request.getParameter("latitude");
		String lng=request.getParameter("longitude");
		
		double latitude=Double.parseDouble(lat);
		double longitude=Double.parseDouble(lng);
		java.util.Date d=new java.util.Date();
		
		java.sql.Date sd=new java.sql.Date(d.getTime());
		
		//System.out.println(id+ pass+ sname+email +phone+affiliation+city+owner+address+stype + lat +lng);
		
		School s=new School(id,pass,sname,email,phone,affiliation,city,owner,address,stype,sd,latitude,longitude);
		
		SchoolDao dao=new SchoolDao();
		int status=dao.registration(s);
		if(status>0)
		{
			response.sendRedirect("/Van_Mate/school/school_login.jsp");
	    }

}
}
