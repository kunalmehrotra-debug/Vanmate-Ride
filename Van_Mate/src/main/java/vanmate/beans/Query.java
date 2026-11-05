package vanmate.beans;

public class Query 
{
private	String user_name, user_email, user_phone, user_doubt;
private int serial_number;
public Query() {
	
}

public Query(String user_name, String user_email, String user_phone, String user_doubt) {
	this.user_name = user_name;
	this.user_email = user_email;
	this.user_phone = user_phone;
	this.user_doubt = user_doubt;
}


public String getUser_name() {
	return user_name;
}

public void setUser_name(String user_name) {
	this.user_name = user_name;
}

public String getUser_email() {
	return user_email;
}

public void setUser_email(String user_email) {
	this.user_email = user_email;
}

public String getUser_phone() {
	return user_phone;
}

public void setUser_phone(String user_phone) {
	this.user_phone = user_phone;
}

public String getUser_doubt() {
	return user_doubt;
}

public void setUser_doubt(String user_doubt) {
	this.user_doubt = user_doubt;
}
public int getSerial_number() {
	return serial_number;
}

public void setSerial_number(int serial_number) {
	this.serial_number = serial_number;
}


}
