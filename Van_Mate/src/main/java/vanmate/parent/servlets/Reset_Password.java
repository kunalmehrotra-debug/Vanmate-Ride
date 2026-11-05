package vanmate.parent.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import vanmate.dao.ParentDao;
import vanmate.utilities.Messages;

/**
 * Servlet implementation class Reset_Password
 */
@WebServlet("/Reset_Password")
public class Reset_Password extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Reset_Password() {
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
		String pass=request.getParameter("userpass");
		ParentDao dao=new ParentDao();
		int status=dao.resetpassword(email,pass);
		if(status>0)
		{
			request.setAttribute("message", Messages.Reset_Paaword);//setting value in request scope
			RequestDispatcher dispatcher=request.getRequestDispatcher("/parent/parent_login.jsp");
			dispatcher.forward(request, response);//forward the request on the specified URL
		}
	}

}
