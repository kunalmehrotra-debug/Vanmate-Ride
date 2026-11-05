package vanmate.parent.servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import vanmate.beans.B_Request;
import vanmate.dao.ParentDao;
import vanmate.utilities.Messages;

/**
 * Servlet implementation class Booking_Request
 */
@WebServlet("/Booking_Request")
public class Booking_Request extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Booking_Request() {
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
		HttpSession hs=request.getSession(false);//it will return the referrence of existing session
	    String userid=(String)hs.getAttribute("sessionKey");
	    
	    String vtype=request.getParameter("vtype");
	    String source=request.getParameter("source");
	    String destination=request.getParameter("destination");
	    String time=request.getParameter("timing");
	    int nstudent=Integer.parseInt(request.getParameter("nstudent"));
	    
	    ParentDao dao=new ParentDao();
	    B_Request br=new B_Request(nstudent,userid,vtype,source,destination,time);
	    
	    int status=dao.bookingRequest(br);
	    if(status>0)
	    {
	    	request.setAttribute("message", Messages.BOOKING_REQUEST);//setting value in request scope
			RequestDispatcher dispatcher=request.getRequestDispatcher("/parent/booking_vehicle_request.jsp");
			dispatcher.forward(request, response);//forward the request on the specified URL
	    }
	}

}
