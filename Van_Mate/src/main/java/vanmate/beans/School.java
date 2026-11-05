package vanmate.beans;

import java.sql.Date;

public class School {

	private String id,password,sname,email,phone,board,city,owner,address,stype;
	private Date date;
	private double latitude,longitude;
	
	public School() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public School(String id, String password, String sname, String email, String phone, String board, String city,
			String owner, String address, String stype, Date date, double latitude, double longitude) {
		super();
		this.id = id;
		this.password = password;
		this.sname = sname;
		this.email = email;
		this.phone = phone;
		this.board = board;
		this.city = city;
		this.owner = owner;
		this.address = address;
		this.stype = stype;
		this.date = date;
		this.latitude = latitude;
		this.longitude = longitude;
	}

	public School(String id, String password) {
		super();
		this.id = id;
		this.password = password;
	}

	public School(String sname, String email, String phone, String board, String city, String owner, String address,
			String stype) {
		super();
		this.sname = sname;
		this.email = email;
		this.phone = phone;
		this.board = board;
		this.city = city;
		this.owner = owner;
		this.address = address;
		this.stype = stype;
	}
	public School(String sname, String email, String phone) {
		super();
		this.sname = sname;
		this.email = email;
		this.phone = phone;
	}
	public School(String id, String sname, String email, String phone, String city, String address) {
		super();
		this.id = id;
		this.sname = sname;
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
	public String getSname() {
		return sname;
	}
	public void setSname(String sname) {
		this.sname = sname;
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
	public String getBoard() {
		return board;
	}
	public void setBoard(String board) {
		this.board = board;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getStype() {
		return stype;
	}
	public void setStype(String stype) {
		this.stype = stype;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	
	
}
