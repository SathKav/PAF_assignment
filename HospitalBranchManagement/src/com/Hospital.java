package com;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class Hospital {
	private Connection connect()
	 {
	 Connection con = null;
	 try
	 {
	 Class.forName("com.mysql.jdbc.Driver");

	 //Provide the correct details: DBServer/DBName, username, password
	 con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/paf_ca", "root", "8172429Amma*");
	 }
	 catch (Exception e)
	 {e.printStackTrace();}
	 return con;
	 } 
	
	public String readBranch() {
		String output = "";
		try {
			Connection con = connect();
			if (con == null) {
				return "Error while connecting to the database for reading.";
			}
			// Prepare the html table to be displayed
			output = "<table border='1'><tr><th>Hospital Register No</th><th>Hospital Name</th><th>Hospital type</th>"
					+ "<th>Hospital charge</th><th>Address</th><th>City</th><th>Email</th><th>Update</th><th>Remove</th></tr>";
			String query = "select * from hospital";
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			// iterate through the rows in the result set
			while (rs.next()) {
				String hosID  = Integer.toString(rs.getInt("hosID"));
				String hosRegno = rs.getString("hosRegno");
				String hosname  = rs.getString("hosname");
				String hostype  = rs.getString("hostype");
				String hosCharge = Double.toString(rs.getDouble("hosCharge"));
				String Address = rs.getString("Address");
				String city = rs.getString("city");
				String Email = rs.getString("Email");
				
				// Add into the html table
				output += "<tr><td><input id='hidhosIDUpdate'name='hidhosIDUpdate'type='hidden' value='" + hosID
						+ "'>" + hosRegno + "</td>";
				output += "<td>" + hosname + "</td>";
				output += "<td>" + hostype + "</td>";
				output += "<td>" + hosCharge + "</td>";
				output += "<td>" + Address + "</td>";
				output += "<td>" + city + "</td>";
				output += "<td>" + Email + "</td>";
				// buttons
				output += "<td><input name='btnUpdate'type='button' value='Update'class='btnUpdate btn btn-secondary'></td>"
						+ "<td><input name='btnRemove'type='button' value='Remove'class='btnRemove btn btn-danger'data-hosID='"
						+ hosID + "'>" + "</td></tr>";
			}
			con.close();
			// Complete the html table
			output += "</table>";
		} catch (Exception e) {
			output = "Error while reading the branches.";
			System.err.println(e.getMessage());
		}
		return output;
	}

}
