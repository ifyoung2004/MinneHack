
let robotParts = [];
let inventory = [];



function togglePopup() {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
      }
      function closePopup() {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("hide");
      }

let selectedPart = null; // currently selected part
let selectedFromInventory = false; // track if selection is from inventory

const partsList = document.getElementById("parts");
const inventoryList = document.getElementById("inventory-list");

const removeBtn = document.getElementById("remove_part");
const installBtn = document.getElementById("install_part");

// Handle selection in robot parts
partsList.addEventListener("click", (e) => {
    if (e.target.tagName === "UL") {
        clearSelection();
        selectedPart = e.target;
        selectedFromInventory = false;
        selectedPart.classList.add("selected");
    }
});

// Inventory selection
inventoryList.addEventListener("click", (e) => {
    if (e.target.tagName === "UL") {
        clearSelection();
        selectedPart = e.target;
        selectedFromInventory = true;
        selectedPart.classList.add("selected");
    }
});

// Remove part
removeBtn.addEventListener("click", () => {
    if (selectedPart && !selectedFromInventory) {
        partsList.removeChild(selectedPart);
        inventoryList.appendChild(selectedPart);
        clearSelection();
    } else {
        alert("Please select a part from the robot to remove!");
    }
});

// Install part
installBtn.addEventListener("click", () => {
    if (selectedPart && selectedFromInventory) {
        inventoryList.removeChild(selectedPart);
        partsList.appendChild(selectedPart);
        clearSelection();
    } else {
        alert("Please select a part from the inventory to install!");
    }
});

// Helper function to clear selection
function clearSelection() {
    const allParts = document.querySelectorAll("ul");
    allParts.forEach(part => part.classList.remove("selected"));
    selectedPart = null;
    selectedFromInventory = false;
}
