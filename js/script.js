
showMyNotes(); // Function to show notes

let add_btn = document.getElementById("add");

// Event Listener to listen the event from the add note button and add note 
add_btn.addEventListener("click", function () {
    let noteground_title = document.getElementById("noteground-title");
    let noteground = document.getElementById("noteground");


    if (noteground.value == "" && noteground_title.value == "") {
        alert("Please add some note first")
    }
    else {
        let notes_title = localStorage.getItem("notes-title");
        let notes = localStorage.getItem("notes");

        if (notes == null && notes_title == null) {
            notesObj = [];
            notesTitleObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
            notesTitleObj = JSON.parse(notes_title);
        }
        notesObj.push(noteground.value);
        notesTitleObj.push(noteground_title.value);
        localStorage.setItem("notes-title", JSON.stringify(notesTitleObj));
        localStorage.setItem("notes", JSON.stringify(notesObj));

        noteground.value = "";
        noteground_title.value = "";

        showMyNotes();

    }

})

// Function to show Notes Everytime when it call 
function showMyNotes(index) {

    let notes_title = localStorage.getItem("notes-title");
    let notes = localStorage.getItem("notes");

    if (notes == null && notes_title == null) {
        notesObj = [];
        notesTitleObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        notesTitleObj = JSON.parse(notes_title);
    }

    let html = "";

    for (let i = 0; i < notesObj.length; i++) {

        html += `<div class="note" id="${i + 1}">
        <h4>Note ${i + 1}</h4>
        <textarea name="note${i + 1}-title" id="note${i + 1}title" class="note-title" readonly>${notesTitleObj[i]}</textarea> 
        <textarea name="note${i + 1}" id="note${i + 1}" class="note-subtitle"  readonly>${notesObj[i]}</textarea> 
        <div class="note-area-btn">
        <button class="delete-btn" id="${i}" onclick = "deleteMyNotes(this.id)" title="Delete Note">
        <img src="Img/delete_icon.png" alt="" width="19px">
        </button>
        <button class="edit-btn" id="${i}" title="Edit Note" onclick = "editMyNotes(this.id)">
        <img src="Img/edit_icon.png" alt="" width="19px">
        </button>
        <button class="copy-btn" id="${i}" onclick = "copyMyNotes(this.id)" title="Mark Important">
        <img src="Img/copy_icon.png\" alt="" width="19px">
        </button>
        </div>
        </div>`;

        let notesArea = document.getElementById("notes-area");
        notesArea.innerHTML = html;
    }
}


// Function used to delete a particular Note 

function deleteMyNotes(index){
    let notes_title = localStorage.getItem("notes-title");
    let notes = localStorage.getItem("notes");

    if (notes == null && notes_title == null) {
        notesObj = [];
        notesTitleObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        notesTitleObj = JSON.parse(notes_title);
    }
    notesObj.splice(index,1);
    notesTitleObj.splice(index,1);

    localStorage.setItem("notes-title", JSON.stringify(notesTitleObj));
    localStorage.setItem("notes", JSON.stringify(notesObj));

    showMyNotes();

}

// Function to copy text from note and paste it to clipboard
function copyMyNotes(index){
    let title = document.getElementsByClassName("note-title");
    let subtitle = document.getElementsByClassName("note-subtitle");


    navigator.clipboard.writeText("Title:-" + title[index].value + "\nNote :- " +subtitle[index].value);

    note = document.getElementsByClassName("note")
    setTimeout(() => {
        note[index].classList.toggle("copy-note");
    }, 100);

    setTimeout(() => {
        note[index].classList.toggle("copy-note");
    }, 300);
}

// Function to edit note 
function editMyNotes(index){
    let noteground_title = document.getElementById("noteground-title");
    let noteground = document.getElementById("noteground");
    let title = document.getElementsByClassName("note-title");
    let subtitle = document.getElementsByClassName("note-subtitle");

    noteground_title.value = title[index].value;
    noteground.value = subtitle[index].value;
    deleteMyNotes(index);
}


// Script for Search Button 
let searchtxt = document.getElementById("search-bar")
let title = document.getElementsByClassName("note-title"); //Its is the Saved Note Title
let ground = document.getElementsByClassName("ground");   //Its is the main ground where we enter our note


searchtxt.addEventListener("input", function () {
    let input = searchtxt.value; 
    note = document.getElementsByClassName("note");
    Array.from(note).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("textarea")[0].innerText

        if (cardTxt.toLowerCase().includes(input.toLowerCase())) {
            element.style.display = "block"
            ground.style.display = "none";
        }
        else {
            element.style.display = "none"
           ground[0].style.display = "none";

        }
    })

})
