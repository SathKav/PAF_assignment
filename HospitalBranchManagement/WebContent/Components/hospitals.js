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