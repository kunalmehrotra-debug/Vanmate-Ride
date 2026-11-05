package vanmate.beans;

public class Feedback 
{
private String name, email, phone, feedback_text, rating;
private int id;
public Feedback()
{
	super();
}

public Feedback(String name, String email, String phone, String feedback_text, String rating) {
	super();
	this.name = name;
	this.email = email;
	this.phone = phone;
	this.feedback_text = feedback_text;
	this.rating = rating;
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

public String getFeedback_text() {
	return feedback_text;
}

public void setFeedback_text(String feedback_text) {
	this.feedback_text = feedback_text;
}

public String getRating() {
	return rating;
}

public void setRating(String rating) {
	this.rating = rating;
}

public int getId() {
	return id;
}

public void setId(int id) {
	this.id = id;
}


}
