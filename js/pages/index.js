const loader = document.getElementById("loader")

//------------------Consulto datos de localStorage------------------------------
ciudad_get = localStorage.getItem("Lista_Ciudades")
lista = JSON.parse(ciudad_get)
if (lista) {
    document.getElementById("empty").style.display = "none";
}

/*bucle para crear las opciones a medida q se ingresa una ciudad*/
for (i = 0; i <= lista.length; i++) {
    const select = document.querySelector('select')
    const opcion = document.createElement("option")
    opcion.value = lista[i]
    opcion.textContent = lista[i]
    select.appendChild(opcion)
}
//-----------------------------Solicitud a la API-----------------------------------------------

const botonConsultar = document.getElementById("consultar")
const seleccionCiudad = document.getElementById("seleccionable")

function ConsultarDatos(city) {
    const key = 'cf3c32eca5c309cab34ab9b732fd66a3'
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=es`)
        .then(response => response.json())
        .then(data => mostrarDatos(data))
}

function mostrarDatos(datos) {
    let ciudad_buscar = datos.name
    let ico = datos.weather[0].icon
    let temp = datos.main.temp
    let sens = datos.main.feels_like
    let hum = datos.main.humidity
    let vel_viento = datos.wind.speed
    let pres = datos.main.pressure
        //-------------Extra: contemplar errores de la respuesta de API-----------------------
    let codigo = datos.cod
    if (codigo == "404") {
        ciudad.value = ""
        loader.style.display = "flex";
        setTimeout(() => {
            loader.style.display = "none";
        }, 2000);
        setTimeout(() => {
            error_mesage()
        }, 2000);
    } else {
        document.getElementById("city").innerHTML = `${ciudad_buscar}`
        document.getElementById("icon").setAttribute('src', `https://openweathermap.org/img/wn/${ico}@2x.png`)
        document.getElementById("temp").innerHTML = `Temperatura: ${temp}°`
        document.getElementById("sensacion").innerHTML = `Sensacion térmica: ${sens}°`
        document.getElementById("humedad").innerHTML = `Humedad: ${hum}%`
        document.getElementById("viento").innerHTML = `velocidad_viento: ${vel_viento}km/h`
        document.getElementById("presion").innerHTML = `presion: ${pres}P`

        document.getElementById("card").style.display = "none";
        loader.style.display = "block";
        setTimeout(() => {
            loader.style.display = "none";
        }, 3000);
        setTimeout(() => {
            document.getElementById("card").style.display = "flex";
        }, 3000);
    }
}

//-------------Escucho el click de consultar datos-----------------------------------------
botonConsultar.addEventListener("click", async() => {
    const ciudad = seleccionCiudad.value
    const resultadoClima = await ConsultarDatos(ciudad)
})