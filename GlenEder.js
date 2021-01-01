
let terminal = null

window.addEventListener('load', () => {

	//set terminal
	terminal = document.getElementById("termOutput")
	terminal.value = ""

	//Loading terminal animation
	loadTerminal()

	//Add listener for ENTER
	let input = document.getElementById("termInput")
	input.value = ""
	input.addEventListener("keydown", (e) => {
			if(e.key === "Enter") {
				handleCommand(input.value)
				input.value = ""
			}
	})

	//set focus to terminput on screen click
	window.addEventListener('click', () => {
		input.focus()
	})

})

function loadTerminal() {

	terminal.value = "Loading"
	let percent = 0;
	let x = setInterval(() => {
		percent += Math.floor(Math.random() * 20 + 5)
		terminal.value += '.'

		if(percent >= 100) {
			clearInterval(x)
			terminal.value = ""
			let message = "Glen Michael Austin Eder\n\t" +
				"Aspiring Software Developer\n\t" +
				"Experienced Leader\n\n" +
				"Enter command to proceed, use 'help' to see command list\n"
			printToTerm(message)
		}
	}, 200)



}

function handleCommand(command) {

	//access output text area
	let out = document.getElementById("termOutput")

	//check command list
	switch (command) {

		case "about":
			about()
			break
		case "help":
			help()
			break
		case "resume":
			printToTerm("Loading resume...\n")
			showResume()
			break;
		case "clear":
			terminal.value = ""
			break

		//throw error statement
		default:
			let message = "'" + command + "' is not a command\n\tUse 'help' to see all commands\n"
			printToTerm(message)
	}

}

function showResume() {
	document.getElementById("resumeContainer").style.width= "100%"
}

function help() {

	let message = "Command List\n" +
		"\tabout -- render general information about Glen Eder\n" +
		"\tresume -- view Glen Eder's Resume\n" +
		"\tcontact -- show Glen Eder's contact information\n" +
		"\tsocials --  display social media links\n" +
		"\tclear -- clear the terminal\n"

	printToTerm(message)
}

function about() {
	document.getElementById("termOutput").value += "Redirecting to about...\n"
}

function printToTerm(output) {
	if(output) {
		setTimeout(() => {
			terminal.value += output.charAt(0);
			printToTerm(output.substring(1))
		}, 5)
	}
}