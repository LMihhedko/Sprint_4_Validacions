
let emailsList = [];
let passwordList = [];

//comprobar si tenemos una lista guardada en el storage 
window.onload=function() {

    if (localStorage.getItem('email') == undefined) {
		localStorage.setItem('email', ['usuario@prueba.com'])
	}

    if (localStorage.getItem('password') == undefined) {
		localStorage.setItem('password', ['Prueba123'])
	}

	if (localStorage.getItem('email') !== undefined) {
		//recuperar la lista
		let lista1 = localStorage.getItem('email')

		//convertir la cadena de texto del storage a array
		emailsList = lista1.split('//');
		console.log(emailsList)
	}

    if (localStorage.getItem('password') !== undefined) {
		//recuperar la lista
		let lista2 = localStorage.getItem('password')

		//convertir la cadena de texto del storage a array
		passwordList = lista2.split('//');
		console.log(passwordList)
	}
}

function validateSearch() { 
    //searched words
    const searched = document.getElementById('search-bar').value
    //search input
    const searchInput = document.getElementById('search-bar')
    
    searchInput.classList.remove("is-invalid");

    if (!searched) {  
        searchInput.classList.add("is-invalid");
        document.getElementById("errorSearch").textContent = "El campo es obligatorio"; 
        return false;
    } else if (searched.length < 4) {
        searchInput.classList.add("is-invalid");
        document.getElementById("errorSearch").textContent = "El mínimo de carácteres es 4"; 
        return false;
    } else {
        searchInput.classList.add("is-valid");
        return true;
    }
}

function validateLogin() {
    //email
    const emailInput = document.getElementById('email');
    const email = document.getElementById('email').value;
    //password
    const passwordInput = document.getElementById('pwd');
    const password = document.getElementById('pwd').value;
    //reg
    let reg= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    let canSubmit = true;
    
    if (!email) {
        emailInput.classList.add("is-invalid");
		document.getElementById("errorEmail").textContent = "El campo es obligatorio";
        canSubmit = false;

    }else if (!reg.test(email)) {
        emailInput.classList.add("is-invalid");
		document.getElementById("errorEmail").textContent = "El email no es válido";
        canSubmit = false;
    }else if (!emailsList.includes(email)) {
        emailInput.classList.add("is-invalid");
		document.getElementById("errorEmail").textContent = "Este usuario no existe";
        canSubmit = false;
    }

    if (!password) {
        passwordInput.classList.add("is-invalid");
		document.getElementById("errorPassword").textContent = "El campo es obligatorio";
        canSubmit = false;
    } else {
        const passwordIndex = emailsList.indexOf(email);
        let emailPassword = passwordList[passwordIndex]
        if (password !== emailPassword) {
            passwordInput.classList.add("is-invalid");
            document.getElementById("errorPassword").textContent = "Contraseña incorrecta";
            canSubmit = false;
        }
    }

    return canSubmit;
}


function validateRegister() {
    //name
    const nameInput = document.getElementById('name');
    const name = document.getElementById('name').value;
    //email
    const emailInput = document.getElementById('email2');
    const email = document.getElementById('email2').value;
    //password
    const passwordInput = document.getElementById('psw2');
    const password = document.getElementById('psw2').value;
    //repeat password
    const passwordInput2 = document.getElementById('psw-repeat');
    const password2 = document.getElementById('psw-repeat').value;
    //select
    const select = document.getElementById("selectProvincia");
    const selectedValue = document.getElementById("selectProvincia").value;

    let canSubmit = true;


    //reg
    let reg= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    if (!name) {
        nameInput.classList.add("is-invalid");
		document.getElementById("errorName").textContent = "El campo es obligatorio";
        canSubmit = false;
    }

    if (!email) {
        emailInput.classList.add("is-invalid");
		document.getElementById("errorEmail-reg").textContent = "El campo es obligatorio";
        canSubmit = false;
    }else if (!reg.test(email)) {
        emailInput.classList.add("is-invalid");
		document.getElementById("errorEmail-reg").textContent = "El email no es válido";
        canSubmit = false;
    }else if (emailsList.includes(email)) {
        emailInput.classList.add("is-invalid");
		document.getElementById("errorEmail-reg").textContent = "Este usuario ya existe";
        canSubmit = false;
    }

    // solo valido la contraseña en el momento del registro, ya que doy por hecho que un usuario registrado
    // ya tendrá una contraseña válida
    if (password === "") {
        passwordInput.classList.add("is-invalid");
		document.getElementById("errorPass").textContent = "El campo es obligatorio";
        canSubmit = false;
    } else if (validatePassword(password) == false ) {
        passwordInput.classList.add("is-invalid");
		document.getElementById("errorPass").textContent = "La contraseña no es válida";
        canSubmit = false;
    } else {
        passwordInput.classList.remove("is-invalid");
    }

    if (password2 === "") {
        passwordInput2.classList.add("is-invalid");
		document.getElementById("errorPass2").textContent = "El campo es obligatorio";
        canSubmit = false;;
    } else if (password2 !== password) {
        passwordInput2.classList.add("is-invalid");
		document.getElementById("errorPass2").textContent = "Las constraseñas no coinciden";
        canSubmit = false;
    }

    if (selectedValue === "") {
        select.classList.add("is-invalid");
		document.getElementById("errorSelect").textContent = "El campo es obligatorio";
        canSubmit = false;
    }

    if (canSubmit == true) {
        save(email, password)
    }

    return canSubmit;

}

function validatePassword(password) {

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);

}

function save(email, password) {

    emailsList.push(email)
    passwordList.push(password)

    localStorage.setItem('email', emailsList.join('//'))
    localStorage.setItem('password', passwordList.join('//'))

}

