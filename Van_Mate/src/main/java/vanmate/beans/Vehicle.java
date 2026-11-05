package vanmate.beans;

import java.sql.Date;

public class Vehicle
{
private String vehicle_type, vehicle_number, vehicle_description;
Date date;

private String device_id;
public String getDevice_id() {
	return device_id;
}
public void setDevice_id(String device_id) {
	this.device_id = device_id;
}
public Vehicle() {
	super();
	// TODO Auto-generated constructor stub
}
public Vehicle(String vehicle_type, String vehicle_number, String vehicle_description, Date date) {
	super();
	this.vehicle_type = vehicle_type;
	this.vehicle_number = vehicle_number;
	this.vehicle_description = vehicle_description;
	this.date = date;
}
public Vehicle(String vehicle_number) {
	super();
	this.vehicle_number = vehicle_number;
}

public String getVehicle_type() {
	return vehicle_type;
}
public void setVehicle_type(String vehicle_type) {
	this.vehicle_type = vehicle_type;
}
public String getVehicle_number() {
	return vehicle_number;
}
public void setVehicle_number(String vehicle_number) {
	this.vehicle_number = vehicle_number;
}
public String getVehicle_description() {
	return vehicle_description;
}
public void setVehicle_description(String vehicle_description) {
	this.vehicle_description = vehicle_description;
}
public Date getDate() {
	return date;
}
public void setDate(Date date) {
	this.date = date;
}



}
