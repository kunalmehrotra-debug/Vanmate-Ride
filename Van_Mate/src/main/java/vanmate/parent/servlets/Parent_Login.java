package vanmate.parent.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import vanmate.dao.ParentDao;
import vanmate.utilities.Messages;

/**
 * Servlet implementation class Parent_Login
 */
@WebServlet("/Parent_Login")
public class Parent_Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Parent_Login() {
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
		String id=request.getParameter("parentid");
		String password=request.getParameter("parentpass");
		
		ParentDao dao=new ParentDao();
		boolean status= dao.login(id,password);
		if(status==true)
		{
			HttpSession hs=request.getSession();
			hs.setAttribute("sessionKey", id);
			hs.setAttribute("role", "parent");
			response.sendRedirect("/Van_Mate/parent/parent_home.jsp");
		}
		else
		{
			request.setAttribute("message", Messages.Error_Message);//setting value in request scope
			RequestDispatcher dispatcher=request.getRequestDispatcher("/parent/parent_login.jsp");
			dispatcher.forward(request, response);//forward the request on the specified URL
		}
	}

}
