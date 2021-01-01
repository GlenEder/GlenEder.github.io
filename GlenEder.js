
window.addEventListener('load', () => {

	let position = screen.height + "px"
	console.log("Pos: " + position)

	let photoBlock = document.getElementById("photography")
	photoBlock.style.top = position
})