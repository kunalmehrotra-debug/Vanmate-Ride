package vanmate.admin.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import vanmate.admin.AdminDao;

/**
 * Servlet implementation class DeleteSentItem
 */
@WebServlet(name = "Admin_DeleteSentItem", urlPatterns = { "/Admin_DeleteSentItem" })
public class DeleteSentItem extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeleteSentItem() {
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
	    String userid=(String)hs.getAttribute("admin_key");
	    
	    AdminDao dao=new AdminDao();
	             int status= dao.deleteSentitem(userid,ids);
	             if(status>0)
	             {
	            	 response.sendRedirect("/Van_Mate/admin/admin_sentitem.jsp");
	             }
	}

}
