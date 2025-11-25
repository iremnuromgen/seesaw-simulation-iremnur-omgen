let leftTotalWeight = 0;
let rightTotalWeight = 0;

let boxData = [];
let rightData = [];
let leftData = [];

export function updateTotalWeights(boxWeight, distanceFromCenter) {
    boxData.push({ weight: boxWeight, distance: distanceFromCenter});

    if(distanceFromCenter < 0)
    {
        leftTotalWeight += boxWeight;
        leftData.push({ leftWeight: boxWeight, leftDistance: distanceFromCenter});
    } else {
        rightTotalWeight += boxWeight;
        rightData.push({ rightWeight: boxWeight, rightDistance: distanceFromCenter});
    }
}

export function calculateNetTorque() {
    let totalTorque = 0;

    boxData.forEach(box => {
        totalTorque += box.weight * box.distance;
    });

    return totalTorque;
}

export function calculateLeftTorque() {
    let leftTotalTorque = 0;

    leftData.forEach(box => {
        leftTotalTorque += box.leftWeight * box.leftDistance;
    });

    return leftTotalTorque;
}

export function calculateRightTorque() {
    let rightTotalTorque = 0;

    rightData.forEach(box => {
        rightTotalTorque += box.rightWeight * box.rightDistance;
    });

    return rightTotalTorque;
}

export function getTotalWeights() {
    return { leftTotalWeight, rightTotalWeight };
}

export function getBoxData() {
    return boxData;
}

export function setSeesawState(loadedData) {
    boxData = loadedData.boxData || [];
    leftTotalWeight = loadedData.leftTotalWeight || 0;
    rightTotalWeight = loadedData.rightTotalWeight || 0;
}