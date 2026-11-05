package vanmate.admin.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import vanmate.utilities.Messages;

import vanmate.admin.AdminDao;

/**
 * Servlet implementation class Admin_Login
 */
@WebServlet("/Admin_Login")
public class Admin_Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Admin_Login() {
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
	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String id=request.getParameter("adminid");
		String pass=request.getParameter("adminpass");
		
		System.out.println(id+pass);
		AdminDao ad=new AdminDao();
		boolean status=ad.admin_login(id, pass);
		if(status==true)
		{
			HttpSession hs=request.getSession();
			hs.setAttribute("admin_key",id);
			System.out.println(hs.getId()+"in login");
			response.sendRedirect("/Van_Mate/admin/admin_home.jsp");
		}
		else
		{
			request.setAttribute("message", Messages.Error_Message);//setting value in request scope
			RequestDispatcher dispatcher=request.getRequestDispatcher("/admin/admin_login.jsp");
			dispatcher.forward(request, response);//forward the request on the specified URL
		}
	}

}
