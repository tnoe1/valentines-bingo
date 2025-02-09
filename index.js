let entries = [
  "Hero catches heroine",
  "Hero brushes hair back for heroine",
  "Best friend hits on someone",
  "First kiss",
  "Playful slap",
  "Waking up with full makeup",
  "Dancing",
  "Toast",
  "Accidental Close Contact",
  "Main Character Offends Quirky Best Friend",
  "Flirty Injury",
  "City Girl Reference",
  "Coy hand touching",
  "Heart-shaped balloons",
  "Chocolate",
  "Ring",
  "Childhood story",
  "Reference to past boyfriends",
  "Coy giggles",
  "Smile complimented",
  "\"Sometimes I get so busy that I forget to look up\"",
  "Street vendors",
  "Almost kiss",
  "Strange cocktails",
  "Fit girl eating high calorie food",
  "Cupid reference",
  "A busker is playing music",
  "Misread signals",
  "A sprint through crowded streets to declare love",
  "Chemistry while cooking together",
  "Stuck in traffic jam",
  "Grumpy boss turned soft",
  "Nostalgic diner",
  "Pushy mother"
];

let gridDim = 5;

const card = document.querySelector(".card");

const initializeGrid = (dim) => {
  let gridTemplateBuilder = []
  for (let i = 0; i < dim; i++) {
    let payload;
    if (i === dim - 1)
      payload = "1fr"; 
    else
      payload = "1fr ";
  
    gridTemplateBuilder.push(payload);
  }
  
  // Join the elements together
  card.style.gridTemplateColumns = gridTemplateBuilder.join('');
  card.style.gridTemplateRows = gridTemplateBuilder.join('');
}

const inCenter = (i, j, dim) => {
  let isInCenter = false;

  // If dim is odd
  if (dim % 2 === 1) {
    centerDim = Math.floor(dim / 2);
    isInCenter = i === centerDim && j === centerDim;
  }

  return isInCenter;
}

const shuffle = (arr) => {
  let permLen = arr.length;

  let otherElemIdx;
  let otherElem;
  for (let i = permLen - 1; i >= 0; i--) {
    // Assign element at index i to another spot in the array
    otherElemIdx = Math.floor(Math.random() * permLen);
    otherElem = arr[otherElemIdx];
    arr[otherElemIdx] = arr[i];
    arr[i] = otherElem;
  }
}

const mixUpEntries = (cardEntries) => {
  let mixedUp = [];

  let numEntries = cardEntries.length;
  let idxArr = [];
  for (let i = 0; i < numEntries; i++) {
    idxArr.push(i);
  }
  
  shuffle(idxArr);

  for (let i = 0; i < numEntries; i++) {
    mixedUp.push(cardEntries[idxArr[i]]);
  }

  return mixedUp;
}

const cardCreator = (width, height, cardEntries) => {
  card.innerHTML = "";

  let mixedUpEntries = mixUpEntries(cardEntries);

  // Populate the card
  let beforeCenter = true;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let box = document.createElement("div");
      box.classList.add(`row-${i}`);
      box.classList.add(`col-${j}`);

      box.style.gridArea = `${i+1} / ${j+1} / ${i+2} / ${j+2}`;
      box.style.borderLeftStyle = "solid";
      box.style.borderTopStyle = "solid";
      box.style.color = "#772222";
      box.style.backgroundColor = "#FFAAAA";
      box.style.borderColor = "#BC4749";

      box.style.display = "flex";
      box.style.alignItems = "center";
      box.style.justifyContent = "center";

      // Manual media query
      if (Number(window.innerWidth) < 600) {
        box.style.padding = "2px";
      } else {
        box.style.padding = "5px";
      }

      if (i === height - 1) box.style.borderBottomStyle = "solid";
      if (j === width - 1) box.style.borderRightStyle = "solid";

      let text = document.createElement("p");
      text.style.fontFamily = "sans-serif";
      text.style.textAlign = "center";
      text.style.verticalAlign = "middle";


      if (inCenter(i, j, gridDim)) {
        box.style.background = "#FFAAAA url(\"assets/heart.svg\") no-repeat center";
        box.style.backgroundSize = "contain";
        beforeCenter = false;
      } else {
        if (beforeCenter) {
          text.innerText = mixedUpEntries[i*width + j];
        } else {
          text.innerText = mixedUpEntries[i*width + j - 1];
        }
      }
      
      box.appendChild(text);
      card.appendChild(box);
    }
  }  
}

initializeGrid(gridDim);
cardCreator(gridDim, gridDim, entries);

