
const nombreImput = document.querySelector('#nombre-imput');
const phoneImput = document.querySelector('#phone-imput');
const formbtn = document.querySelector('#form-btn');
const form = document.querySelector('#form');
const list = document.querySelector('#list');

//regex
const NOMBRE_REGEX = /^(([A-Za-z]){2,20}\s){1}[A-Za-z]{2,20}$/;
const PHONE_REGEX = /^[0](412|414|416|424|426|212)[0-9]{7}$/;
//validations
let nombreValidation = false;
let phoneValidation = false;

//fuction
 const validateImput = (Imput, regexValidation) => {
    const infoText = Imput.parentElement.children[1];

formbtn.disabled = nombreValidation && phoneValidation ? false : true;

if (Imput.value === ''){
    Imput.classList.remove('correct');
    Imput.classList.remove('wrong');
    infoText.classList.remove('show');
}else if(regexValidation){
    Imput.classList.add('correct');
    Imput.classList.remove('wrong');
    infoText.classList.remove('show');
}else{
    Imput.classList.remove('correct');
    Imput.classList.add('wrong');
    infoText.classList.add('show');
}
 }

nombreImput.addEventListener('input', e => {
nombreValidation = NOMBRE_REGEX.test(nombreImput.value);
validateImput(nombreImput, nombreValidation);

});

phoneImput.addEventListener('input', e => {
    phoneValidation = PHONE_REGEX.test(phoneImput.value);
    validateImput(phoneImput, phoneValidation);
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        //crear usuario de la lista
        const li = document.createElement('li');
        //creo contenido del li dependiendo de lo que escribio el usuario en los imput
        li.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete-button">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
      <div class="text">
        <input type="text" id= "nombre-imput" value="${nombreImput.value}" readonly>
        <input type="text" id= "phone-imput"  value="${phoneImput.value}" readonly>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit-icon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>`;


        //agrego el elemento a la lista 
        list.append(li);
        //limpio los imputs
        nombreImput.value = '';
        phoneImput.value = '';
        validateImput(nombreImput);
        validateImput(phoneImput);
        nombreValidation = false;
        phoneValidation = false;
        formbtn.disabled = true;        
        //guardar en localStorage (navegador)
        localStorage.setItem('ListaContactos', list.innerHTML);
    });

    list.addEventListener('click', e => {
if (e.target.closest('.delete-button')){
     e.target.closest('.delete-button').parentElement.remove();
    localStorage.setItem('ListaContactos', list.innerHTML);
}

    if (e.target.closest('.edit-icon')){
        //selecciono el icono de editar
        const editIcon = e.target.closest('.edit-icon');
        //2.seleciono el icono
        console.log(editIcon);
        const editNombreImput = editIcon.parentElement.children[1];
        const editPhoneImput = editIcon.parentElement.children[2];
        console.log(editNombreImput);
        //3. defino mi condicional usando una clase llamada editando para saber el estado del boton
        if(editIcon.classList.contains('.editando')){
            //cuando edita
            //remuevo la clase de editando para indicar que esta guardando los cambios
            editIcon.classList.remove('.editando');
            //guardo el nuevo valor de imput
            editPhoneImput.setAttribute('value', editPhoneImput.value);
            editPhoneImput.setAttribute('readonly', true);
            editNombreImput.setAttribute('value', editNombreImput.value);
            editNombreImput.setAttribute('readonly', true);
            //coloco el icono de editar
            editIcon.innerHTML = 
            '<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />'
        //guardo en localstorage
        localStorage.setItem('listaContactos', list.innerHTML);
        }else {
            //nueva clase editando para indicar el estado del boton
            editIcon.classList.add('.editando');

            //renuevo el atributo redondly para poder escribir en el imput
        editPhoneImput.removeAttribute('readonly');
        editNombreImput.removeAttribute('readonly');
        //cambio el icono a un lapiz para indicar que el usuario esta editando
        editIcon.innerHTML = 
  '<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />'

        }
       


    }
    });
    
    //para que se quede cuando refrescas la pagina
    (() => {
    const locaList = localStorage.getItem('ListaContactos');
    list.innerHTML = locaList;
    })();















