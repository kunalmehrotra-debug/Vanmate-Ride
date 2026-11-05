package vanmate.beans;

import java.sql.Date;

public class Parent 
{
	private String id, password, name, email, phone, city, address;
	private Date date;
	public Parent() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Parent(String id, String password, String name, String email, String phone, String city, String address,
			Date date) {
		super();
		this.id = id;
		this.password = password;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.city = city;
		this.address = address;
		this.date = date;
	}
	public Parent(String id, String password) {
		super();
		this.id = id;
		this.password = password;
	}
	
	public Parent(String name, String email, String phone,String city, String address) {
		super();
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.city= city;
		this.address = address;
	}
	public Parent(String name, String email, String phone) {
		super();
		this.name = name;
		this.email = email;
		this.phone = phone;
	}
	public Parent(String id, String name, String email, String phone, String city, String address) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.city = city;
		this.address = address;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	
	
}
