var modulo,document, img,toggleActive,current,next,previous;

leftbutton = document.querySelector(".slider-left-button")
rbutton = document.querySelector(".slider-right-button")
img = document.querySelectorAll(".slider-content")


toggleActive = function (a) {
    a.classList.toggle("active-image");
}

modulo = function(number,mod){
    return ((number % mod)+mod) % mod;
};

current = 0

next = function(array) {
    current = modulo(current,3);
    toggleActive(array[current]);
    current+=1;
    current = modulo(current,3);
    toggleActive(array[current])
}


previous = function(array) {
    current = modulo(current,3);
    toggleActive(array[current]);
    current-=1;
    current = modulo(current,3);
    toggleActive(array[current])
}

leftbutton.addEventListener("click", e =>{
    next(img)
})
rbutton.addEventListener("click", e =>{
    previous(img)
})

