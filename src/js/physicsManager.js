let leftTotalWeight = 0;
let rightTotalWeight = 0;

let boxData = [];

export function updateTotalWeights(boxWeight, distanceFromCenter) {
    boxData.push({ weight: boxWeight, distance: distanceFromCenter});

    if(distanceFromCenter < 0)
    {
        leftTotalWeight += boxWeight;
    } else {
        rightTotalWeight += boxWeight;
    }
}

export function calculateNetTorque() {
    let totalTorque = 0;

    boxData.forEach(box => {
        totalTorque += box.weight * box.distance;
    });

    return totalTorque;
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