import { 
    getRandomWeight,
    createWeightObject,
    updatePreviewWeightObjectPosition,
    removePreviewBox
} from "./objectManager.js";

import {
    updateTotalWeights,
    getTotalWeights,
    calculateNetTorque,
    calculateLeftTorque,
    calculateRightTorque,
    getBoxData,
    setSeesawState
} from "./physicsManager.js";

import {
    saveSeesawState,
    loadSeesawState,
    clearSeesawState
} from "./storageManager.js";

const seesawPlank =  document.getElementById('seesaw-plank');
const nextBoxWeightValue = document.querySelector('.next-box-weight-value')
const leftTotalWeightValue = document.querySelector('.left-total-weight-value');
const rightTotalWeightValue = document.querySelector('.right-total-weight-value');
const tiltAngleValue = document.querySelector('.tilt-angle-value');

const leftTotalTorque = document.querySelector('.left-total-torque-value');
const rightTotalTorque = document.querySelector('.right-total-torque-value');

function getWeightForBalance(distance) {
    const leftTotalTorque = calculateLeftTorque();
    const rightTotalTorque = calculateRightTorque();

    const torqueGap = Math.abs(leftTotalTorque + rightTotalTorque);

    if(torqueGap === 0) return 1;

    const needDistance = Math.abs(distance);

    if(needDistance < 5) return 10;

    let w = Math.ceil(torqueGap / needDistance);

    if(w > 10) w = 10;
    if(w < 1) w = 1;

    return w;
}

let nextBoxWeight = getRandomWeight();
let eventLogs = [];
nextBoxWeightValue.textContent = `${nextBoxWeight} kg`;

function addLogEntry(entry) {
    const eventLogContainer = document.getElementById("event-log-container");

    const logEntry = document.createElement("div");
    logEntry.classList.add("log-entry");
    logEntry.textContent = entry;

    eventLogContainer.prepend(logEntry);

    eventLogs.unshift(entry);
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

        setTimeout(() => {
            updateTotalWeights(nextBoxWeight, distanceFromCenter);

            const { leftTotalWeight, rightTotalWeight } = getTotalWeights();
            leftTotalWeightValue.textContent = `${leftTotalWeight.toFixed(1)} kg`;
            rightTotalWeightValue.textContent = `${rightTotalWeight.toFixed(1)} kg`;

            const netTorque = calculateNetTorque();
            const netLeftTorque = calculateLeftTorque();
            const netRightTorque = calculateRightTorque();

            let tiltAngle = netTorque / 100;
            tiltAngle = Math.max(Math.min(tiltAngle, 30), -30);

            seesawPlank.style.transform = `translateX(-50%) rotate(${tiltAngle}deg)`;

            tiltAngleValue.textContent = `${tiltAngle.toFixed(1)}°`;
            leftTotalTorque.textContent = `${netLeftTorque.toFixed(1)}°`;
            rightTotalTorque.textContent = `${netRightTorque.toFixed(1)}°`;

            const side = distanceFromCenter < 0 ? "left" : "right";
            const absDistance = Math.abs(distanceFromCenter).toFixed(1);
            const angleImpact = (nextBoxWeight * distanceFromCenter / 100).toFixed(1);

            const entry = `A ${nextBoxWeight} kg box was placed ${absDistance}px to the ${side} of the center, affecting the seesaw tilt by ${angleImpact}°.`;

            addLogEntry(entry);
            
            nextBoxWeight = getWeightForBalance(Math.abs(distanceFromCenter));
            nextBoxWeightValue.textContent = `${nextBoxWeight} kg`;
            
            createWeightObject(seesawPlank, clickX, nextBoxWeight, true);

            saveSeesawState(
                getBoxData(),
                leftTotalWeight,
                rightTotalWeight,
                tiltAngle,
                eventLogs
            );
        }, 600);
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const savedState = loadSeesawState();
    if(savedState)
    {
        setSeesawState(savedState);

        const plankRect = seesawPlank.getBoundingClientRect();
        const centerX = plankRect.width / 2;

        savedState.boxData.forEach(box => {
            const clickX = centerX + box.distance;
            createWeightObject(seesawPlank, clickX, box.weight, false);
        });

        leftTotalWeightValue.textContent = `${savedState.leftTotalWeight.toFixed(1)} kg`;
        rightTotalWeightValue.textContent = `${savedState.rightTotalWeight.toFixed(1)} kg`;
        tiltAngleValue.textContent = `${savedState.tiltAngle.toFixed(1)}°`;
        seesawPlank.style.transform = `translateX(-50%) rotate(${savedState.tiltAngle}deg)`;

        if(savedState.eventLogs && savedState.eventLogs.length > 0)
        {
            const eventLogContainer = document.getElementById("event-log-container");
            eventLogs = savedState.eventLogs;
            savedState.eventLogs.forEach(entry => {
                const logDiv = document.createElement("div");
                logDiv.classList.add("log-entry");
                logDiv.textContent = entry;
                eventLogContainer.appendChild(logDiv);
            });
        }
    }
});

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
    clearSeesawState();
    location.reload();
});