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
 * Servlet implementation class Assign_Vehicle
 */
@WebServlet("/Assign_Vehicle")
public class Assign_Vehicle extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Assign_Vehicle() {
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
		int driverid=Integer.parseInt(request.getParameter("choosedriver"));
		String vehicleno=request.getParameter("vehicleassign");
		
		AdminDao dao=new AdminDao();
		int status=dao.assignvehicle(driverid,vehicleno);
		if(status>0)
		{
			request.setAttribute("message", Messages.ASSIGNED);//setting value in request scope
			RequestDispatcher dispatcher=request.getRequestDispatcher("/admin/assignvehicle.jsp");
			dispatcher.forward(request, response);//forward the request on the specified URL
		}
	}

}
