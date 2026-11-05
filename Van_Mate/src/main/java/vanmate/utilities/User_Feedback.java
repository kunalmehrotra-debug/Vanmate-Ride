package vanmate.utilities;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import vanmate.beans.Feedback;

/**
 * Servlet implementation class User_Feedback
 */
@WebServlet("/User_Feedback")
public class User_Feedback extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public User_Feedback() {
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
		String userName=request.getParameter("username");
		String userEmail=request.getParameter("useremail");
		String userPhone=request.getParameter("userphone");
		String userrating=request.getParameter("userratings");
		String userfeedback=request.getParameter("userfeedback");
		//System.out.println(userName+userfeedback+userEmail+userPhone+userrating);
		
		Feedback fe=new Feedback(userName,userEmail,userPhone,userfeedback,userrating);
		CommonDao dao=new CommonDao();
		
		int status=dao.addfeedback(fe);
		if(status>0)
		{
			request.setAttribute("message", Messages.FEEDBACK_Message);//setting value in request scope
			RequestDispatcher dispatcher=request.getRequestDispatcher("/commonjsp/feedback.jsp");
			dispatcher.forward(request, response);//forward the request on the specified URL
		}
	}

}
