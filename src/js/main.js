import { 
    getRandomWeight,
    createWeightObject,
    updatePreviewWeightObjectPosition,
    removePreviewBox
} from "./objectManager.js";

const seesawPlank =  document.getElementById('seesaw-plank');
const nextBoxWeightValue = document.querySelector('.next-box-weight-value')

let nextBoxWeight = getRandomWeight();
nextBoxWeightValue.textContent = `${nextBoxWeight} kg`;

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

        nextBoxWeight = getRandomWeight();
        nextBoxWeightValue.textContent = `${nextBoxWeight} kg`;

        createWeightObject(seesawPlank, clickX, nextBoxWeight, true);
    }
});