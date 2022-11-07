const btn = document.getElementById('button');
const limpiar = document.getElementById('limpiar');
const formulario = document.getElementById('form')
const nombre = document.getElementById('nombre')
const email = document.getElementById('email')
const mensaje = document.getElementById('mensaje')

const camposVacios = document.getElementById('vacio')
const errorMail = document.getElementById('errorMail')
const mensajeEnviado = document.getElementById('enviado')

//-------------------Extra: Envio de Email con emailjs---------------------------------
formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    if (nombre.value !== "" || email.value !== "" || mensaje.value !== "") {
        if (!validateEmail(email.value)) {
            errorMail.style.display = "block";
            setTimeout(() => {
                errorMail.style.display = "none";
            }, 3000);
        } else {
            btn.value = 'Enviando...';

            const serviceID = 'service_ak20yfj';
            const templateID = 'template_3yb8552';
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.value = 'Enviar';
                    mensajeEnviado.style.display = "block";
                    setTimeout(() => {
                        mensajeEnviado.style.display = "none";
                    }, 3000);
                }, (err) => {
                    btn.value = 'Enviar';
                    alert(JSON.stringify(err));
                });
        }
    } else {
        camposVacios.style.display = "block";
        setTimeout(() => {
            camposVacios.style.display = "none";
        }, 3000);
    }
})

//------------Validar email---------------------
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

//------------Limpiar formulario----------------
function Limpiar() {
    nombre.value = ""
    email.value = ""
    mensaje.value = ""
}
limpiar.addEventListener('click', Limpiar)