const addBtn = document.getElementById('add')

const notes = JSON.parse(localStorage.getItem('notes'))

if(notes) {
    notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click', () => addNewNote())

//Seleccion de div principal
const mainDiv = document.getElementById('CuadroPrincipal')

function addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked(text)

    deleteBtn.addEventListener('click', () => {
        note.remove()

        updateLS()
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        main.innerHTML = marked(value)

        updateLS()
    })

    //Añade las notas al div principal
    CuadroPrincipal.appendChild(note)
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}

/*----------Darkmode-----------*/
const body = document.querySelector('body');
const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
  
    body.classList.toggle('darkmode');

  setTimeout(() => {
    icon.classList.remove('animated');
    
  }, 500)
})

/*-----------Color switcher notes------*/
document.querySelector('.switcher-btn').onclick = () =>{
   document.querySelector('.color-switcher').classList.toggle('active');
}   
let themeButtons = document.querySelectorAll('.botonTemas');  
themeButtons.forEach(color =>{
    color.addEventListener('click',  () =>{
        let dataColor =  color.getAttribute('data-color');
        let notes = document.querySelectorAll('.note');
        notes.forEach(note =>{
            note.style.setProperty('background-color', dataColor);
        });     
    });  
});
