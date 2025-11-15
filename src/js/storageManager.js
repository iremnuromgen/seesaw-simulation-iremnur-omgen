const STORAGE_KEY = "seesaw_state";

export function saveSeesawState(boxData, leftTotalWeight, rightTotalWeight, tiltAngle, eventLogs = []) {
    const state = {
        boxData,
        leftTotalWeight,
        rightTotalWeight,
        tiltAngle,
        eventLogs
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadSeesawState() {
    const data = localStorage.getItem(STORAGE_KEY);
    if(!data) return null;
    return JSON.parse(data);
}

export function clearSeesawState() {
    localStorage.removeItem(STORAGE_KEY);
}