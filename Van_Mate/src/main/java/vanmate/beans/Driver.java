package vanmate.beans;

import java.sql.Date;


public class Driver 
{
	private String dname, phone, experience, licenseno,address, photo,validity;
	private int id;
	 Date  date;
	 private S_Details sd;
	 
	 private Vehicle vehicle;
	 
	public Vehicle getVehicle() {
		return vehicle;
	}
	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}
	public S_Details getSd() {
		return sd;
	}
	public void setSd(S_Details sd) {
		this.sd = sd;
	}
	
	public Driver() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Driver(String dname, String phone, String experience, String licenseno, String address, String photo,
			String validity, Date date) {
		super();
		this.dname = dname;
		this.phone = phone;
		this.experience = experience;
		this.licenseno = licenseno;
		this.address = address;
		this.photo = photo;
		this.validity = validity;
		this.date = date;
	}
	
	public Driver(String dname, int id) {
		super();
		this.dname = dname;
		this.id = id;
	}
	public String getDname() {
		return dname;
	}
	public void setDname(String dname) {
		this.dname = dname;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getExperience() {
		return experience;
	}
	public void setExperience(String experience) {
		this.experience = experience;
	}
	public String getLicenseno() {
		return licenseno;
	}
	public void setLicenseno(String licenseno) {
		this.licenseno = licenseno;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getValidity() {
		return validity;
	}
	public void setValidity(String validity) {
		this.validity = validity;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	
	
}
