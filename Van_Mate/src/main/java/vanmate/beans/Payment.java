package vanmate.beans;

public class Payment 
{
	private String userid, name, email, phone, transactionid;
	 private int charge,rid;
	 
	public Payment() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Payment(String userid, String name, String email, String phone, String transactionid, int charge) {
		super();
		this.userid = userid;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.transactionid = transactionid;
		this.charge = charge;
	}

	public int getRid() {
		return rid;
	}

	public void setRid(int rid) {
		this.rid = rid;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
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

	public String getTransactionid() {
		return transactionid;
	}

	public void setTransactionid(String transactionid) {
		this.transactionid = transactionid;
	}

	public int getCharge() {
		return charge;
	}

	public void setCharge(int charge) {
		this.charge = charge;
	}
}
