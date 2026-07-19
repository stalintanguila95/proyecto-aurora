const frase = document.getElementById("frase");
const contenedorFoto = document.getElementById("contenedorFoto");
const escenaFinal = document.getElementById("escenaFinal");
const musicaFondo = document.getElementById("musicaFondo");
const botonIniciar = document.getElementById("iniciar");

const escenas = [
    {
        texto: "Los recuerdos más hermosos no desaparecen; encuentran una nueva forma de acompañarnos.",
        duracion: 6500,
        etapaFoto: "etapa-1"
    },
    {
        texto: "Hay recuerdos que siguen encontrando el camino de regreso.",
        duracion: 5500,
        etapaFoto: "etapa-2"
    },
    {
        texto: "Hay momentos en los que el silencio pesa más que cualquier palabra.",
        duracion: 6000,
        etapaFoto: "etapa-3"
    },
    {
        texto: "Y hay días en los que el corazón quisiera volver atrás... solo por un instante.",
        duracion: 6500,
        etapaFoto: "etapa-4"
    },
    {
        texto: "Hay cosas que aprendemos a guardar detrás de una sonrisa.",
        duracion: 6000,
        etapaFoto: "etapa-5"
    },
    {
        texto: "Y aun así... continúan acompañándonos.",
        duracion: 5000,
        etapaFoto: "etapa-6"
    },
    {
        texto: "Hay personas que cambian nuestra vida para siempre.",
        duracion: 5500,
        etapaFoto: "etapa-7"
    },
    {
        texto: "No por cuánto tiempo estuvieron...",
        duracion: 5000,
        etapaFoto: "etapa-8"
    },
    {
        texto: "Sino por todo lo que dejaron en nuestro corazón.",
        duracion: 6500,
        etapaFoto: "etapa-9"
    }
];

let experienciaIniciada = false;

function esperar(milisegundos) {
    return new Promise((resolve) => setTimeout(resolve, milisegundos));
}

function cambiarEtapaFoto(etapa) {
    contenedorFoto.className = `contenedor-foto ${etapa}`;
}

async function mostrarFrase(texto, duracion, claseFinal = false, claseRegalo = false) {
    frase.textContent = texto;
    frase.classList.toggle("final", claseFinal);
    frase.classList.toggle("regalo", claseRegalo);
    frase.classList.add("visible");

    await esperar(duracion);

    frase.classList.remove("visible");
    await esperar(1900);

    frase.classList.remove("final", "regalo");
}

function subirVolumen(audio, volumenFinal = 0.32, duracion = 3500) {
    audio.volume = 0;

    const intervalo = 100;
    const pasos = Math.max(1, Math.round(duracion / intervalo));
    const incremento = volumenFinal / pasos;

    const temporizador = setInterval(() => {
        audio.volume = Math.min(volumenFinal, audio.volume + incremento);

        if (audio.volume >= volumenFinal) {
            clearInterval(temporizador);
        }
    }, intervalo);
}

async function iniciarMusica() {
    musicaFondo.currentTime = 0;
    musicaFondo.volume = 0;
    await musicaFondo.play();
    subirVolumen(musicaFondo);
}

async function comenzarAurora() {
    if (experienciaIniciada) return;
    experienciaIniciada = true;

    botonIniciar.hidden = true;

    cambiarEtapaFoto("etapa-1");
    await esperar(3000);

    for (const escena of escenas) {
        cambiarEtapaFoto(escena.etapaFoto);
        await mostrarFrase(escena.texto, escena.duracion);
    }

    cambiarEtapaFoto("etapa-final");
    await esperar(10000);

    contenedorFoto.classList.add("desvanecer");
    await esperar(4500);

    await mostrarFrase(
        "A veces, sin darnos cuenta, alguien decide caminar a nuestro lado, permanecer en los momentos que más pesan y recorrer ese camino con nosotros.",
        6500
    );

    await esperar(1200);

    await mostrarFrase(
        "Y cuando el camino vuelva a sentirse pesado... siempre habrá alguien dispuesto a recorrerlo contigo, sin importar la distancia.",
        6000,
        true
    );

    await esperar(1800);

    await mostrarFrase(
        "Hay un pequeño regalo para ti.",
        3800,
        false,
        true
    );

    await esperar(1000);

    escenaFinal.setAttribute("aria-hidden", "false");
    escenaFinal.classList.add("visible");
}

async function iniciarExperiencia() {
    // Los navegadores bloquean el audio con sonido si no existe
    // una interacción previa del usuario. Por eso mostramos un
    // botón inicial y empezamos música + experiencia con el mismo toque.
    botonIniciar.hidden = false;
}

botonIniciar.addEventListener("click", async () => {
    botonIniciar.disabled = true;

    try {
        await iniciarMusica();
        await comenzarAurora();
    } catch (error) {
        botonIniciar.disabled = false;
        botonIniciar.textContent = "Toca otra vez para comenzar";
    }
});

musicaFondo.addEventListener("ended", async () => {
    escenaFinal.classList.add("desvanecer");
    await esperar(8000);
    escenaFinal.classList.remove("visible");
    escenaFinal.setAttribute("aria-hidden", "true");
});

window.addEventListener("load", iniciarExperiencia);
