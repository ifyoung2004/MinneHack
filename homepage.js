function openPopup() {
  var popup = document.getElementById("robotPopup");
  popup.style.display = "flex";
}

function openMaze() {
  var popup = document.getElementById("mazePopup");
  popup.style.display = "flex";
}

function closePopup() {
  var popup = document.getElementById("robotPopup");
  popup.style.display = "none";
}

function closeIntro() {
  var popup = document.getElementById("introPopup");
  popup.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == popup) {
    closePopup();
  }
}