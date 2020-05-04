$(document).ready(function() {  
	
	if ($("#alertSuccess").text().trim() == "")  {   
		$("#alertSuccess").hide();  
		
	}  
	
	$("#alertError").hide();
});

//SAVE ============================================ 
$(document).on("click", "#btnSave", function(event) {  
	
	// Clear status msges-------------  
	$("#alertSuccess").text("");  
	$("#alertSuccess").hide();  
	$("#alertError").text("");  
	$("#alertError").hide(); 

	// Form validation----------------  
	var status = validateItemForm(); 

	// If not valid-------------------  
	if (status != true)  {   
		$("#alertError").text(status);   
		$("#alertError").show();   
		return;  
	} 


	// If valid-------------------------  
	var type = ($("#hidhosIDSave").val() == "") ? "POST" : "PUT"; 
	
	$.ajax( {  
		
		url : "HospitalsAPI",  
		type : type,  
		data : $("#formHospital").serialize(),  
		dataType : "text",  
		complete : function(response, status)  {   
			
			onHospitalSaveComplete(response.responseText, status);  
			
		} 
	}); 
	
}); 

function onHospitalSaveComplete(response, status) {  
	
	if (status == "success")  {   
		
		var resultSet = JSON.parse(response); 

			if (resultSet.status.trim() == "success")   {    
				
				$("#alertSuccess").text("Successfully saved.");    
				$("#alertSuccess").show(); 
				$("#divItemsGrid").html(resultSet.data);   
				
			} else if (resultSet.status.trim() == "error")   {    
				
				$("#alertError").text(resultSet.data);    
				$("#alertError").show();   
				
			} 

	} else if (status == "error")  {   
		
		$("#alertError").text("Error while saving.");   
		$("#alertError").show();  
		
	} else  {   
		
		$("#alertError").text("Unknown error while saving..");   
		$("#alertError").show();  
		
	} 

	$("#hidItemIDSave").val("");  $("#formItem")[0].reset(); } 

//INSERT ============================================ 
function validateItemForm() {  
	
	// REGNO  
	if ($("#hosRegno").val().trim() == "")  {   
		return "Insert Hospital registered NO.";  
		
	} 
	 
	 // NAME  
	if ($("#hosname").val().trim() == "")  {   
		return "Insert Hospital Name.";  
		
	} 
	
	// TYPE  
	if ($("#hostype").val().trim() == "")  {   
		return "Insert Hospital Type.";  
		
	} 
	 
	 // HOSPITAL CHARGE-------------------------------  
	if ($("#hosCharge").val().trim() == "")  {   
		return "Insert Hospital Charge.";  
		
	} 
	 
	 // is numerical value  
	var tmpPrice = $("#hosCharge").val().trim();  
	if (!$.isNumeric(tmpPrice))  {   
		return "Insert a numerical value for Hospital Charge.";  
		
	} 
	 
	 // convert to decimal price  
	$("#hosCharge").val(parseFloat(tmpPrice).toFixed(2)); 
	
	 
	 // ADDRESS------------------------  
	if ($("#Address").val().trim() == "")  {   
		return "Insert Address.";  
		
	} 
	// CITY------------------------  
	if ($("#city").val().trim() == "")  {   
		return "Insert City.";  
		
	} 
	
	// EMAIL------------------------  
	if ($("#Email").val().trim() == "")  {   
		return "Insert Email address.";  
		
	} 
	 
	 return true; 
	 
}