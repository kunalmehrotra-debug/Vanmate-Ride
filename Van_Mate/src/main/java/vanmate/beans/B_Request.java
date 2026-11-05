package vanmate.beans;

public class B_Request 
{
	int requestid, no_students;
	private String userid, vehicletype, source, destination, timing,status;
	public B_Request() {
		super();
		// TODO Auto-generated constructor stub
	}
	public B_Request(int no_students, String userid, String vehicletype, String source, String destination,
			String timing) {
		super();
		this.no_students = no_students;
		this.userid = userid;
		this.vehicletype = vehicletype;
		this.source = source;
		this.destination = destination;
		this.timing = timing;
	}
	public B_Request(int no_students, String userid, String vehicletype, String source, String destination,
			String timing, String status) {
		super();
		this.no_students = no_students;
		this.userid = userid;
		this.vehicletype = vehicletype;
		this.source = source;
		this.destination = destination;
		this.timing = timing;
		this.status = status;
	}
	
	public int getRequestid() {
		return requestid;
	}
	public void setRequestid(int requestid) {
		this.requestid = requestid;
	}
	public int getNo_students() {
		return no_students;
	}
	public void setNo_students(int no_students) {
		this.no_students = no_students;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getVehicletype() {
		return vehicletype;
	}
	public void setVehicletype(String vehicletype) {
		this.vehicletype = vehicletype;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getDestination() {
		return destination;
	}
	public void setDestination(String destination) {
		this.destination = destination;
	}
	public String getTiming() {
		return timing;
	}
	public void setTiming(String timing) {
		this.timing = timing;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
}
