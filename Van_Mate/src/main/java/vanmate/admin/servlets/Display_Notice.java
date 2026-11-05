package vanmate.admin.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import vanmate.admin.AdminDao;
import vanmate.beans.Notice;
import vanmate.utilities.Messages;

/**
 * Servlet implementation class Display_Notice
 */
@WebServlet("/Display_Notice")
public class Display_Notice extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Display_Notice() {
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
		String topic=request.getParameter("topic");
		String content=request.getParameter("content");
		
		java.util.Date d=new java.util.Date();
		
		java.sql.Date sd= new java.sql.Date(d.getTime());
		
		Notice n=new Notice(topic,content,sd);
		
		AdminDao dao=new AdminDao();
		
		int status=dao.insertNotice(n);
		if(status>0)
		{
			request.setAttribute("message", Messages.Success_Message);//setting value in request scope
			RequestDispatcher dispatcher=request.getRequestDispatcher("/admin/notice.jsp");
			dispatcher.forward(request, response);//forward the request on the specified URL
		}
	}

}
