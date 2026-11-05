package vanmate.admin.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Servlet implementation class Student_Vehicle_Type
 */
@WebServlet("/Student_Vehicle_Type")
public class Student_Vehicle_Type extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Student_Vehicle_Type() {
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
     int rid=Integer.parseInt(request.getParameter("sassign"));
     request.setAttribute("requestid", rid);//setting value in request scope
		RequestDispatcher dispatcher=request.getRequestDispatcher("/admin/student_vehicle_allotment2.jsp");
		dispatcher.forward(request, response);//forward the request on the specified URL
	}

}
