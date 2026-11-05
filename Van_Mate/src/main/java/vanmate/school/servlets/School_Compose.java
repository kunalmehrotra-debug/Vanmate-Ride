package vanmate.school.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import vanmate.beans.Msg;
import vanmate.dao.SchoolDao;
import vanmate.utilities.Messages;

/**
 * Servlet implementation class School_Compose
 */
@WebServlet("/School_Compose")
public class School_Compose extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public School_Compose() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		String receiverid=request.getParameter("id");
		System.out.println(receiverid);
		
		response.setContentType("text/html");
		PrintWriter out=response.getWriter();
		// out.println("Hello Browser i am sending data using AJAX");
		SchoolDao dao=new SchoolDao();
		boolean status=dao.checkReceiverId(receiverid);
		System.out.println(status);
		if(status)
			out.println("already exist");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String senderid=request.getParameter("sid");
		String receiverid=request.getParameter("rid");
		String subject=request.getParameter("subject");
		String message=request.getParameter("message");
        java.util.Date d=new java.util.Date();
		java.sql.Date sd=new java.sql.Date(d.getTime());
		
		//System.out.println(receiverid+ subject + message);
		SchoolDao dao=new SchoolDao();
		
		Msg m=new Msg();
		m.setSenderid(senderid);
		m.setReceiverid(receiverid);
		m.setSubject(subject);
		m.setMessage(message);
		m.setRstatus("true");
		m.setSstatus("true");
		m.setDate(sd);
		
		int status=dao.compose(m);
		if(status>0)
		{
			request.setAttribute("message", Messages.Success_Message);//setting value in request scope
			RequestDispatcher dispatcher=request.getRequestDispatcher("/school/school_compose.jsp");
			dispatcher.forward(request, response);//forward the request on the specified URL
		}
	}

}
