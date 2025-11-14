const weightColors = {
    1: "#f94144",
    2: "#f3722c",
    3: "#f8961e",
    4: "#f9844a",
    5: "#f9c74f",
    6: "#90be6d",
    7: "#43aa8b",
    8: "#4d908e",
    9: "#577590",
    10: "#277da1"
};

export function getRandomWeight() {
    return Math.floor(Math.random() * 10) + 1;
}

export function createWeightObject(plank, clickX, boxWeight) {
    const box = document.createElement("div");

    box.classList.add("weight-box")

    const boxSize = 20 + boxWeight * 4;
    box.style.width = `${boxSize}px`;
    box.style.height = `${boxSize}px`;

    box.style.backgroundColor = weightColors[boxWeight];

    const left = clickX - boxSize / 2;
    box.style.position = "absolute";

    box.style.bottom = "10px";
    box.style.left = `${left}px`;
    box.style.borderRadius = "4px";

    box.dataset.boxWeight = boxWeight;

    plank.appendChild(box);
}