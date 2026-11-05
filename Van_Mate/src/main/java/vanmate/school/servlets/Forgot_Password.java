package vanmate.school.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import vanmate.dao.SchoolDao;
import vanmate.utilities.Messages;

/**
 * Servlet implementation class Forgot_Password
 */
@WebServlet(name = "School_Forgot_Password", urlPatterns = { "/School_Forgot_Password" })
public class Forgot_Password extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Forgot_Password() {
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
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String email=request.getParameter("useremail");
		SchoolDao dao=new SchoolDao();
		int status=dao.forgotpassword(email);
		if(status>0)
		{
			response.sendRedirect("/Van_Mate/school/resetpassword.jsp");
		}
		else
		{
			request.setAttribute("message", Messages.Error_Email);//setting value in request scope
			RequestDispatcher dispatcher=request.getRequestDispatcher("/school/forgotpassword.jsp");
			dispatcher.forward(request, response);//forward the request on the specified URL
		}
	}

}
