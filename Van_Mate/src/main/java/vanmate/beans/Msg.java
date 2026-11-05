package vanmate.beans;

import java.sql.Date;

public class Msg {
	
private int messageid;
private String senderid,receiverid,subject,message,rstatus,sstatus;
 Date date;
public Msg() {
	super();
	// TODO Auto-generated constructor stub
}
public Msg(int messageid, String senderid, String receiverid, String subject, String message, Date date,
		String rstatus, String sstatus) {
	super();
	this.messageid = messageid;
	this.senderid = senderid;
	this.receiverid = receiverid;
	this.subject = subject;
	this.message = message;
	this.date = date;
	this.rstatus = rstatus;
	this.sstatus = sstatus;
}


public int getMessageid() {
	return messageid;
}
public void setMessageid(int messageid) {
	this.messageid = messageid;
}
public String getSenderid() {
	return senderid;
}
public void setSenderid(String senderid) {
	this.senderid = senderid;
}
public String getReceiverid() {
	return receiverid;
}
public void setReceiverid(String receiverid) {
	this.receiverid = receiverid;
}
public String getSubject() {
	return subject;
}
public void setSubject(String subject) {
	this.subject = subject;
}
public String getMessage() {
	return message;
}
public void setMessage(String message) {
	this.message = message;
}
public Date getDate() {
	return date;
}
public void setDate(Date date) {
	this.date = date;
}
public String getRstatus() {
	return rstatus;
}
public void setRstatus(String rstatus) {
	this.rstatus = rstatus;
}
public String getSstatus() {
	return sstatus;
}
public void setSstatus(String sstatus) {
	this.sstatus = sstatus;
}


}
