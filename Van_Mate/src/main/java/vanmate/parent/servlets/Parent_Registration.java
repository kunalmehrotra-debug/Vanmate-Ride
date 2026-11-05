package vanmate.parent.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import vanmate.beans.Parent;
import vanmate.dao.ParentDao;
import vanmate.utilities.Messages;

/**
 * Servlet implementation class Parent_Registration
 */
@WebServlet("/Parent_Registration")
public class Parent_Registration extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Parent_Registration() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String userid=request.getParameter("id");
		//System.out.println(userid);
		
		response.setContentType("text/html");
		PrintWriter out=response.getWriter();
		// out.println("Hello Browser i am sending data using AJAX");
		
		
		ParentDao dao=new ParentDao();
		boolean status=dao.checkId(userid);
		System.out.println(status);
		if(status)
			out.println("already exist");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		String id=request.getParameter("parentid");
		String password=request.getParameter("parentpass");
		String name=request.getParameter("parentname");
		String email=request.getParameter("parentemail");
		String phone=request.getParameter("parentphone");
		String city=request.getParameter("parentcity");
		String address=request.getParameter("address");
		
		System.out.println(id+password+name+email+phone+city+address);
        java.util.Date d=new java.util.Date();
		
		java.sql.Date sd=new java.sql.Date(d.getTime());
		Parent p=new Parent(id,password,name,email,phone,city,address,sd);
		
		ParentDao dao=new ParentDao();
		int status=dao.registration(p);
		if(status>0)
		{
			response.sendRedirect("/Van_Mate/parent/parent_login.jsp");
	    }
		else 
		{
		request.setAttribute("IDExistence",Messages.EXISTENCE_MESSAGE);	
		RequestDispatcher rd=request.getRequestDispatcher("/parent/parent_details.jsp");
		rd.forward(request, response);
		}
	}

}
