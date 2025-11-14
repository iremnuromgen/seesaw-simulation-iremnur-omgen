import { 
    getRandomWeight,
    createWeightObject,
    updatePreviewWeightObjectPosition,
    removePreviewBox
} from "./objectManager.js";

import {
    updateTotalWeights,
    getTotalWeights,
    calculateNetTorque
} from "./physicsManager.js";

const seesawPlank =  document.getElementById('seesaw-plank');
const nextBoxWeightValue = document.querySelector('.next-box-weight-value')
const leftTotalWeightValue = document.querySelector('.left-total-weight-value');
const rightTotalWeightValue = document.querySelector('.right-total-weight-value');
const tiltAngleValue = document.querySelector('.tilt-angle-value');

let nextBoxWeight = getRandomWeight();
nextBoxWeightValue.textContent = `${nextBoxWeight} kg`;

function addLogEntry(entry) {
    const eventLogContainer = document.getElementById("event-log-container");

    const logEntry = document.createElement("div");
    logEntry.classList.add("log-entry");
    logEntry.textContent = entry;

    eventLogContainer.prepend(logEntry);
}

seesawPlank.addEventListener("mouseenter", (event) => {
    const seesawPlankRect = seesawPlank.getBoundingClientRect();
    const clickX = event.clientX - seesawPlankRect.left;
    createWeightObject(seesawPlank, clickX, nextBoxWeight, true);
});

seesawPlank.addEventListener("mousemove", (event) => {
    updatePreviewWeightObjectPosition(seesawPlank, event.clientX);
});

seesawPlank.addEventListener("mouseleave", () => {
    removePreviewBox();
});

seesawPlank.addEventListener('click', (event) => {
    const plankRect = seesawPlank.getBoundingClientRect();
    const clickX = event.clientX - plankRect.left;
    const centerX = plankRect.width / 2;
    const distanceFromCenter = clickX - centerX;

    if(clickX >= 0 && clickX <= plankRect.width) {
        createWeightObject(seesawPlank, clickX, nextBoxWeight, false);

        updateTotalWeights(nextBoxWeight, distanceFromCenter);

        const { leftTotalWeight, rightTotalWeight } = getTotalWeights();
        leftTotalWeightValue.textContent = `${leftTotalWeight.toFixed(1)} kg`;
        rightTotalWeightValue.textContent = `${rightTotalWeight.toFixed(1)} kg`;

        const netTorque = calculateNetTorque();

        let tiltAngle = netTorque / 100;
        tiltAngle = Math.max(Math.min(tiltAngle, 30), -30);

        seesawPlank.style.transform = `translateX(-50%) rotate(${tiltAngle}deg)`;

        tiltAngleValue.textContent = `${tiltAngle.toFixed(1)}°`

        const side = distanceFromCenter < 0 ? "left" : "right";
        const absDistance = Math.abs(distanceFromCenter).toFixed(1);
        const angleImpact = (nextBoxWeight * distanceFromCenter / 100).toFixed(1);

        const entry = `A ${nextBoxWeight} kg box was placed ${absDistance}px to the ${side} of the center, affecting the seesaw tilt by ${angleImpact}°.`;

        addLogEntry(entry);
        
        nextBoxWeight = getRandomWeight();
        nextBoxWeightValue.textContent = `${nextBoxWeight} kg`;

        createWeightObject(seesawPlank, clickX, nextBoxWeight, true);
    }
});