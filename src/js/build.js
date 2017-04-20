

console.log('about to fire');

$(document).ready(function() {
	
	function readURL(input) {
	    if (input.files && input.files[0]) {
	        var reader = new FileReader();

	        reader.onload = function (e) {
	            $('#imgView').attr('src', e.target.result).show();
	        }

	        reader.readAsDataURL(input.files[0]);
	    }
	}

	$("#uploadImage").change(function(){
	    readURL(this);
	});

});