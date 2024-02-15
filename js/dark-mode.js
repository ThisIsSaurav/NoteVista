let dark_btn = document.getElementById("dark")
let header = document.querySelector("header");
let body = document.querySelector("body")
let add = document.getElementById("add");


let note = document.getElementsByClassName("note")
let noteArray = Array.from(note);


dark_btn.addEventListener("click",function(){
    header.classList.toggle("dark-mode");
    body.classList.toggle("dark-mode-half");
    add.classList.toggle("dark-mode");
    

    for (let i = 0; i < noteArray.length; i++) {
        noteArray[i].classList.toggle("dark-mode");
    }
    
})