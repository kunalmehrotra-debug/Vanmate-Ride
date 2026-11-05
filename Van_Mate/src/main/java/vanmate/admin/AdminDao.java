package vanmate.admin;
import java.sql.*;
import java.util.ArrayList;

import vanmate.beans.Admin_Details;
import vanmate.beans.B_Request;
import vanmate.beans.Driver;
import vanmate.beans.Feedback;
import vanmate.beans.Msg;
import vanmate.beans.Notice;
import vanmate.beans.Parent;
import vanmate.beans.Query;
import vanmate.beans.S_Details;
import vanmate.beans.School;
import vanmate.beans.Vehicle;
import vanmate.beans.Vehicle_Charges;
import vanmate.dbutils.*;

public class AdminDao 
{
private	Connection connection;
public AdminDao() 
{
	connection=DBConnection.openConnection();
	System.out.println("Connection established");
}

public boolean admin_login(String id,String pass) 
{
	String strsql="select * from admin_details where Id=? and Pass=?";
	
	PreparedStatement ps=null;
	ResultSet rs=null;
	try {
		ps=connection.prepareStatement(strsql);
		ps.setString(1,id);
		ps.setString(2, pass);
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
		}
		catch (SQLException e) {
			
		}
	}
	return false;
}

//view all contacts method
public ArrayList<Query> allquery()
{
	ArrayList<Query>querylist=new ArrayList<Query>();
	Query c=null;
	String strsql="Select * from user_query";
	
	PreparedStatement ps=null;
	ResultSet rs=null;
	
	try 
	{
	ps=connection.prepareStatement(strsql);
	rs=ps.executeQuery();
	while(rs.next())
	{
		String name=rs.getString("user_name");
		String email=rs.getString("user_email");
		String phone=rs.getString("user_phone");
		String doubt=rs.getString("user_doubt");
		int sr_number=rs.getInt("serial_number");
	     c=new Query(name,email,phone,doubt);
	     c.setSerial_number(sr_number);
	     querylist.add(c);
	}
	} 
	catch (SQLException se) 
	{
		se.printStackTrace();
	}
	return querylist;
}

//view all feedbacks method
public ArrayList<Feedback> allfeedback()
{
	ArrayList<Feedback> feedlist=new ArrayList<Feedback>();
	Feedback f=null;
	String strsql="Select * from feedback";
	
	PreparedStatement ps = null;
	ResultSet rs=null;
	
	try 
	{
	ps=connection.prepareStatement(strsql);
	rs=ps.executeQuery();
	while(rs.next())
	{
		String name=rs.getString("name");
		String email=rs.getString("email");
		String phone=rs.getString("phone");
		String feedback=rs.getString("feedback_text");
		String rating=rs.getString("rating");
		int id=rs.getInt("id");
		f=new Feedback(name,email,phone,feedback,rating);
		f.setId(id);
		feedlist.add(f);
	}
	}
	catch (SQLException se)
	{
		se.printStackTrace();
	}
	return feedlist;
}

//view profile
	public Admin_Details showpProfile(String sql,String id)
	{
		Admin_Details ad=null;
		connection = DBConnection.openConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			ps = connection.prepareStatement(sql);
			ps.setString(1, id);
			rs = ps.executeQuery();
			rs.next();
			String name = rs.getString("Name");
			String email = rs.getString("email");
			String phone = rs.getString("phone");
			String aid=rs.getString("Id");
			String pass=rs.getString("Pass");
			ad= new Admin_Details(aid, pass, name,email, phone);
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
		return ad;
	}
	
	//method for updating profile
		public int editProfile(Admin_Details ad)
		{
			connection = DBConnection.openConnection();
			PreparedStatement ps = null;
			int status=0;
			try {
				String strupdate="update admin_details set email=?,phone=?,pass=? where id=?";
				ps=connection.prepareStatement(strupdate);
				ps.setString(1, ad.getEmail());
				ps.setString(2, ad.getPhone());
				ps.setString(3, ad.getPass());
				ps.setString(4, ad.getId());
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

		public int addDriver(Driver dd) 
		{
			connection=DBConnection.openConnection();
			
			String strinsert="insert into driver_details(dname, phone, experience, licenseno, validity, address, photo, date)values(?,?,?,?,?,?,?,?)";

			PreparedStatement ps=null;
			int status=0;
			try {
				ps=connection.prepareStatement(strinsert);
				ps.setString(1, dd.getDname());
				ps.setString(2, dd.getPhone());
				ps.setString(3, dd.getExperience());
				ps.setString(4, dd.getLicenseno());
				ps.setString(5, dd.getValidity());
				ps.setString(6, dd.getAddress());
				ps.setString(7, dd.getPhoto());
				ps.setDate(8, dd.getDate());
				
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
         
		//adding vehicle
		public int addVehicle(Vehicle v) 
		{
            connection=DBConnection.openConnection();
			
			String strinsert="insert into vehicle_details(vehicle_type, vehicle_number, vehicle_description, date)values(?,?,?,?)";

			PreparedStatement ps=null;
			int status=0;
			try {
				ps=connection.prepareStatement(strinsert);
				ps.setString(1,v.getVehicle_type() );
				ps.setString(2,v.getVehicle_number() );
				ps.setString(3, v.getVehicle_description());
				ps.setDate(4, v.getDate());
				
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

		//view vehicle
		public ArrayList<Vehicle> allvehicle()
		{
			ArrayList<Vehicle> vehiclelist=new ArrayList<Vehicle>();
			Vehicle v=null;
			String strsql="Select * from vehicle_details";
			
			PreparedStatement ps = null;
			ResultSet rs=null;
			
			try 
			{
			ps=connection.prepareStatement(strsql);
			rs=ps.executeQuery();
			while(rs.next())
			{
				String vtype=rs.getString("vehicle_type");
				String vnumber=rs.getString("vehicle_number");
				String vdes=rs.getString("vehicle_description");
				Date d=rs.getDate("date");
				v=new Vehicle(vtype,vnumber,vdes,d);
				vehiclelist.add(v);
			}
			}
			catch (SQLException se)
			{
				se.printStackTrace();
			}
			return vehiclelist;
		}	
		
		//view driver
		public ArrayList<Driver> alldriver()
		{
			ArrayList<Driver> driverlist=new ArrayList<Driver>();
			Driver dd=null;
			String strsql="Select * from driver_details";
			
			PreparedStatement ps = null;
			ResultSet rs=null;
			
			try 
			{
			ps=connection.prepareStatement(strsql);
			rs=ps.executeQuery();
			while(rs.next())
			{
				int id=rs.getInt("id");
				String dname=rs.getString("dname");
				String phone=rs.getString("phone");
				String experience=rs.getString("experience");
				String lnumber=rs.getString("licenseno");
				String validity=rs.getString("validity");
				String address=rs.getString("address");
				String photo=rs.getString("photo");
				Date d=rs.getDate("date");
				dd=new Driver(dname,phone,experience,lnumber,address,photo,validity,d);
				dd.setId(id);
			    driverlist.add(dd);
			}
			}
			catch (SQLException se)
			{
				se.printStackTrace();
			}
			return driverlist;
		}
        //inserting notice
		public int insertNotice(Notice n) 
		{
			 connection=DBConnection.openConnection();
				
				String strinsert="insert into notice(topic, contents, date)values(?,?,?)";

				PreparedStatement ps=null;
				int status=0;
				try {
					ps=connection.prepareStatement(strinsert);
					ps.setString(1,n.getTopic() );
					ps.setString(2,n.getContent());
					ps.setDate(3, n.getDate());
					
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
		//view notice
		public ArrayList<Notice> allnotice()
		{
			ArrayList<Notice> noticelist=new ArrayList<Notice>();
			Notice n=null;
			String strsql="Select * from notice";
			PreparedStatement ps = null;
			ResultSet rs=null;
			
			try 
			{
		    connection=DBConnection.openConnection();
			ps=connection.prepareStatement(strsql);
			rs=ps.executeQuery();
			while(rs.next())
			{
				String topic=rs.getString("topic");
				String content=rs.getString("contents");
				Date d=rs.getDate("date");
				n=new Notice(topic,content,d);
				noticelist.add(n);
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
			return noticelist;
		}
		
		//viewing charges
		public ArrayList<Vehicle_Charges> viewcharge()
		{
			ArrayList<Vehicle_Charges> vehiclelist=new ArrayList<Vehicle_Charges>();
			Vehicle_Charges vc= null;
            String strsql="Select * from vehicle_charges";
			
			PreparedStatement ps = null;
			ResultSet rs=null;
			try 
			{
		    connection=DBConnection.openConnection();
			ps=connection.prepareStatement(strsql);
			rs=ps.executeQuery();
			while(rs.next())
			{
				String type=rs.getString("vehicle_type");
				String charge=rs.getString("charge");
				String description=rs.getString("description");
				vc=new Vehicle_Charges(type,charge,description);
				vehiclelist.add(vc);
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
			return vehiclelist;
		}
		
		//view available driver
				public ArrayList<Driver> availabledriver()
				{
					ArrayList<Driver> driverlist=new ArrayList<Driver>();
					Driver ad=null;
					String strsql="Select * from driver_details where vehicle_number is null ";
					
					PreparedStatement ps = null;
					ResultSet rs=null;
					
					try 
					{
					connection=DBConnection.openConnection();
					ps=connection.prepareStatement(strsql);
					rs=ps.executeQuery();
					while(rs.next())
					{
						String dname=rs.getString("dname");
						int id=rs.getInt("id");
						ad=new Driver(dname,id);
						System.out.println(dname + id);
					    driverlist.add(ad);
					}
					}
					catch (SQLException se)
					{
						se.printStackTrace();
					}
					return driverlist;
				}
				
				//view available vehicles
				public ArrayList<Vehicle> availablevehicle()
				{
					ArrayList<Vehicle> vehiclelist=new ArrayList<Vehicle>();
					Vehicle v=null;
					String strsql="Select * from vehicle_details where status is null ";
					
					PreparedStatement ps = null;
					ResultSet rs=null;
					
					try 
					{
					ps=connection.prepareStatement(strsql);
					rs=ps.executeQuery();
					while(rs.next())
					{
						String vtype=rs.getString("vehicle_type");
						String vnumber=rs.getString("vehicle_number");
						String vdes=rs.getString("vehicle_description");
						Date d=rs.getDate("date");
						v=new Vehicle(vtype,vnumber,vdes,d);
						vehiclelist.add(v);
					}
					}
					catch (SQLException se)
					{
						se.printStackTrace();
					}
					return vehiclelist;
				}	
				
           //vehicle assignment
				public int assignvehicle(int driverid, String vehicleno)
				{
					connection=DBConnection.openConnection();
					
					String strinsert="insert into assign_vehicle(vehicleno, driverid)values(?,?)";

					PreparedStatement ps=null;
					int status=0;
					try {
						ps=connection.prepareStatement(strinsert);
						ps.setString(1, vehicleno);
						ps.setInt(2, driverid);
						System.out.println(ps);
						status=ps.executeUpdate();
					}
					catch (SQLException se) {
						se.printStackTrace();
					}
					//updation
					
					PreparedStatement ps1 = null;
					int status1=0;
					PreparedStatement ps2 = null;
					int status2=0;
					try {
						String strupdate="update driver_details set vehicle_number=? where id=?";
						ps1=connection.prepareStatement(strupdate);
						ps1.setString(1, vehicleno);
						ps1.setInt(2, driverid);
						status1=ps1.executeUpdate();
						String strupdate2="update vehicle_details set status=? where vehicle_number=?";
						ps2=connection.prepareStatement(strupdate2);
						ps2.setString(1, "busy");
						ps2.setString(2, vehicleno);
						status2=ps2.executeUpdate();
					}
					catch (SQLException se) {
						se.printStackTrace();
						
					}
					finally {
						try {
							if(ps1 != null)
								ps1.close();
							if(connection != null)
								connection.close();
						} catch (SQLException se) {
							se.printStackTrace();
						}
					}
					if(status >0 && status1>0 && status2>0)
					{
						return status;
					}
					return 0;
				}
				
				//view pending requests
				public ArrayList<B_Request> viewRequest()
				{
					ArrayList<B_Request> requestlist=new ArrayList<B_Request>();
					B_Request br= null;
		            String strsql="Select * from booking_request where status is null ";
					
					PreparedStatement ps = null;
					ResultSet rs=null;
					try 
					{
				    connection=DBConnection.openConnection();
					ps=connection.prepareStatement(strsql);
					rs=ps.executeQuery();
					while(rs.next())
					{
						String userid=rs.getString("userid");
						String vtype=rs.getString("vehicletype");
						String source=rs.getString("source");
						String destination=rs.getString("destination");
						String timing=rs.getString("timing");
						int nos=rs.getInt("no_students");
						
						br=new B_Request(nos,userid,vtype,source,destination,timing);
						requestlist.add(br);
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
					return requestlist;
				}
                 
				//cofirming booking request
				public int confirmRequest(String id) 
				{
					String strupdate="update booking_request set status=? where userid=?";
					PreparedStatement ps = null;
					int status=0;
					try {
						ps=connection.prepareStatement(strupdate);
						ps.setString(1, "confirm");
						ps.setString(2, id);
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
				
				//view confirm requests
				public ArrayList<B_Request> viewConfirm()
				{
					ArrayList<B_Request> confirmlist=new ArrayList<B_Request>();
					B_Request br= null;
		            String strsql="Select * from booking_request where status=?";
					
					PreparedStatement ps = null;
					ResultSet rs=null;
					try 
					{
				    connection=DBConnection.openConnection();
					ps=connection.prepareStatement(strsql);
					ps.setString(1,"confirm");
					rs=ps.executeQuery();
					while(rs.next())
					{
						String userid=rs.getString("userid");
						String vtype=rs.getString("vehicletype");
						String source=rs.getString("source");
						String destination=rs.getString("destination");
						String timing=rs.getString("timing");
						int nos=rs.getInt("no_students");
						
						br=new B_Request(nos,userid,vtype,source,destination,timing);
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
				
				//view students whose status is null
				public ArrayList<S_Details> viewStudents()
				{
					ArrayList<S_Details> studentlist=new ArrayList<S_Details>();
					S_Details sd= null;
		            String strsql="Select * from student_details where status is null";
					
					PreparedStatement ps = null;
					ResultSet rs=null;
					try 
					{
				    connection=DBConnection.openConnection();
					ps=connection.prepareStatement(strsql);
					rs=ps.executeQuery();
					while(rs.next())
					{
						String studentname=rs.getString("student_name");
						String standard=rs.getString("standard");
						int age=rs.getInt("age");
						String school=rs.getString("school_name");
						String userid=rs.getString("userid");
						int rid=rs.getInt("requestid");
						sd=new S_Details(studentname,standard,school,userid,age,rid);
						studentlist.add(sd);
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
					return studentlist;
				}
				//for getting vehicle type of specified request id
				String vtype;
				public String getVehicletype(int rid)
				{
					 String strsql="Select * from booking_request where requestid=?";
						
						PreparedStatement ps = null;
						ResultSet rs=null;
						try 
						{
					    connection=DBConnection.openConnection();
						ps=connection.prepareStatement(strsql);
						ps.setInt(1, rid);
						rs=ps.executeQuery();
						rs.next();
						vtype=rs.getString("vehicletype");
						}
						catch (SQLException se)
						{
							se.printStackTrace();
						}
						return vtype;
				}
				
				//for getting specific available vehicles specified at given requestid
				public ArrayList<Vehicle> requestedVehicle()
				{
					ArrayList<Vehicle> vehiclelist=new ArrayList<Vehicle>();
					Vehicle v=null;
					String strsql="Select * from vehicle_details where vehicle_type=? and status=?";
					
					PreparedStatement ps = null;
					ResultSet rs=null;
					
					try 
					{
					ps=connection.prepareStatement(strsql);
					ps.setString(1, vtype);
					ps.setString(2, "busy");
					rs=ps.executeQuery();
					while(rs.next())
					{
						String vnumber=rs.getString("vehicle_number");
                        v=new Vehicle(vnumber);
						vehiclelist.add(v);
					}
					}
					catch (SQLException se)
					{
						se.printStackTrace();
					}
					return vehiclelist;
				}	
				
				//assigning vehichle to students
				public int assignStudentVehicle(int rid,String vnumber)
				{
					PreparedStatement ps = null;
					int status=0;
					try {
						String strupdate="update student_details set vehicle_number=? , status=? where requestid=?";
						ps=connection.prepareStatement(strupdate);
						ps.setString(1, vnumber);
						ps.setString(2, "confirm");
						ps.setInt(3, rid);
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
				
				//view students whose status is not confirm
				public ArrayList<S_Details> viewUnconfirmed()
				{
					ArrayList<S_Details> studentlist=new ArrayList<S_Details>();
					S_Details sd=null;
					String strsql="Select * from student_details where status is null and vehicle_number is null";
					
					PreparedStatement ps = null;
					ResultSet rs=null;
					
					try 
					{
					ps=connection.prepareStatement(strsql);
					rs=ps.executeQuery();
					while(rs.next())
					{
						String sname=rs.getString("student_name");
						String sclass=rs.getString("standard");
						int age=rs.getInt("age");
						String schoolname=rs.getString("school_name");
                        sd=new S_Details(sname,sclass,schoolname,age);
						studentlist.add(sd);
					}
					}
					catch (SQLException se)
					{
						se.printStackTrace();
					}
					return studentlist;
				}
				
				//view all parents
				public ArrayList<Parent> allParent()
				{
					ArrayList<Parent>parentlist=new ArrayList<Parent>();
					Parent p=null;
					String strsql="Select * from Parent";
					
					PreparedStatement ps=null;
					ResultSet rs=null;
					
					try 
					{
					ps=connection.prepareStatement(strsql);
					rs=ps.executeQuery();
					while(rs.next())
					{
						String id=rs.getString("id");
						String name=rs.getString("name");
						String email=rs.getString("email");
						String phone=rs.getString("phone");
						String address=rs.getString("address");
						String city=rs.getString("city");
			
					     p=new Parent(id,name,email,phone,city,address);
					     parentlist.add(p);
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
					return parentlist;
				}
				//view all schools
				public ArrayList<School> allSchool()
				{
					ArrayList<School>schoolist=new ArrayList<School>();
					School s=null;
					String strsql="Select * from School";
					
					PreparedStatement ps=null;
					ResultSet rs=null;
					
					try 
					{
					ps=connection.prepareStatement(strsql);
					rs=ps.executeQuery();
					while(rs.next())
					{
						String id=rs.getString("id");
						String sname=rs.getString("sname");
						String email=rs.getString("email");
						String phone=rs.getString("phone");
						String address=rs.getString("address");
						String city=rs.getString("city");
			
					     s=new School(id,sname,email,phone,city,address);
					     schoolist.add(s);
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
					return schoolist;
				}
}
