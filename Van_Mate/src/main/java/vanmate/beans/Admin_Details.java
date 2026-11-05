package vanmate.beans;

public class Admin_Details 
{
private String Id, Pass, Name, email, phone;
public Admin_Details() 
{
	
}

public Admin_Details(String id, String pass)
{
	super();
	Id = id;
	Pass = pass;
}

public Admin_Details(String id, String pass, String name, String email, String phone) {
	super();
	Id = id;
	Pass = pass;
	Name = name;
	this.email = email;
	this.phone = phone;
}

public String getId() {
	return Id;
}

public void setId(String id) {
	Id = id;
}

public String getPass() {
	return Pass;
}

public void setPass(String pass) {
	Pass = pass;
}

public String getName() {
	return Name;
}

public void setName(String name) {
	Name = name;
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}

public String getPhone() {
	return phone;
}

public void setPhone(String phone) {
	this.phone = phone;
}

}
