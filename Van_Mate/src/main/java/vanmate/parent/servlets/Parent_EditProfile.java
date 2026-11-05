package vanmate.parent.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import vanmate.beans.Parent;
import vanmate.dao.ParentDao;

/**
 * Servlet implementation class Parent_EditProfile
 */
@WebServlet("/Parent_EditProfile")
public class Parent_EditProfile extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Parent_EditProfile() {
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
		String email=request.getParameter("email");
		String phone=request.getParameter("phone");
		String city=request.getParameter("city");
		String address=request.getParameter("address");
		
		HttpSession hs=request.getSession(false);//it will return the referrence of existing session
		     String id=(String)hs.getAttribute("sessionKey");
             ParentDao dao=new ParentDao();
             Parent p=new Parent();
             p.setId(id);
             p.setEmail(email);
             p.setPhone(phone);
             p.setCity(city);
             p.setAddress(address);
            int status= dao.editProfile(p);
            if(status>0)
            {
            	response.sendRedirect("/Van_Mate/parent/parent_home.jsp");
            }
	}

}
