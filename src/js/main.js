import { createWeightObject } from "./objectManager.js";

const seesawPlank =  document.getElementById('seesaw-plank');

seesawPlank.addEventListener('click', (event) => {
    const plankRect = seesawPlank.getBoundingClientRect();
    const clickX = event.clientX - plankRect.left;
    const centerX = plankRect.width / 2;
    const distanceFromCenter = clickX - centerX;

    if(clickX >= 0 && clickX <= plankRect.width) createWeightObject(seesawPlank, clickX, distanceFromCenter);
});