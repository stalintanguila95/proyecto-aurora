const frase = document.getElementById("frase");
const contenedorFoto = document.getElementById("contenedorFoto");
const botonRecuerdo = document.getElementById("botonRecuerdo");
const escenaFinal = document.getElementById("escenaFinal");
const musicaFinal = document.getElementById("musicaFinal");

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

function esperar(milisegundos) {
    return new Promise((resolve) => setTimeout(resolve, milisegundos));
}

function cambiarEtapaFoto(etapa) {
    contenedorFoto.className = `contenedor-foto ${etapa}`;
}

async function mostrarFrase(texto, duracion, claseFinal = false) {
    frase.textContent = texto;
    frase.classList.toggle("final", claseFinal);
    frase.classList.add("visible");

    await esperar(duracion);

    frase.classList.remove("visible");
    await esperar(1900);
}

async function mostrarBotonFinal() {
    botonRecuerdo.classList.add("activo");
    await esperar(50);
    botonRecuerdo.classList.add("visible");
}

function subirVolumen(audio, volumenFinal = 0.34, duracion = 5000) {
    audio.volume = 0;
    const intervalo = 100;
    const pasos = Math.max(1, duracion / intervalo);
    const incremento = volumenFinal / pasos;

    const temporizador = setInterval(() => {
        audio.volume = Math.min(volumenFinal, audio.volume + incremento);

        if (audio.volume >= volumenFinal) {
            clearInterval(temporizador);
        }
    }, intervalo);
}

async function abrirUltimoRecuerdo() {
    botonRecuerdo.disabled = true;
    botonRecuerdo.classList.add("oculto");

    await esperar(2200);

    escenaFinal.setAttribute("aria-hidden", "false");

    try {
        musicaFinal.currentTime = 0;
        await musicaFinal.play();
        subirVolumen(musicaFinal);
    } catch (error) {
        console.error("No se pudo reproducir la música:", error);
    }

    await esperar(1800);
    escenaFinal.classList.add("visible");
}

async function comenzarAurora() {
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
        9000
    );

    await esperar(1200);

    await mostrarFrase(
        "Y cuando el camino vuelva a sentirse pesado... siempre habrá alguien dispuesto a recorrerlo contigo, sin importar la distancia.",
        7000,
        true
    );

    await esperar(3500);
    await mostrarBotonFinal();
}

botonRecuerdo.addEventListener("click", abrirUltimoRecuerdo, { once: true });

musicaFinal.addEventListener("ended", async () => {
    escenaFinal.classList.add("desvanecer");
    await esperar(8000);
    escenaFinal.classList.remove("visible");
    escenaFinal.setAttribute("aria-hidden", "true");
});

window.addEventListener("load", comenzarAurora);
