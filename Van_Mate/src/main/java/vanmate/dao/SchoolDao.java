package vanmate.dao;

import vanmate.beans.B_Request;
import vanmate.beans.Msg;
import vanmate.beans.Payment;
import vanmate.beans.S_Details;
import vanmate.beans.School;
import vanmate.beans.Vehicle;
import vanmate.dbutils.DBConnection;

import java.sql.*;
import java.util.ArrayList;

public class SchoolDao
{

	private Connection connection;
	
	public int registration(School s) 
	{
		connection=DBConnection.openConnection();
		
		String strinsert="insert into school(id, password, sname, email, phone, board, city, owner, address, stype, date, latitude, longitude)values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
		
		PreparedStatement ps=null;
		int status=0;
		try {
			ps=connection.prepareStatement(strinsert);
			ps.setString(1, s.getId());
			ps.setString(2, s.getPassword());
			ps.setString(3, s.getSname());
			ps.setString(4, s.getEmail());
			ps.setString(5, s.getPhone());
			ps.setString(6, s.getBoard());
			ps.setString(7, s.getCity());
			ps.setString(8, s.getOwner());
			ps.setString(9, s.getAddress());
			ps.setString(10, s.getStype());
			
			java.util.Date d=new java.util.Date();
			long dt=d.getTime();
			java.sql.Date sd=new java.sql.Date(dt);
			ps.setDate(11,sd);
			ps.setDouble(12, s.getLatitude());
			ps.setDouble(13, s.getLongitude());
			
			System.out.println(ps);
			status=ps.executeUpdate();
		}
		catch (SQLException se) {
			se.printStackTrace();
		}
		finally {
			try {
			ps.close();
			connection.close();
			}
			catch (SQLException se) {
				se.printStackTrace();
			}
		}
		return status;
	}

	//login code
	public boolean login(String id, String password) 
	{
		connection=DBConnection.openConnection();
		String strsql="select * from school where id=? and password=?";
		
		PreparedStatement ps=null;
		ResultSet rs=null;
		try {
			ps=connection.prepareStatement(strsql);
			ps.setString(1,id);
			ps.setString(2, password);
			System.out.println(ps);
			rs=ps.executeQuery();
			if(rs.next())
				return true;
		}
		catch (SQLException se) 
		{
			se.printStackTrace();
		}
		finally {
			try {
				if(ps!=null)
					ps.close();
				if(rs!=null)
					rs.close();
				if(connection !=null)
					connection.close();
			}
			catch (SQLException e) {
				
			}
		}
		return false;
	}

	//view profile
		public School showpProfile(String sql,String id)
		{
			School s=null;
			connection = DBConnection.openConnection();
			PreparedStatement ps = null;
			ResultSet rs = null;
			try {
				ps = connection.prepareStatement(sql);
				ps.setString(1, id);
				rs = ps.executeQuery();
				rs.next();
				String name = rs.getString("sname");
				String email = rs.getString("email");
				String phone = rs.getString("phone");
				String affiliation=rs.getString("board");
				String city=rs.getString("city");
				String address = rs.getString("address");
				String owner=rs.getString("owner");
				String stype=rs.getString("stype");
				s= new School(name, email, phone,affiliation,city, owner,address,stype);
			} 
			catch (SQLException se) {
				se.printStackTrace();
			}
			finally {
				try {
					if(ps != null)
						ps.close();
					if(rs != null)
						rs.close();
					if(connection != null)
						connection.close();
				} catch (SQLException se) {
					se.printStackTrace();
				}
			}
			return s;
		}

		//method for updating profile
		public int editProfile(School s)
		{
			connection = DBConnection.openConnection();
			PreparedStatement ps = null;
			int status=0;
			try {
				String strupdate="update school set email=?,phone=?,city=?,address=? where id=?";
				ps=connection.prepareStatement(strupdate);
				ps.setString(1, s.getEmail());
				ps.setString(2, s.getPhone());
				ps.setString(3, s.getCity());
				ps.setString(4, s.getAddress());
				ps.setString(5, s.getId());
				status=ps.executeUpdate();
			}
			catch (SQLException se) {
				se.printStackTrace();
			}
			finally {
				try {
					if(ps != null)
						ps.close();
					if(connection != null)
						connection.close();
				} catch (SQLException se) {
					se.printStackTrace();
				}
			}
			return status;
		}

		public int compose(Msg m)
		{
			connection=DBConnection.openConnection();
			String strinsert="insert into message(senderid, receiverid, subject, message_text, date, sstatus, rstatus)values(?,?,?,?,?,?,?)";
			
			PreparedStatement ps=null;
			int status=0;
			try {
				ps=connection.prepareStatement(strinsert);
				ps.setString(1, m.getSenderid());
				ps.setString(2, m.getReceiverid());
				ps.setString(3, m.getSubject());
				ps.setString(4, m.getMessage());
				ps.setDate(5, m.getDate());
				ps.setString(6, m.getSstatus());
				ps.setString(7, m.getRstatus());
				System.out.println(ps);
				status=ps.executeUpdate();
			}
			catch (SQLException se) {
				se.printStackTrace();
			}
			finally {
				try {
					if(ps != null)
						ps.close();
					if(connection != null)
						connection.close();
				} catch (SQLException se) {
					se.printStackTrace();
				}
			}
			return status;
		}
		
		//receiver
		public ArrayList<Msg>inBox(String receiverid)
		{
		    Msg message=null;
		    ArrayList<Msg>messageList=new ArrayList<Msg>();
			String strsql="select * from message where receiverid=? and rstatus='true' ";
			connection=DBConnection.openConnection();
			
			PreparedStatement ps=null;
			ResultSet rs=null;
			try 
			{
				ps=connection.prepareStatement(strsql);
				ps.setString(1, receiverid);
				
				rs=ps.executeQuery();
				while(rs.next())
				{
					message=new Msg(rs.getInt("messageid"),rs.getString("senderid"),rs.getString("receiverid"),rs.getString("subject"),rs.getString("message_text"),rs.getDate("date"),
							rs.getString("sstatus"),rs.getString("rstatus"));
					messageList.add(message);//adding objects in the arraylist
				}
			}
			catch (SQLException se) 
			{
				se.printStackTrace();
			}
			finally {
				try {
					if(ps != null)
						ps.close();
					if(connection != null)
						connection.close();
				} catch (SQLException se) {
					se.printStackTrace();
				}
			}
			return messageList;
		}
		
		//sentitem
		public ArrayList<Msg>sentItem(String senderid)
		{
		    Msg message=null;
		    ArrayList<Msg>messageList=new ArrayList<Msg>();
			String strsql="select * from message where senderid=? and sstatus='true' ";
			connection=DBConnection.openConnection();
			
			PreparedStatement ps=null;
			ResultSet rs=null;
			try 
			{
				ps=connection.prepareStatement(strsql);
				ps.setString(1, senderid);
				
				rs=ps.executeQuery();
				while(rs.next())
				{
					message=new Msg(rs.getInt("messageid"),rs.getString("senderid"),rs.getString("receiverid"),rs.getString("subject"),rs.getString("message_text"),rs.getDate("date"),
							rs.getString("sstatus"),rs.getString("rstatus"));
					messageList.add(message);//adding objects in the arraylist
				}
			}
			catch (SQLException se) 
			{
				se.printStackTrace();
			}
			finally {
				try {
					if(ps != null)
						ps.close();
					if(connection != null)
						connection.close();
				} catch (SQLException se) {
					se.printStackTrace();
				}
			}
			return messageList;
		}
		
		//deleting messges from inboxes
		public int deleteInbox(String userid, String[] ids) {
			connection=DBConnection.openConnection();
			
			String strupdate="update message set rstatus=? where messageid=? and receiverid=?";
			PreparedStatement ps=null;
			int status=0;
			
			try 
			{
			ps=connection.prepareStatement(strupdate);
			for(int i=0;i<ids.length;i++)
			{
				ps.setString(1, "false");
				ps.setInt(2, Integer.parseInt(ids[i]));
				ps.setString(3, userid);
				ps.addBatch();//store data into buffer
			}
			int rows[]=ps.executeBatch();//batch processing
			
			for(int i=0;i<rows.length;i++)
			{
				if(rows[i]<0)
					break;
				else
					status=1;
			}
			
			} 
			catch (SQLException se) 
			{
				try {
					connection.rollback();
				} catch (SQLException e) {
					e.printStackTrace();
				}
				se.printStackTrace();
			}
			finally {
				try {
					if(ps != null)
						ps.close();
					if(connection != null)
						connection.close();
				} catch (SQLException se) {
					se.printStackTrace();
				}
			}
			return status;
		}

		//deleting sent items
		public int deleteSentitem(String userid, String[] ids) {
	connection=DBConnection.openConnection();
			
			String strupdate="update message set sstatus=? where messageid=? and senderid=?";
			PreparedStatement ps=null;
			int status=0;
			
			try 
			{
			ps=connection.prepareStatement(strupdate);
			for(int i=0;i<ids.length;i++)
			{
				ps.setString(1, "false");
				ps.setInt(2, Integer.parseInt(ids[i]));
				ps.setString(3, userid);
				ps.addBatch();//store data into buffer
			}
			int rows[]=ps.executeBatch();//batch processing
			
			for(int i=0;i<rows.length;i++)
			{
				if(rows[i]<0)
					break;
				else
					status=1;
			}
			
			} 
			catch (SQLException se) 
			{
				try {
					connection.rollback();
				} catch (SQLException e) {
					e.printStackTrace();
				}
				se.printStackTrace();
			}
			finally {
				try {
					if(ps != null)
						ps.close();
					if(connection != null)
						connection.close();
				} catch (SQLException se) {
					se.printStackTrace();
				}
			}
			return status;
		}
        //booking request
		public int bookingRequest(B_Request br)
		{
			connection=DBConnection.openConnection();
			String strinsert="insert into booking_request(userid, vehicletype, source, destination, timing, no_students)values(?,?,?,?,?,?)";
			
			PreparedStatement ps=null;
			int status=0;
			try {
				ps=connection.prepareStatement(strinsert);
				ps.setString(1, br.getUserid());
				ps.setString(2, br.getVehicletype());
				ps.setString(3, br.getSource());
				ps.setString(4, br.getDestination());
				ps.setString(5, br.getTiming());
				ps.setInt(6, br.getNo_students());
				System.out.println(ps);
				status=ps.executeUpdate();
			}
			catch (SQLException se) {
				se.printStackTrace();
			}
			finally {
				try {
					if(ps != null)
						ps.close();
					if(connection != null)
						connection.close();
				} catch (SQLException se) {
					se.printStackTrace();
				}
			}
			return status;
		}
		
		//view confirm bookings
		public ArrayList<B_Request> viewConfirm(String id)
		{
			ArrayList<B_Request> confirmlist=new ArrayList<B_Request>();
			B_Request br= null;
            String strsql="Select * from booking_request where status=? and userid=?";
			
			PreparedStatement ps = null;
			ResultSet rs=null;
			try 
			{
		    connection=DBConnection.openConnection();
			ps=connection.prepareStatement(strsql);
			ps.setString(1,"confirm");
			ps.setString(2,id);
			rs=ps.executeQuery();
			while(rs.next())
			{
				int rid=rs.getInt("requestid");
				String userid=rs.getString("userid");
				String vtype=rs.getString("vehicletype");
				String source=rs.getString("source");
				String destination=rs.getString("destination");
				String timing=rs.getString("timing");
				int nos=rs.getInt("no_students");
				String status=rs.getString("status");
				
				br=new B_Request(nos,userid,vtype,source,destination,timing,status);
				br.setRequestid(rid);
				confirmlist.add(br);
			}
			}
			catch (SQLException se)
			{
				se.printStackTrace();
			}
			finally {
				try {
				ps.close();
				connection.close();
				}
				catch (SQLException se) {
					se.printStackTrace();
				}
			}
			return confirmlist;
		}
		
		//view number of students of existing userid
		public int studentNumber(String sql,String userid,int rid)
		{
			connection = DBConnection.openConnection();
			PreparedStatement ps = null;
			ResultSet rs = null;
			int nos=0;
			try {
				ps = connection.prepareStatement(sql);
				ps.setString(1, userid);
				ps.setString(2, "confirm");
				ps.setInt(3, rid);
				rs = ps.executeQuery();
				rs.next();
			    nos=rs.getInt("no_students");
			} 
			catch (SQLException se) {
				se.printStackTrace();
			}
			finally {
				try {
					if(ps != null)
						ps.close();
					if(rs != null)
						rs.close();
					if(connection != null)
						connection.close();
				} catch (SQLException se) {
					se.printStackTrace();
				}
			}
			return nos;
		}
         
		//adding student details
		public int studentDetails(String[] student_names, String[] standards, String[] ages, String schoolname,String userid,String rid)
		{
			connection = DBConnection.openConnection();
			String strinsert="insert into student_details(student_name, standard, age, school_name, userid,requestid)values(?,?,?,?,?,?)";
			
			PreparedStatement ps = null;
			int status=0;
			try 
			{
			ps=connection.prepareStatement(strinsert);
			for(int i=0;i<student_names.length;i++)
			{
				ps.setString(1, student_names[i]);
				ps.setString(2, standards[i]);
				ps.setInt(3, Integer.parseInt(ages[i]));
				ps.setString(4, schoolname);
				ps.setString(5, userid);
				ps.setString(6, rid);
				ps.addBatch();//store data into buffer
			}
			int rows[]=ps.executeBatch();//batch processing
			
			for(int i=0;i<rows.length;i++)
			{
				if(rows[i]<0)
					break;
				else
					status=1;
			}
			
			}
			catch (SQLException se) {
				se.printStackTrace();
			}
			finally {
				try {
					if(ps != null)
						ps.close();
					if(connection != null)
						connection.close();
				} catch (SQLException se) {
					se.printStackTrace();
				}
			}
			return status;
		}
		
		//view assigned vehicle
		public ArrayList<vanmate.beans.Driver> viewAssignedVehicle(String id)
		{
			ArrayList<vanmate.beans.Driver> driverlist=new ArrayList<>();
			vanmate.beans.Driver d= null;
			S_Details sdetails=null;
			
			Vehicle vehicle;
            String strsql="Select d.dname,d.phone,d.vehicle_number,s.vehicle_number,v.device_id  from driver_details d,student_details s,vehicle_details v where d.vehicle_number=s.vehicle_number and s.userid=? and s.vehicle_number=v.vehicle_number";
			
			PreparedStatement ps = null;
			ResultSet rs=null;
			try 
			{
		    connection=DBConnection.openConnection();
			ps=connection.prepareStatement(strsql);
			ps.setString(1,id);
			rs=ps.executeQuery();
			while(rs.next())
			{
				//sd=new Student_Details();
				vehicle=new Vehicle();
				
				String drivername=rs.getString("dname");
				String phone=rs.getString("phone");
				String vnumber=rs.getString("vehicle_number");
				String device_number=rs.getString("device_id");
				
				vehicle.setDevice_id(device_number);
				
				System.out.println(device_number);
				
				d=new vanmate.beans.Driver();
				d.setDname(drivername);
				d.setPhone(phone);
				sdetails=new S_Details();
				sdetails.setVehicle_number(vnumber);
				d.setSd(sdetails);
				d.setVehicle(vehicle);

				driverlist.add(d);
			}
			}
			catch (SQLException se)
			{
				se.printStackTrace();
			}
			finally {
				try {
				ps.close();
				connection.close();
				}
				catch (SQLException se) {
					se.printStackTrace();
				}
			}
			return driverlist;
		}
		
		//checking id userid is exist or not
		public boolean checkId(String userid) 
		{
			connection=DBConnection.openConnection();
			String strsql="select id from school where id=?";
			
			PreparedStatement ps=null;
			ResultSet rs=null;
			try {
				ps=connection.prepareStatement(strsql);
				ps.setString(1,userid);
				System.out.println(ps);
				rs=ps.executeQuery();
				if(rs.next())
					return true;
			}
			catch (SQLException se) 
			{
				se.printStackTrace();
			}
			finally {
				try {
					if(ps!=null)
						ps.close();
					if(rs!=null)
						rs.close();
					if(connection !=null)
						connection.close();
				}
				catch (SQLException e) {
					
				}
			}
			return false;
		}
		
		//view charge according to the vehicle choice
		 public int viewCharge(String vtype)
		 {
			 String strsql="Select charge from vehicle_charges where vehicle_type=?";
				
				PreparedStatement ps = null;
				ResultSet rs=null;
				int charge=0;
				try 
				{
			    connection=DBConnection.openConnection();
				ps=connection.prepareStatement(strsql);
				ps.setString(1,vtype);
				rs=ps.executeQuery();
				while(rs.next())
				{
					charge=rs.getInt("charge");
				}
				}
				catch (SQLException se)
				{
					se.printStackTrace();
				}
				finally {
					try {
					ps.close();
					connection.close();
					}
					catch (SQLException se) {
						se.printStackTrace();
					}
				}
			 return charge;
		 }
		 
		//view parent details for payment
		 public School viewDetails(String id)
			{
			    String strsql="select sname,email,phone from school where id=?";
				School s=null;
				connection = DBConnection.openConnection();
				PreparedStatement ps = null;
				ResultSet rs = null;
				try {
					ps = connection.prepareStatement(strsql);
					ps.setString(1, id);
					rs = ps.executeQuery();
					rs.next();
					String name = rs.getString("sname");
					String email = rs.getString("email");
					String phone = rs.getString("phone");
					s= new School(name, email, phone);
				} 
				catch (SQLException se) {
					se.printStackTrace();
				}
				finally {
					try {
						if(ps != null)
							ps.close();
						if(rs != null)
							rs.close();
						if(connection != null)
							connection.close();
					} catch (SQLException se) {
						se.printStackTrace();
					}
				}
				return s;
			}
         
		 //inserting payment datails
		public int insertpayment(Payment p) 
		{
			connection=DBConnection.openConnection();
			
			String strinsert="insert into transaction(userid, name, email, phone, charge, transactionid,requestid)values(?,?,?,?,?,?,?)";
			
			PreparedStatement ps=null;
			int status=0;
			try {
				ps=connection.prepareStatement(strinsert);
				ps.setString(1, p.getUserid());
				ps.setString(2, p.getName());
				ps.setString(3, p.getEmail());
				ps.setString(4, p.getPhone());
				ps.setInt(5, p.getCharge());
				ps.setString(6, p.getTransactionid());
				ps.setInt(7, p.getRid());
				System.out.println(ps);
				status=ps.executeUpdate();
			}
			catch (SQLException se) {
				se.printStackTrace();
			}
			finally {
				try {
				ps.close();
				connection.close();
				}
				catch (SQLException se) {
					se.printStackTrace();
				}
			}
			return status;
		}

		//forgot password
		public int forgotpassword(String email) 
		{
			connection=DBConnection.openConnection();
			String strsql="select * from school where email=?";
			
			PreparedStatement ps=null;
			ResultSet rs=null;
			try {
				ps=connection.prepareStatement(strsql);
				ps.setString(1,email);
				System.out.println(ps);
				rs=ps.executeQuery();
				if(rs.next())
					return 1;
			}
			catch (SQLException se) 
			{
				se.printStackTrace();
			}
			finally {
				try {
					if(ps!=null)
						ps.close();
					if(rs!=null)
						rs.close();
					if(connection !=null)
						connection.close();
				}
				catch (SQLException e) {
					
				}
			}	
			return 0;
		}
		//update password
		public int resetpassword(String email, String pass) 
		{
			connection = DBConnection.openConnection();
			PreparedStatement ps = null;
			int status=0;
			try {
				String strupdate="update school set password=? where email=?";
				ps=connection.prepareStatement(strupdate);
				ps.setString(1, pass);
				ps.setString(2, email);
				status=ps.executeUpdate();
			}
			catch (SQLException se) {
				se.printStackTrace();
			}
			finally {
				try {
					if(ps != null)
						ps.close();
					if(connection != null)
						connection.close();
				} catch (SQLException se) {
					se.printStackTrace();
				}
			}
			return status;
		}
		
		//checking receiver id
		public boolean checkReceiverId(String receiverid) 
		{
			connection=DBConnection.openConnection();
			String strsql="select  a.Id,s.id,p.id from admin_details a, school s,parent p where a.Id=? or s.id=? or p.id=?";
			
			PreparedStatement ps=null;
			ResultSet rs=null;
			try {
				ps=connection.prepareStatement(strsql);
				ps.setString(1,receiverid);
				ps.setString(2,receiverid);
				ps.setString(3,receiverid);
				System.out.println(ps);
				rs=ps.executeQuery();
				if(rs.next())
					return false;
			}
			catch (SQLException se) 
			{
				se.printStackTrace();
			}
			finally {
				try {
					if(ps!=null)
						ps.close();
					if(rs!=null)
						rs.close();
					if(connection !=null)
						connection.close();
				}
				catch (SQLException e) {
					e.printStackTrace();
				}
			}
			return true;
		}
		
		//student details check
		public boolean checkStudentdetails(int rid)
		{
			connection=DBConnection.openConnection();
			String strsql="Select * from student_details where requestid=?";

			PreparedStatement ps=null;
			ResultSet rs=null;
			try {
				ps=connection.prepareStatement(strsql);
				ps.setInt(1, rid);
				rs=ps.executeQuery();
				if(rs.next())
					return true;
			   }
			catch (SQLException se) 
			{
				se.printStackTrace();
			}
			finally {
				try {
					if(ps!=null)
						ps.close();
					if(rs!=null)
						rs.close();
					if(connection !=null)
						connection.close();
				}
				catch (SQLException e) {
					e.printStackTrace();
				}
			}
			return false;
		}
		
		//payment check
		public boolean checkpayment(int rid)
		{
			connection=DBConnection.openConnection();
			String strsql="Select * from transaction where requestid=?";

			PreparedStatement ps=null;
			ResultSet rs=null;
			try {
				ps=connection.prepareStatement(strsql);
				ps.setInt(1, rid);
				rs=ps.executeQuery();
				if(rs.next())
					return true;
			   }
			catch (SQLException se) 
			{
				se.printStackTrace();
			}
			finally {
				try {
					if(ps!=null)
						ps.close();
					if(rs!=null)
						rs.close();
					if(connection !=null)
						connection.close();
				}
				catch (SQLException e) {
					e.printStackTrace();
				}
			}
			return false;
		}
		//showing message
				public Msg viewMessage(String strsql,int messageid)
				{
					Msg message=null;
					PreparedStatement ps=null;
					ResultSet rs=null;
					try {
						connection=DBConnection.openConnection();
						ps=connection.prepareStatement(strsql);
						ps.setInt(1, messageid);
						rs=ps.executeQuery();
						rs.next();
						message=new Msg();
						message.setSenderid(rs.getString("senderid"));
						message.setDate(rs.getDate("date"));
						message.setMessage(rs.getString("message_text"));
					}
					catch (SQLException se) {
						se.printStackTrace();
					}
					finally {
						try {
						ps.close();
						connection.close();
						}
						catch (SQLException se) {
							se.printStackTrace();
						}
					}
					return message;
				}
		
}
