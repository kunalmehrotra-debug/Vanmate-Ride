package vanmate.utilities;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
 * Servlet implementation class Query
 */
@WebServlet("/Query")
public class Query extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Query() {
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
		String userName=request.getParameter("username");
		String userEmail=request.getParameter("useremail");
		String userPhone=request.getParameter("userphone");
		String userQuery=request.getParameter("userquery");
		System.out.println(userName+ userEmail+ userPhone+ userQuery);
		
		vanmate.beans.Query q=new vanmate.beans.Query(userName,userEmail,userPhone,userQuery);
		
		CommonDao dao=new CommonDao();
		
		int status=dao.addQuery(q);
		if(status>0)
		{
			request.setAttribute("message", Messages.Success_Message);//setting value in request scope
			RequestDispatcher dispatcher=request.getRequestDispatcher("/commonjsp/query.jsp");
			dispatcher.forward(request, response);//forward the request on the specified URL
		}
	}

}
