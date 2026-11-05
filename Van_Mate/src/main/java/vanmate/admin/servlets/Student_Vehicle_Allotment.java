package vanmate.admin.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import vanmate.admin.AdminDao;
import vanmate.utilities.Messages;
/**
 * Servlet implementation class Student_Vehicle_Allotment
 */
@WebServlet("/Student_Vehicle_Allotment")
public class Student_Vehicle_Allotment extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Student_Vehicle_Allotment() {
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
		int rid=Integer.parseInt(request.getParameter("rid"));
		String vnumber=request.getParameter("vehiclechoose");
		
		AdminDao dao=new AdminDao();
		int status=dao.assignStudentVehicle(rid, vnumber);
		if(status>0)
		{
			request.setAttribute("message", Messages.STUDENT_VEHICLE_CONFIRM);//setting value in request scope
			RequestDispatcher dispatcher=request.getRequestDispatcher("/admin/student_vehicle_allotment.jsp");
			dispatcher.forward(request, response);//forward the request on the specified URL
		}
	}

}
