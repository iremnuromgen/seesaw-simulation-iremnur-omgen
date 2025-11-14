let leftTotalWeight = 0;
let rightTotalWeight = 0;

export function updateTotalWeights(boxWeight, distanceFromCenter) {
    if(distanceFromCenter < 0)
    {
        leftTotalWeight += boxWeight;
    } else {
        rightTotalWeight += boxWeight;
    }
}

export function getTotalWeights() {
    return { leftTotalWeight, rightTotalWeight };
}