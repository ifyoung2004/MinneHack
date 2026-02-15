// Get the modal element
var popup = document.getElementById("myPopup");

// Function to open the popup
function openPopup() {
  popup.style.display = "flex"; // Use 'flex' or 'block' to show
}

// Function to close the popup
function closePopup() {
  popup.style.display = "none";
}

// Close the popup if the user clicks outside of the content area
window.onclick = function(event) {
  if (event.target == popup) {
    closePopup();
  }
}