//Variables:
const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

//DOM(s):
let gridDOM = document.querySelector('#grid');
let gridElementDOM = document.getElementsByClassName('grid-element');
let clearBtnDOM = document.querySelector('#clearBtn');
let sizeSliderTextDOM = document.querySelector('#sizeSliderText');
let sizeSliderDOM = document.querySelector('#sizeSlider');

//Mouse Events
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

//Size Slider-Event
sizeSlider.onchange = (event) => {
    clear();
    adjustGridSize(event.target.value)
}
sizeSlider.onmousemove = (event) => reviseSizeSliderText(event.target.value)

//Setting Color:
function setCurrentColor(newColor){
    currentColor = newColor;
}

//Setting Mode:
function setCurrentMode(newMode){
    currentMode = newMode;
}

//Setting Current Size:
function setCurrentSize(newSize){
    currentSize = newSize;
}

//Setting grids:
function setupGridSize(size){
    gridDOM.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridDOM.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    clearBtnDOM.addEventListener("click", clear);
    for(let i = 0; i<size * size; i++){
        let gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
        gridDOM.appendChild(gridElement);
    }
}

//Coloring
function changeColor(event){
    if(event && event.type === 'mouseover' && !mouseDown) return
        if(currentMode === 'color'){  
            event.target.style.backgroundColor = currentColor;         
        }else if(currentMode === 'rainbow'){
            const randomR = Math.floor(Math.random() * 256);
            const randomG = Math.floor(Math.random() * 256);
            const randomB = Math.floor(Math.random() * 256);
            event.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
        }else if(currentMode === 'eraser'){
            event.target.style.backgroundColor = '#fefefe'; 
        }
}

//Clear
function clear(){
    for (let i = 0; i < gridElementDOM.length * gridElementDOM.length; i++) {
        gridElementDOM[i].style.backgroundColor = '#fefefe';
    }
}

//Adjust Grid Size
function adjustGridSize(size){ 
    setCurrentSize(size);
    setupGridSize(size); 
}

//Size Slider Text
function reviseSizeSliderText(text){
    sizeSliderTextDOM.innerHTML = `${text} x ${text}`;
}

//Windows loading processes
window.onload = ()=> {
    setupGridSize(DEFAULT_SIZE);
    setCurrentMode(DEFAULT_MODE);
    setCurrentColor(DEFAULT_COLOR);
}


