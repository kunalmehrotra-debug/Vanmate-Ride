package vanmate.school.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import vanmate.beans.School;
import vanmate.dao.SchoolDao;

/**
 * Servlet implementation class School_EditProfile
 */
@WebServlet("/School_EditProfile")
public class School_EditProfile extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public School_EditProfile() {
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
             SchoolDao dao=new SchoolDao();
             School s=new School();
             s.setId(id);
             s.setEmail(email);
             s.setPhone(phone);
             s.setCity(city);
             s.setAddress(address);
            int status= dao.editProfile(s);
            if(status>0)
            {
            	response.sendRedirect("/Van_Mate/school/school_home.jsp");
            }
	}

}
