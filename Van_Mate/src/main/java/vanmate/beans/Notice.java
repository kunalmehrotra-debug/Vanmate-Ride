package vanmate.beans;

import java.sql.Date;

public class Notice 
{
private String topic,content;
Date date;
public Notice() {
	super();
	// TODO Auto-generated constructor stub
}
public Notice(String topic, String content, Date date) 
{
	super();
	this.topic = topic;
	this.content = content;
	this.date = date;
}
public Notice(String content) {
	super();
	this.content = content;
}

public String getTopic() {
	return topic;
}
public void setTopic(String topic) {
	this.topic = topic;
}
public String getContent() {
	return content;
}
public void setContent(String content) {
	this.content = content;
}
public Date getDate() {
	return date;
}
public void setDate(Date date) {
	this.date = date;
}


}
