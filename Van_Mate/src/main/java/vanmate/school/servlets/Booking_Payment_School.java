package vanmate.school.servlets;

import java.io.IOException;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.instamojo.wrapper.api.ApiContext;
import com.instamojo.wrapper.api.Instamojo;
import com.instamojo.wrapper.api.InstamojoImpl;
import com.instamojo.wrapper.exception.ConnectionException;
import com.instamojo.wrapper.exception.HTTPException;
import com.instamojo.wrapper.model.PaymentOrder;
import com.instamojo.wrapper.model.PaymentOrderResponse;

import vanmate.beans.Payment;
import vanmate.dao.SchoolDao;

/**
 * Servlet implementation class Booking_Payment
 */
@WebServlet("/Booking_Payment_School")
public class Booking_Payment_School extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	ApiContext context = ApiContext.create("test_kF2ZlG2R5NVIfQIGitiHEGo5dtiX1VI7P9x","test_hGM6cNzcbQEgJk9NNlAbnNClCQTnvRSnxnqjarQltBl4Sknm7lTVJT9GDMopFCp8qElTF5rpgQvZEHZVoHPZBxw9ZDYOVfBUHWYsYFcQwOabnsvCL59TC27GGl8",ApiContext.Mode.TEST);
	Instamojo api = new InstamojoImpl(context);
	PaymentOrder order  = new PaymentOrder();
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Booking_Payment_School() {
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
		HttpSession hs=request.getSession(false);
		String uid=(String)hs.getAttribute("sessionKey");
		String name=request.getParameter("username");
		String email=request.getParameter("email");
		String phone=request.getParameter("phone");
		int rid=Integer.parseInt(request.getParameter("rid"));
        UUID uuid=UUID.randomUUID();
        String transactionId=uuid.toString();
        String charge=request.getParameter("charge");
        
        

		order.setName(name);
		order.setEmail(email);
		order.setPhone(phone);
		order.setCurrency("INR");
		order.setAmount(Double.parseDouble(charge));
		order.setDescription("For Vehicle Booking");
		order.setRedirectUrl("http://localhost:8080/Van_Mate/school/thankyou.jsp");
		
		order.setTransactionId(transactionId);
		try {
			PaymentOrderResponse orderresponce = api.createPaymentOrder(order);
			System.out.println(orderresponce);
			SchoolDao dao=new SchoolDao();
			Payment p=new Payment(uid,name,email,phone,transactionId,Integer.parseInt(charge));
			p.setRid(rid);
			int status = dao.insertpayment(p);
			if(status>0)
			   response.sendRedirect(orderresponce.getPaymentOptions().getPaymentUrl());
		} 
		catch (HTTPException e ) {
			
			e.printStackTrace();
		}
		catch (ConnectionException e) {
			e.printStackTrace();
		}
        
        
        
	}

}
