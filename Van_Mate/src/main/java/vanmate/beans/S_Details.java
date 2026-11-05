package vanmate.beans;

public class S_Details 
{
	String student_name, standard, school_name, userid, status, vehicle_number;
	int stid, age, requestid;
	public S_Details() {
		super();
		// TODO Auto-generated constructor stub
	}
	public S_Details(String student_name, String standard, String school_name, String userid, String status,
			String vehicle_number, int age, int requestid) {
		super();
		this.student_name = student_name;
		this.standard = standard;
		this.school_name = school_name;
		this.userid = userid;
		this.status = status;
		this.vehicle_number = vehicle_number;
		this.age = age;
		this.requestid = requestid;
	}
	public S_Details(String student_name, String standard, String school_name, String userid, int age, int requestid) {
		super();
		this.student_name = student_name;
		this.standard = standard;
		this.school_name = school_name;
		this.userid = userid;
		this.age = age;
		this.requestid = requestid;
	}
	public S_Details(String student_name, String standard, String school_name, int age) {
		super();
		this.student_name = student_name;
		this.standard = standard;
		this.school_name = school_name;
		this.age = age;
	}
	
	public String getStudent_name() {
		return student_name;
	}
	public void setStudent_name(String student_name) {
		this.student_name = student_name;
	}
	public String getStandard() {
		return standard;
	}
	public void setStandard(String standard) {
		this.standard = standard;
	}
	public String getSchool_name() {
		return school_name;
	}
	public void setSchool_name(String school_name) {
		this.school_name = school_name;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getVehicle_number() {
		return vehicle_number;
	}
	public void setVehicle_number(String vehicle_number) {
		this.vehicle_number = vehicle_number;
	}
	public int getStid() {
		return stid;
	}
	public void setStid(int stid) {
		this.stid = stid;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public int getRequestid() {
		return requestid;
	}
	public void setRequestid(int requestid) {
		this.requestid = requestid;
	}

	
}
