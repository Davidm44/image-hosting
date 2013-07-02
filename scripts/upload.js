var form = new FormData();
var reader = new FileReader();
var xhr = new XMLHttpRequest();

var id = null;
var type = null;


document.getElementById("drop").onclick = function(e) {
	document.getElementById("selectfile").click();
}

document.getElementById("selectfile").onchange = function() {
	document.getElementById("drop").style.display = "block";
	document.getElementById("goto_image").style.display = "none";
	
	document.getElementById("drop").innerHTML = "0%";


	id = uniqid();
	
	if(this.files[0].type == "image/jpeg") {
		type = "jpeg";
	} else if(this.files[0].type == "image/png") {
		type = "png";
	} 
	
	reader.readAsDataURL(this.files[0]);
}


document.getElementById("copy_url_text").onclick = function() {
	this.innerHTML = "http://david.voidms.com/drag/images/" + id + "." + type;
	this.select();
}

xhr.upload.addEventListener("progress", function(e) {
	document.getElementById("drop").innerHTML = Math.floor((e.loaded / e.total) * 100) + "%";

}, false);

xhr.upload.addEventListener("load",function(e) {
		
		document.getElementById("drop").style.display = "none";
		document.getElementById("goto_image").style.display = "inline-block";
		document.getElementById("goto_image").setAttribute("href","images/" + id + "." + type);
		
		document.getElementById("copy_url").style.display = "block";
},false);

reader.onload = function(e) {
	
	//document.getElementById("drop").style.backgroundImage = "url("+e.target.result+")";
	
	console.log(e.target.result);
	form.append("image", e.target.result);
	form.append("name",id);
	xhr.open("POST", "upload.php", true);

	xhr.send(form);
}

window.ondragover = function(e) {
	e.preventDefault();
}

window.ondrop = function(e) {
	e.preventDefault();

	document.getElementById("drop").style.display = "block";
	document.getElementById("goto_image").style.display = "none";
	
	document.getElementById("drop").innerHTML = "0%";


	id = uniqid();
	
	try {
		if(e.dataTransfer.files[0].type == "image/jpeg") {
			type = "jpeg";
		} else if(e.dataTransfer.files[0].type == "image/png") {
			type = "png";
		}
	}catch(error) {
		document.getElementById("drop").innerHTML = "Error";
	}
	
	reader.readAsDataURL(e.dataTransfer.files[0]);
	
	
}

uniqid = function() { 
	return Math.floor(Math.random() * 1000).toString();
};
