
$(document).ready(function() {
	var actionsWrpDOM = $(".actionsWrpJS"),
	imgViewDOM = $('#imgView'),
	uploadImageBtnDOM = $("#uploadImageBtn"),
	uploadBtnContDOM = $(".uploadBtnContJS"),
	acceptBtnDOM = $(".acceptBtnJS"),
	deleteBtnDOM = $(".delBtnJS"),
	loaderDOM = $(".loaderJS"),
	ldGifDOM =$(".ldGifJS"),
	messageDivDOM = $(".messageDivJS"),
	filesObj = {},
	accessToken = "";

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
	};

	var fnInitiateFacebookPostFlow = function(){
		console.log('Conditions suitable to post to facebook.. lets begin', filesObj);

		var postMSG="Posting this through test_App.";
		var url='https://graph.facebook.com/me/photos?access_token='+ accessToken +'&message='+postMSG;
		
		var formData = new FormData();
		formData.append("source",filesObj);

		 $.ajax({
	           url: url,
	           data: formData,
	           cache: false,
	           contentType: false,
	           processData: false,
	           type: 'POST',

	           success: function(data){
	           		console.log('DATAAAAAA',data);
	           		var postLink = "https://www.facebook.com/photo.php?fbid=" + data.id,
	           		postLinkHtml =  '<a href="'+ postLink +'" target="_blank">Click here to visit the created post</a>'

	           		ldGifDOM.hide();
	           		messageDivDOM.append('<div>Post successfully created.'+postLinkHtml+'</div>').show();
	           }
	       });
	};

	var fncheckPermissions = function(){
		FB.api('/me/permissions', function(response) {
		  if(response.data){
		    var permItem = response.data.filter(function( item ){
		      return item.permission === "publish_actions";
		    });

		    if(permItem.length){
		      if(permItem[0].status == "granted") {
		        //Post data to facebook
		        fnInitiateFacebookPostFlow()
		      }
		      else if(permItem[0].status == "declined") {
		       	// post permissions denied.
		       	console.log('Permission denied. dont know how to procees');
		      }
		    } 
		  }     
		});
	};

	var fnRequestForPermission = function(){
		FB.login(function (res) { 
			
			accessToken = res.authResponse.accessToken;
		    fncheckPermissions();

		  },{scope: 'email,public_profile,user_friends,publish_actions',
		    return_scopes: true
		});
	};

	var acceptBtnClickHandler = function (){
		console.log('++++ Calling accept button', filesObj);
		loaderDOM.show();

		FB.getLoginStatus(function (res) { 
		  if(res.authResponse){
		  	accessToken = res.authResponse.accessToken;
		    fncheckPermissions();
		  }

		  else {
		    //Not logged in case - request for permissions
		    console.log('Kindly request for permissions');
		    fnRequestForPermission();
		  }
		});
	};

	var deleteBtnClickHandler = function(){
		console.log('---- Clicking reject button');
		uploadBtnContDOM.show();
		actionsWrpDOM.hide();
		imgViewDOM.hide();

		filesObj = {};

	};

	//Attaching handlers
	acceptBtnDOM.click(acceptBtnClickHandler);
	deleteBtnDOM.click(deleteBtnClickHandler);
	uploadImageBtnDOM.change(function(){
	    readURL(this);
	});


});