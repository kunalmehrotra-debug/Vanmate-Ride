package vanmate.school.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import vanmate.dao.SchoolDao;

/**
 * Servlet implementation class DeleteInbox
 */
@WebServlet(name = "School_DeleteInbox", urlPatterns = { "/School_DeleteInbox" })
public class DeleteInbox extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeleteInbox() {
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
		String ids[]=request.getParameterValues("chk");
		
		HttpSession hs=request.getSession(false);//it will return the referrence of existing session
	    String userid=(String)hs.getAttribute("sessionKey");
	    
	    SchoolDao dao=new SchoolDao();
	             int status= dao.deleteInbox(userid,ids);
	             if(status>0)
	             {
	            	 response.sendRedirect("/Van_Mate/school/school_inbox.jsp");
	             }
	}

}
