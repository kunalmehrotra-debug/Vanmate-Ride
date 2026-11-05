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
 * Servlet implementation class Student_Details
 */
@WebServlet(name = "Parent_Student_Details", urlPatterns = { "/Parent_Student_Details" })
public class Student_Details extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Student_Details() {
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
		String student_names[]=request.getParameterValues("sname");
		String standards[]=request.getParameterValues("standard");
		String[] ages=request.getParameterValues("age");
		String schoolname=request.getParameter("schoolname");
		String userid=request.getParameter("userid");
		String requestid=request.getParameter("rid");
		ParentDao dao=new ParentDao();
		int status=dao.studentDetails(student_names,standards,ages,schoolname,userid,requestid);
		if(status>0)
		{
			request.setAttribute("message", Messages.STUDENT_CONFIRMATIN);//setting value in request scope
			RequestDispatcher dispatcher=request.getRequestDispatcher("/parent/parent_details.jsp");
			dispatcher.forward(request, response);//forward the request on the specified URL
		}
	}

}
