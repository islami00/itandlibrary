var modulo,document,leftButton,rButton,img,toggleActiveImg,currentImg,next,previous,skipTo,buttonSpan,buttonRem,slider,buttons,offButton;
var previousImage, togglePrevious,previousRem,styleCss,returnStyleSheet, returnRuleObj,setPreviousAnimation, setActiveAnimation, toggleActiveSel
// for expandability, use js to create slider buttons all to length of image array
// then replace three with image array length
// might want to blur out the spans at a point then start moving thru
leftButton = document.querySelector(".slider-left-button");
rButton = document.querySelector(".slider-right-button");
img = document.querySelectorAll(".slider-content");
buttonSpan = document.querySelectorAll(".slider-button");
slider = document.querySelector(".slider")
buttons = [leftButton,rButton]
previousImage = document.querySelector(".previous-image")
sheets = document.styleSheets

returnStyleSheet = function(styleName){
    for(let i = 0; i < sheets.length; i++){
        if (String(sheets[i].href).includes(styleName)){
            return sheets[i].cssRules;
        };
    };
};
styleCss = returnStyleSheet("style.css")

// returns a js manipulable object for element, nb: works only for innate scripts and sheets on chrome
returnRuleObj = function(stSheet,selector){
    for(let i = 0; i < stSheet.length; i++){
        if (String(stSheet[i].selectorText) === (selector)){
            return stSheet[i].style;
        };
    };
};

prevRules = returnRuleObj(styleCss,"img.previous-image")
activeRules = returnRuleObj(styleCss,"img.active-image")
//use setAttribute to set src, get attribute to get src

// edit stylecss animations
setPreviousAnimation = function(animRule){
    prevRules.animation = animRule;
};
setActiveAnimation = function(animRule){
    activeRules.animation = animRule;
};

// class editing backbone
previousRem = function(a) {
    for (let index = 0; index < a.length; index++) {
        const element = a[index];
        if (String(element.classList).includes("previous-image")) {
            togglePrevious(element);
        };   
    };
};

togglePrevious = function(a) {
    a.classList.toggle("previous-image");
};
toggleActiveImg = function (a) {
    a.classList.toggle("active-image");
};
toggleActiveSel = function (a) {
    a.classList.toggle("active-button");
};
// non-negative modulus
modulo = function(number,mod){
    return ((number % mod)+mod) % mod;
};

// keeps track of image index
currentImg = 0;

// next button logic
next = function(array) {
    currentImg = modulo(currentImg,3);
    toggleActiveImg(array[currentImg]);
    togglePrevious(array[currentImg]);
    currentImg += 1;
    currentImg = modulo(currentImg,3);
    toggleActiveImg(array[currentImg]);
};

// previous button logic
previous = function(array) {
    currentImg = modulo(currentImg,3);
    toggleActiveImg(array[currentImg]);
    togglePrevious(array[currentImg]);
    currentImg-=1;
    currentImg = modulo(currentImg,3);
    toggleActiveImg(array[currentImg]);
};

buttonRem = function(){
    // button remove
    for (let sIndex = 0; sIndex < buttonSpan.length; sIndex++) {
        if (String(buttonSpan[sIndex].classList).includes("active-button")){
            toggleActiveSel(buttonSpan[sIndex]);
        };
    };
};

skipTo = function(currSelIndex,imgArray) {
    // image change over
    toggleActiveImg(imgArray[currentImg]);
    currentImg = currSelIndex;
    toggleActiveImg(imgArray[currSelIndex]);
    // button change over
        buttonRem();
        // button switch
        toggleActiveSel(buttonSpan[currSelIndex]);
};

offButton = function(buttonArray) {
    for (let i = 0; i < buttonArray.length; i++) {
        const thisButton = buttonArray[i];
        thisButton.classList.toggle("buttonOff");
    };
};
// add listener for slider control
for (let i = 0; i < buttonSpan.length; i++) {
    buttonSpan[i].addEventListener("click", e =>{
        // remove previous to avoid issue , r and l can start from wherever
        previousRem(img);
        // remove animations
        setPreviousAnimation("");
        setActiveAnimation("");
        // skip to image
        skipTo(i,img);
    });
};

leftButton.addEventListener("click", e =>{
    //remove previous
    previousRem(img)
    // add animations to style
    setPreviousAnimation("animate-prev-previous 1.5s ease-in-out")
    setActiveAnimation("animate-active-previous 1.5s ease-in-out")
    //switch slides
    previous(img);
    // button remove
    buttonRem();
    // switch button to curr
    toggleActiveSel(buttonSpan[currentImg])
});
rButton.addEventListener("click", e =>{
    //remove previous
    previousRem(img)
    //add animations
    setPreviousAnimation("animate-prev-next 1.5s ease-in-out")
    setActiveAnimation("animate-active-next 1.5s ease-in-out")
    // switch slides
    next(img);
    // button remove
    buttonRem();
    // switch button to current
    toggleActiveSel(buttonSpan[currentImg])
});

slider.addEventListener("mouseover",e => {
    offButton(buttons);
});
slider.addEventListener("mouseout",e => {
    offButton(buttons);
});
// remember to remove "on" for event names
// later style add fade out with onmousein and onmouseout
