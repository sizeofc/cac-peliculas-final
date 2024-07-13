const form = document.getElementById('formulario');
const usuario = document.getElementById('usuario');
const password = document.getElementById('password');
const errorUser = document.getElementById('e-usuario');
const errorPass = document.getElementById('e-password');


form.addEventListener('submit',function(event){
    event.preventDefault();
 
    if(validarForm())
        form.submit();
    

})
    
function validarForm(){
    let isValid= true;
    console.log(usuario.value);
    if(!usuario.value.trim()){
        errorUser.innerText = 'El usuario es requerido';
        isValid= false;
    }
    console.log(password.value);
    if(!password.value.trim()){
        errorPass.innerText = 'La contraseña es requerida';
        isValid= false;
    }
    return isValid;
}

usuario.addEventListener('input', function(e){
    errorUser.textContent="";
})
password.addEventListener('input', function(e){
    errorPass.textContent="";
})