var modulo,document,leftButton,rButton,img,toggleActiveImg,currentImg,next,previous,skipTo,buttonSpan,buttonRem;
// for expandability, use js to create slider buttons all to length of image array
// then replace three with image array length
// might want to blur out the spans at a point then start moving thru

leftButton = document.querySelector(".slider-left-button");
rButton = document.querySelector(".slider-right-button");
img = document.querySelectorAll(".slider-content");
buttonSpan = document.querySelectorAll(".slider-button");

toggleActiveImg = function (a) {
    a.classList.toggle("active-image");
};
toggleActiveSel = function (a) {
    a.classList.toggle("active-button");
};
modulo = function(number,mod){
    return ((number % mod)+mod) % mod;
};

currentImg = 0;

next = function(array) {
    currentImg = modulo(currentImg,3);
    toggleActiveImg(array[currentImg]);
    currentImg+=1;
    currentImg = modulo(currentImg,3);
    toggleActiveImg(array[currentImg]);

};


previous = function(array) {
    currentImg = modulo(currentImg,3);
    toggleActiveImg(array[currentImg]);
    currentImg-=1;
    currentImg = modulo(currentImg,3);
    toggleActiveImg(array[currentImg]);

};

buttonRem = function(){
    // button remove
    for (let sIndex = 0; sIndex < buttonSpan.length; sIndex++) {
        if (buttonSpan[sIndex].classList = "slider-button active-button"){
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

// add listener for slider control
for (let i = 0; i < buttonSpan.length; i++) {
    buttonSpan[i].addEventListener("click", e =>{
        skipTo(i,img);
    });
};

leftButton.addEventListener("click", e =>{
    previous(img);
    // button remove
    buttonRem();
    // switch button to curr
    toggleActiveSel(buttonSpan[currentImg])
});
rButton.addEventListener("click", e =>{
    next(img);
    // button remove
    buttonRem();
    // switch button to curr
    toggleActiveSel(buttonSpan[currentImg])
});


// later style add fade out with onmousein and onmouseout
