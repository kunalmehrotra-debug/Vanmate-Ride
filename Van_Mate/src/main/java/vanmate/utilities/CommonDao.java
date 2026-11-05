package vanmate.utilities;
import java.sql.*;
import java.util.ArrayList;

import vanmate.dbutils.DBConnection;
import vanmate.beans.Feedback;
import vanmate.beans.Notice;
import vanmate.beans.Query;
public class CommonDao
{
	
private Connection connection;
	public CommonDao() 
	{
		connection=DBConnection.openConnection();//connection establish
	}

	public int addQuery(Query q)
	{
		String strinsert="insert into user_query(user_name, user_email, user_phone, user_doubt, date)values(?,?,?,?,?)";
		
		java.util.Date d=new java.util.Date();
		long dt=d.getTime();//long value of today's date
		java.sql.Date sd=new java.sql.Date(dt);
		System.out.println("Sql date is "+sd);
		
		PreparedStatement ps=null;
		int status=0;
		try
		{
			ps=connection.prepareStatement(strinsert);
			ps.setString(1,q.getUser_name());
			ps.setString(2,q.getUser_email());
			ps.setString(3,q.getUser_phone());
			ps.setString(4,q.getUser_doubt());
			ps.setDate(5, sd);
			
		   status=ps.executeUpdate(); 
		   
		}
		catch (SQLException se)
		{
			se.printStackTrace();
		}
		return status;
	}
	
	public int addfeedback(Feedback fe)
	{
		String strinsert="insert into feedback(name, email, phone, feedback_text, rating,date)values(?,?,?,?,?,?)";
		
		java.util.Date d=new java.util.Date();
		long dt=d.getTime();
		java.sql.Date sd=new java.sql.Date(dt);
		
		PreparedStatement ps=null;
		int status=0;
		try 
		{
		ps=connection.prepareStatement(strinsert);
		ps.setString(1,fe.getName());
		ps.setString(2,fe.getEmail());
		ps.setString(3,fe.getPhone());
		ps.setString(4,fe.getFeedback_text());
		ps.setString(5,fe.getRating());
		ps.setDate(6,sd);
		status=ps.executeUpdate();
		} 
		catch (SQLException se) 
		{
			se.printStackTrace();
		}
		return status;
	}
	
	//viewing notice
	public ArrayList<Notice> viewNotice()
	{
		ArrayList<Notice> notice=new ArrayList<Notice>();
		Notice n=null;
		String strsql="select * from notice ORDER BY date DESC LIMIT 5";
				
		PreparedStatement ps=null;
		ResultSet rs=null;
		
		try 
		{
		ps=connection.prepareStatement(strsql);
		rs=ps.executeQuery();
		while(rs.next())
		{
			String content=rs.getString("contents");
			n=new Notice(content);
		    notice.add(n);
		}
		} 
		catch (SQLException se) 
		{
			se.printStackTrace();
		}
		return notice;
	}
	
}
