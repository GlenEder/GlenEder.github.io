let isMenuOpen = 0;


function changeMenuState(x) {
	x.classList.toggle("change");

	if(isMenuOpen == 1) {
		document.getElementById("menu").style.width = "0%";
		isMenuOpen = 0;
	}else {
		console.log(window.innerWidth);
		if(window.innerWidth > 1650) {
			document.getElementById("menu").style.width = "8%";
		}else {
			document.getElementById("menu").style.width = "13%";
		}
		isMenuOpen = 1;
	}

	
}

function showPDF() {
		document.getElementById("resumeImageContainer").style.width = "100%";
		document.getElementById("mainMenuIcon").style.visibility = "hidden";
}

function closePDF() {
		document.getElementById("resumeImageContainer").style.width = "0%";
		document.getElementById("mainMenuIcon").style.visibility = "visible";
}


function showContactInfo() {
		document.getElementById("contactContainer").style.width = "100%";
		document.getElementById("mainMenuIcon").style.visibility = "hidden";
}

function closeContactInfo() {
		document.getElementById("contactContainer").style.width = "0%";
		document.getElementById("mainMenuIcon").style.visibility = "visible";
}

function showAboutInfo() {
	document.getElementById("aboutInfoContainer").style.visibility = "visible"
	document.getElementById("aboutContainer").style.width = "100%";
	document.getElementById("aboutContainer").style.overflowY = "scroll";
	document.getElementById("mainMenuIcon").style.visibility = "hidden";
	
}

function closeAboutInfo() {
	document.getElementById("aboutInfoContainer").style.visibility = "hidden"
	document.getElementById("aboutContainer").style.width = "0%";
	document.getElementById("aboutContainer").style.overflowY = "hidden";
	document.getElementById("mainMenuIcon").style.visibility = "visible";
	
}

function showGameTab() {
	document.getElementById("gameTab").style.width = "100%";
	document.getElementById("mainMenuIcon").style.visibility = "hidden";
}

function closeGameTab() {
	document.getElementById("gameTab").style.width = "0%";
	document.getElementById("mainMenuIcon").style.visibility = "visible";
}
