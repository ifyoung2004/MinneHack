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



let robotParts = [];
let inventory = [];
let fixedRobots = 0;




let selectedPart = null; // currently selected part
let selectedFromInventory = false; 

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

        const partName = selectedPart.dataset.part;
        const robot = robots.find(r => r.id === currentRobotId);

        // Remove from robot data
        robot.parts = robot.parts.filter(p => p !== partName);

        // Move in DOM
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

        const partName = selectedPart.dataset.part;
        const robot = robots.find(r => r.id === currentRobotId);

        
        if (!robot.parts.includes(partName)) {
            robot.parts.push(partName);
        }
        inventoryList.removeChild(selectedPart);
        partsList.appendChild(selectedPart);

        clearSelection();
        checkWinCondition(); 

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


const robots = [
  {
    id: 1,
    name: "Rusty Bucks",
    dialogue: " looks a little down... Maybe some sunlight would cheer them up!",
    energy: 80,
    computingPower: 90,
    parts: ["water-filtration", "oxygen-processor"],
    img: "robot_sad.png"
  },
  {
    id: 2,
    name: "Robot 2",
    dialogue: "'s water filtration system is broken! Getting some water would really help them feel better...",
    energy: 50,
    computingPower: 70,
    parts: ["solar-panels"],
    img: "robot_sad.png"
  },
  {
    id: 3,
    name: "Robot 3",
    dialogue: "'s oxygen processing system is not working properly... They could really use some fresh air.",
    energy: 60,
    computingPower: 60,
    parts: ["solar-panels", "thermal-paste"],
    img: "robot_sad.png"
  },
  {
    id: 4,
    name: "Robot 4",
    dialogue: "'s thermal paste is dried out... Help them cool down!!",
    energy: 40,
    computingPower: 80,
    parts: ["battery"],
    img: "robot_sad.png"
  },
  {
    id: 5,
    name: "Robot 5",
    dialogue: "looks a little low energy... Maybe they need a new battery?",
    energy: 30,
    computingPower: 50,
    parts: ["solar-panels", "water-filtration"],
    img: "robot_sad.png"
  }
];


let currentRobotId = null;



function openRobotPopup(robotId) {
  currentRobotId = robotId;
  const robot = robots.find(r => r.id === robotId);

  // Show popup
  const popup = document.getElementById("robotPopup");
  popup.style.display = "block";

  // Update robot image
  const img = document.getElementById("robot_sad");
  img.src = robot.img;

  // Update dialogue
  document.getElementById("dialogue").innerHTML = `<em>${robot.name} ${robot.dialogue}`;

  // Update stats
  document.getElementById("stats").innerHTML = `
    <strong>Status</strong>
    <ul>Energy: ${robot.energy}</ul>
    <ul>Computing Power: ${robot.computingPower}</ul>
  `;

  // Update parts
  const partsDiv = document.getElementById("parts");
  let partsHTML = "<strong>Parts</strong>";
  robot.parts.forEach(part => {
    partsHTML += `<ul data-part="${part}">${part.replace("-", " ")}</ul>`;
  });
  partsDiv.innerHTML = partsHTML;
}


function checkWinCondition() {
    let fixedRobots = 0;

    if (robots.find(r => r.id === 1).parts.includes("solar-panels")) {
      robots.find(r => r.id === 1).img = "templates/robot_happy.png";
      openRobotPopup(currentRobotId);
      fixedRobots++;
    }
    if (robots.find(r => r.id === 2).parts.includes("water-filtration")) {
       fixedRobots++;
       robots.find(r => r.id === 2).img = "templates/robot_happy.png";
      openRobotPopup(currentRobotId);
    }
    if (robots.find(r => r.id === 3).parts.includes("oxygen-processor")) {
      fixedRobots++;
      robots.find(r => r.id === 3).img = "templates/robot_happy.png";
      openRobotPopup(currentRobotId);
    }
    if (robots.find(r => r.id === 4).parts.includes("thermal-paste")) {
      fixedRobots++;
      robots.find(r => r.id === 4).img = "templates/robot_happy.png";
      openRobotPopup(currentRobotId);
    }
    if (robots.find(r => r.id === 5).parts.includes("battery")) {
      fixedRobots++;
      robots.find(r => r.id === 5).img = "templates/robot_happy.png";
      openRobotPopup(currentRobotId);
    }

    if (fixedRobots === 5) {
        alert("Win");
    }
}