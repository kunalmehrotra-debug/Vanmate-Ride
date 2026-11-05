package vanmate.admin.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import vanmate.admin.AdminDao;
import vanmate.beans.Admin_Details;

/**
 * Servlet implementation class Admin_EditProfile
 */
@WebServlet("/Admin_EditProfile")
public class Admin_EditProfile extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Admin_EditProfile() {
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
		String password=request.getParameter("adminpass");
		String phone=request.getParameter("phone");
		String email=request.getParameter("email");
		
		HttpSession hs=request.getSession(false);//it will return the referrence of existing session
	    String id=(String)hs.getAttribute("admin_key");
	    
	    AdminDao dao=new AdminDao();
	    Admin_Details ad=new Admin_Details();
	    ad.setId(id);
	    ad.setPass(password);
	    ad.setEmail(email);
	    ad.setPhone(phone);
	    int status= dao.editProfile(ad);
	    if(status>0)
		{
			response.sendRedirect("/Van_Mate/admin/admin_editprofile.jsp");
		}
	}

}
