const rotation = {
  " ": [0, 0],
  "┘": [180, 270],
  "└": [0, 270],
  "┐": [90, 180],
  "┌": [0, 90],
  "-": [0, 180],
  "|": [90, 270]
}
const digits = {
  0 : [
    "┌", "-", "-", "┐",
    "|", "┌", "┐", "|",
    "|", "|", "|", "|",
    "|", "|", "|", "|",
    "|", "└", "┘", "|",
    "└", "-", "-", "┘",
  ],

  1: [
    "┌", "-", "┐", " ",
    "└", "┐", "|", " ",
    " ", "|", "|", " ",
    " ", "|", "|", " ",
    "┌", "┘", "└", "┐",
    "└", "-", "-", "┘",
  ],

  2: [
    "┌", "-", "-", "┐",
    "└", "-", "┐", "|",
    "┌", "-", "┘", "|",
    "|", "┌", "-", "┘",
    "|", "└", "-", "┐",
    "└", "-", "-", "┘",
  ],

  3: [
    "┌", "-", "-", "┐",
    "└", "-", "┐", "|",
    " ", "┌", "┘", "|",
    " ", "└", "┐", "|",
    "┌", "-", "┘", "|",
    "└", "-", "-", "┘",
  ],

  4: [
    "┌", "┐", "┌", "┐",
    "|", "|", "|", "|",
    "|", "└", "┘", "|",
    "└", "-", "┐", "|",
    " ", " ", "|", "|",
    " ", " ", "└", "┘",
  ],

  5: [
    "┌", "-", "-", "┐",
    "|", "┌", "-", "┘",
    "|", "└", "-", "┐",
    "└", "-", "┐", "|",
    "┌", "-", "┘", "|",
    "└", "-", "-", "┘",
  ],

  6: [
    "┌", "-", "-", "┐",
    "|", "┌", "-", "┘",
    "|", "└", "-", "┐",
    "|", "┌", "┐", "|",
    "|", "└", "┘", "|",
    "└", "-", "-", "┘",
  ],

  7: [
    "┌", "-", "-", "┐",
    "└", "-", "┐", "|",
    " ", " ", "|", "|",
    " ", " ", "|", "|",
    " ", " ", "|", "|",
    " ", " ", "└", "┘",
  ],

  8 : [
    "┌", "-", "-", "┐",
    "|", "┌", "┐", "|",
    "|", "└", "┘", "|",
    "|", "┌", "┐", "|",
    "|", "└", "┘", "|",
    "└", "-", "-", "┘",
  ],

  9 : [
    "┌", "-", "-", "┐",
    "|", "┌", "┐", "|",
    "|", "└", "┘", "|",
    "└", "-", "┐", "|",
    "┌", "-", "┘", "|",
    "└", "-", "-", "┘",
  ]
};

function formDigit(num,dg) {
    let formation = digits[num];
    for (i=0; i<24; i++) {
        let symbol = formation[i];
        let rot = rotation[symbol]
        let clock = dg.children[i];

        let hands = clock.children;
        hands[0].style.rotate = `${rot[0]}deg`;
        hands[1].style.rotate = `${rot[1]}deg`;
    };
}

function createDigit() {
    const newDigit = document.createElement("div");
    newDigit.className = "digit"
    document.getElementById("main").appendChild(newDigit);

    let Clock = document.createElement("div");
    Clock.className = "clock";
    newDigit.appendChild(Clock);

    for (i=0;i<2;i++) {
        const newHand = document.createElement("div");
        newHand.className = "hand";
        Clock.appendChild(newHand);
    }

    for (i=0;i<23;i++) {
        const newClock = Clock.cloneNode(true);
        newDigit.appendChild(newClock);
    }
return newDigit
};

const sepRotation = [
    ["┌","└"],
    ["┐","┘"]
];
function createSeparator() {
    const newSep = document.createElement("div");
    newSep.className = "separator"
    document.getElementById("main").appendChild(newSep);

    let emptyClock = document.createElement("div");
    emptyClock.className = "clock";
    newSep.appendChild(emptyClock);

    const Clock = emptyClock.cloneNode(true);
    newSep.appendChild(Clock);

    for (i=0;i<2;i++) {
        const newHand = document.createElement("div");
        newHand.className = "hand";
        Clock.appendChild(newHand);
    }

    for (i=0;i<3;i++) {
        const newClock = Clock.cloneNode(true);
        newSep.appendChild(newClock);
    }

    for (i=1;i<5;i++) {
        let symbol = sepRotation[0][(i+1)%2]
        let rot = rotation[symbol]
        let clock = newSep.children[i];

        let hands = clock.children;
        hands[0].style.rotate = `${rot[0]}deg`;
        hands[1].style.rotate = `${rot[1]}deg`;
    }

    const newEmptyClock = emptyClock.cloneNode(true);
    newSep.appendChild(newEmptyClock);

    const dupSep = newSep.cloneNode(true);
    document.getElementById("main").appendChild(dupSep);

    for (i=1;i<5;i++) {
        let symbol = sepRotation[1][(i+1)%2]
        let rot = rotation[symbol]
        let clock = dupSep.children[i];

        let hands = clock.children;
        hands[0].style.rotate = `${rot[0]}deg`;
        hands[1].style.rotate = `${rot[1]}deg`;
    }

}

function main(digitList){

    let time = new Date().toLocaleTimeString(); // 11:18:48 AM
    time.replace(" AM","");
    time = time.split(":");

    for (let i=0; i<digitList.length; i++) {
        for (let j=0; j<digitList[i].length; j++) {
            formDigit(time[i][j],digitList[i][j])
        }
    }

    setTimeout(main, 1000,digitList);
}


// setup the clock
const newDigit = document.createElement("div");
newDigit.id = "main"
document.body.appendChild(newDigit);
let digitList = []
digitList.push([createDigit(),createDigit()])
createSeparator()
digitList.push([createDigit(),createDigit()])
createSeparator()
digitList.push([createDigit(),createDigit()])

// start the clock
main(digitList)