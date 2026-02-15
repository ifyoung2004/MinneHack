function openPopup() {
  document.getElementById("robotPopup").style.display = "flex";
}

function closePopup() {
  document.getElementById("robotPopup").style.display = "none";
}

function closeIntro() {
  document.getElementById("introPopup").style.display = "none";
}

let fixedRobots = 0;
let selectedPart = null;
let selectedFromInventory = false;

const partsList = document.getElementById("parts");
const inventoryList = document.getElementById("inventory-list");
const removeBtn = document.getElementById("remove_part");
const installBtn = document.getElementById("install_part");

let lastRobotId = null;
let lastPartName = "";
let lastPartElement = null;

const robots = [
  {
    id: 1,
    name: "Rusty Bucks",
    dialogue: " looks a little down... Maybe some sunlight would cheer them up!",
    energy: 80,
    computingPower: 90,
    parts: ["water-filtration", "oxygen-processor"],
    img: "./../static/robot_sad.png"
  },
  {
    id: 2,
    name: "Robot 2",
    dialogue: "'s water filtration system is broken!",
    energy: 50,
    computingPower: 70,
    parts: ["solar-panels"],
    img: "./../static/robot_sad.png"
  },
  {
    id: 3,
    name: "Robot 3",
    dialogue: "'s oxygen processing system is not working properly...",
    energy: 60,
    computingPower: 60,
    parts: ["solar-panels", "thermal-paste"],
    img: "./../static/robot_sad.png"
  },
  {
    id: 4,
    name: "Robot 4",
    dialogue: "'s thermal paste is dried out...",
    energy: 40,
    computingPower: 80,
    parts: ["battery"],
    img: "./../static/robot_sad.png"
  }, 
  {
    id: 5,
    name: "Robot 5",
    dialogue: "looks a little low energy... Maybe they need a new battery?",
    energy: 30,
    computingPower: 50,
    parts: ["solar-panels", "water-filtration"],
    img: "./../static/robot_sad.png"
  }
];

let currentRobotId = null;

/* --------------------------
   SELECTION HANDLING
-------------------------- */

function clearSelection() {
  document.querySelectorAll("li.selected")
    .forEach(li => li.classList.remove("selected"));

  selectedPart = null;
  selectedFromInventory = false;
}

partsList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    clearSelection();
    selectedPart = e.target;
    selectedFromInventory = false;
    e.target.classList.add("selected");
  }
});

inventoryList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    clearSelection();
    selectedPart = e.target;
    selectedFromInventory = true;
    e.target.classList.add("selected");
  }
});

/* --------------------------
   ROBOT POPUP
-------------------------- */

function openRobotPopup(robotId) {
  currentRobotId = robotId;
  const robot = robots.find(r => r.id === robotId);

  openPopup();

  document.getElementById("robot_sad").src = robot.img;
  document.getElementById("dialogue").innerHTML =
    `<em>${robot.name}${robot.dialogue}</em>`;

  // Clear current parts list
  partsList.innerHTML = "";

  robot.parts.forEach(part => {
    const li = document.createElement("li");
    li.dataset.part = part;
    li.textContent = part.replace("-", " ");
    partsList.appendChild(li);
  });
}

/* --------------------------
   REMOVE PART
-------------------------- */

removeBtn.addEventListener("click", () => {
  if (!selectedPart || selectedFromInventory) {
    alert("Select a robot part to remove!");
    return;
  }

  const robot = robots.find(r => r.id === currentRobotId);
  const partName = selectedPart.dataset.part;

  robot.parts = robot.parts.filter(p => p !== partName);

  inventoryList.appendChild(selectedPart);
  clearSelection();
});

/* --------------------------
   INSTALL PART
-------------------------- */

installBtn.addEventListener("click", async () => {
  if (!selectedPart || !selectedFromInventory) {
    alert("Select a part from inventory!");
    return;
  }

  const robot = robots.find(r => r.id === currentRobotId);

  lastRobotId = robot.id;
  lastPartName = selectedPart.dataset.part;
  lastPartElement = selectedPart;

  await checkWinCondition();
});

/* --------------------------
   MINIGAMES
-------------------------- */

const minigameList = ["hi", "maze", "popit", "match", "val"];

async function triggerMinigame(minigame) {
  const container = document.getElementById("minigame");
  container.classList.add("active");

  const template = document.getElementById(`${minigame}-template`);
  const clone = template.content.cloneNode(true);

  container.innerHTML = "";
  container.appendChild(clone);
}

function hideMinigame(win = true) {
  const container = document.getElementById("minigame");
  container.classList.remove("active");
  container.innerHTML = "";

  if (!win) {
    openRobotPopup(lastRobotId);
    return;
  }

  fixedRobots++;
  console.log(fixedRobots);
  if (fixedRobots == 5) {
    
    alert("You fixed all robots!");
    document.getElementById("winText").hidden = false;
  }

  const robot = robots.find(r => r.id === lastRobotId);
  robot.img = "static/robot_happy.png";

  if (!robot.parts.includes(lastPartName)) {
    robot.parts.push(lastPartName);
  }

  partsList.appendChild(lastPartElement);
  inventoryList.removeChild(lastPartElement);

  clearSelection();
  openRobotPopup(lastRobotId);

  
}

async function activateRandomMinigame() {
  if (minigameList.length === 0) {
    alert("No more minigames!");
    return;
  }

  const randomIndex = Math.floor(Math.random() * minigameList.length);
  const game = minigameList.splice(randomIndex, 1)[0];

  closePopup();
  await triggerMinigame(game);
}

async function checkWinCondition() {
  if (
    (lastRobotId === 1 && lastPartName === "solar-panels") ||
    (lastRobotId === 2 && lastPartName === "water-filtration") ||
    (lastRobotId === 3 && lastPartName === "oxygen-processor") ||
    (lastRobotId === 4 && lastPartName === "thermal-paste") ||
    (lastRobotId === 5 && lastPartName === "battery")
  ) {
    await activateRandomMinigame();
  } else {
    alert("That doesn't seem like the right part.");
  }
}
