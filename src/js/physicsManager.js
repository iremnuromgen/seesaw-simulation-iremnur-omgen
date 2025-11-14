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