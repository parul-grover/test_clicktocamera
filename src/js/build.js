
$(document).ready(function() {
	var actionsWrpDOM = $(".actionsWrpJS"),
	imgViewDOM = $('#imgView'),
	uploadImageBtnDOM = $("#uploadImageBtn"),
	uploadBtnContDOM = $(".uploadBtnContJS"),
	acceptBtnDOM = $(".acceptBtnJS"),
	deleteBtnDOM = $(".delBtnJS"),
	filesObj = {};

	function readURL(input) {
	    if (input.files && input.files[0]) {
	        var reader = new FileReader();
	        
	        filesObj = input.files[0];

	        reader.onload = function (e) {
	            imgViewDOM.attr('src', e.target.result).show();
	            actionsWrpDOM.show();
	            uploadBtnContDOM.hide();
	        }

	        reader.readAsDataURL(input.files[0]);
	    }
	}

	uploadImageBtnDOM.change(function(){
	    readURL(this);
	});

	acceptBtnDOM.click(function(){
		console.log('++++ Calling accept button', filesObj);
		FB.getLoginStatus(function (res) { 
		  if(res.authResponse){
		    console.log('User authenticated');
		  }

		  else {
		    //request for permissions
		    console.log('Kindly request for permissions');
		  }
		});
	});

	deleteBtnDOM.click(function(){
		console.log('---- Clicking reject button');
		uploadBtnContDOM.show();
		actionsWrpDOM.hide();

		imgViewDOM.hide();
		filesObj = {};

	});

});