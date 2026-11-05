package vanmate.dbutils;
import java.sql.*;
import java.util.*;
public class DBConnection
{
private static  Connection connection;
private static ResourceBundle rb;//to read info from property file
public static Connection openConnection()
{
	try{
		rb=ResourceBundle.getBundle("vanmate/dbutils/dbinfo");
		String dbid=rb.getString("db.id");
		String dbpass=rb.getString("db.pass");
		String dburl=rb.getString("db.url");
		System.out.println(dbid);
		
		Class.forName("com.mysql.cj.jdbc.Driver");
		//connection=DriverManager.getConnection("jdbc:mysql://localhost:3306/vanmatedb","root","root");
		connection=DriverManager.getConnection(dburl,dbid,dbpass);
	}
	catch (ClassNotFoundException|SQLException cs) 
	{
	System.out.println(cs);
	}
	return connection;
}

/*
 * public static void main(String[] args) { Connection cn=openConnection();
 * System.out.println(cn); }
 */

public static void closeConnection()
{
	if(connection!=null)
		try 
	    {
			connection.close();
			System.out.println("Connection is getting closed");
		}
	catch (SQLException se)
	{
		se.printStackTrace();
	}
}

}
