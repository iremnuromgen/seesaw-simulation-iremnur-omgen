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

let previewBox = null;

export function createWeightObject(plank, clickX, boxWeight, isPreview = false) {
    if(isPreview && previewBox) previewBox.remove();

    const box = document.createElement("div");
    const boxSize = 20 + boxWeight * 4;
    const left = clickX - boxSize / 2;

    box.classList.add(isPreview ? "preview-box" : "weight-box");
    box.style.width = `${boxSize}px`;
    box.style.height = `${boxSize}px`;
    box.style.backgroundColor = weightColors[boxWeight];    
    box.style.position = "absolute";
    box.style.bottom = "10px";
    box.style.left = `${left}px`;
    box.style.borderRadius = "4px";

    if(isPreview) {
        previewBox = box;
    } else {
        box.dataset.boxWeight = boxWeight;
    }

    plank.appendChild(box);
}

export function updatePreviewWeightObjectPosition(seesawPlank, mouseX) {
    if(!previewBox) return;

    const seesawPlankRect = seesawPlank.getBoundingClientRect();
    const previewBoxWidth = previewBox.offsetWidth;
    const clickX = mouseX - seesawPlankRect.left;
    const left = clickX - previewBoxWidth / 2;
    
    if(clickX >= 0 && clickX <= seesawPlankRect.width) {
        previewBox.style.left = `${left}px`;
        previewBox.style.display = "block";
    }
    else {
        previewBox.style.display = "none";
    }
}

export function removePreviewBox() {
    if(previewBox)
    {
        previewBox.remove();
        previewBox = null;
    }
}