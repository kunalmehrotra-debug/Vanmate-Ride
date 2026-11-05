package vanmate.admin.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import vanmate.beans.Msg;
import vanmate.admin.AdminDao;
import vanmate.utilities.Messages;

/**
 * Servlet implementation class Admin_Compose
 */
@WebServlet("/Admin_Compose")
public class Admin_Compose extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Admin_Compose() {
        super();
        // TODO Auto-generated constructor stub
    }

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
		String senderid=request.getParameter("sid");
		String receiverid=request.getParameter("rid");
		String subject=request.getParameter("subject");
		String message=request.getParameter("message");
        java.util.Date d=new java.util.Date();
		java.sql.Date sd=new java.sql.Date(d.getTime());
		//System.out.println(receiverid+ subject + message);
        AdminDao dao=new AdminDao();
		
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
			RequestDispatcher dispatcher=request.getRequestDispatcher("/admin/admin_compose.jsp");
			dispatcher.forward(request, response);//forward the request on the specified URL
		}
	}

}
