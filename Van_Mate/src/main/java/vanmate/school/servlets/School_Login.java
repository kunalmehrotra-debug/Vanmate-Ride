package vanmate.school.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import vanmate.dao.SchoolDao;
import vanmate.utilities.Messages;

/**
 * Servlet implementation class School_Login
 */
@WebServlet("/School_Login")
public class School_Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public School_Login() {
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
		String id=request.getParameter("userid");
		String password=request.getParameter("userpass");
		
		SchoolDao dao=new SchoolDao();
		boolean status= dao.login(id,password);
		if(status==true)
		{
			HttpSession hs=request.getSession();
			hs.setAttribute("sessionKey", id);
			hs.setAttribute("role", "school");
			response.sendRedirect("/Van_Mate/school/school_home.jsp");
		}
		else
		{
			request.setAttribute("message", Messages.Error_Message);//setting value in request scope
			RequestDispatcher dispatcher=request.getRequestDispatcher("/school/school_login.jsp");
			dispatcher.forward(request, response);//forward the request on the specified URL
		}
	}

}
