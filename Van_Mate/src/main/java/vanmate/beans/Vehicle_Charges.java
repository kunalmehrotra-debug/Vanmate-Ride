package vanmate.beans;

public class Vehicle_Charges 
{
private String  vehicle_type, charge, description;
private int id;
public Vehicle_Charges() {
	super();
	// TODO Auto-generated constructor stub
}
public Vehicle_Charges(String vehicle_type, String charge, String description, int id) {
	super();
	this.vehicle_type = vehicle_type;
	this.charge = charge;
	this.description = description;
	this.id = id;
}
public Vehicle_Charges(String vehicle_type, String charge, String description) {
	super();
	this.vehicle_type = vehicle_type;
	this.charge = charge;
	this.description = description;
}
public String getVehicle_type() {
	return vehicle_type;
}
public void setVehicle_type(String vehicle_type) {
	this.vehicle_type = vehicle_type;
}
public String getCharge() {
	return charge;
}
public void setCharge(String charge) {
	this.charge = charge;
}
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}



}
