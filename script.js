const frase = document.getElementById("frase");
const contenedorFoto = document.getElementById("contenedorFoto");

const escenas = [
    {
        texto:
            "Los recuerdos más hermosos no desaparecen; encuentran una nueva forma de acompañarnos.",
        duracion: 6500,
        etapaFoto: "etapa-1"
    },
    {
        texto:
            "Hay recuerdos que siguen encontrando el camino de regreso.",
        duracion: 5500,
        etapaFoto: "etapa-2"
    },
    {
        texto:
            "Hay momentos en los que el silencio pesa más que cualquier palabra.",
        duracion: 6000,
        etapaFoto: "etapa-3"
    },
    {
        texto:
            "Y hay días en los que el corazón quisiera volver atrás... solo por un instante.",
        duracion: 6500,
        etapaFoto: "etapa-4"
    },
    {
        texto:
            "Hay cosas que aprendemos a guardar detrás de una sonrisa.",
        duracion: 6000,
        etapaFoto: "etapa-5"
    },
    {
        texto:
            "Y aun así... continúan acompañándonos.",
        duracion: 5000,
        etapaFoto: "etapa-6"
    },
    {
        texto:
            "Hay personas que cambian nuestra vida para siempre.",
        duracion: 5500,
        etapaFoto: "etapa-7"
    },
    {
        texto:
            "No por cuánto tiempo estuvieron...",
        duracion: 5000,
        etapaFoto: "etapa-8"
    },
    {
        texto:
            "Sino por todo lo que dejaron en nuestro corazón.",
        duracion: 6500,
        etapaFoto: "etapa-9"
    }
];

function esperar(milisegundos) {
    return new Promise((resolve) => {
        setTimeout(resolve, milisegundos);
    });
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

async function comenzarAurora() {
    cambiarEtapaFoto("etapa-1");

    await esperar(3000);

    for (const escena of escenas) {
        cambiarEtapaFoto(escena.etapaFoto);

        await mostrarFrase(
            escena.texto,
            escena.duracion
        );
    }

    // La fotografía termina de aclararse y queda sola.
    cambiarEtapaFoto("etapa-final");

    await esperar(10000);

    // La fotografía desaparece.
    contenedorFoto.classList.add("desvanecer");

    await esperar(4500);

    // Mensaje de compañía al final.
    await mostrarFrase(
        "A veces, sin darnos cuenta, alguien decide caminar a nuestro lado, permanecer en los momentos que más pesan y recorrer ese camino con nosotros.",
        9000
    );

    await esperar(1200);

    // Última frase de la experiencia.
    await mostrarFrase(
        "Y cuando el camino vuelva a sentirse pesado... siempre habrá alguien dispuesto a recorrerlo contigo, sin importar la distancia.",
        7000,
        true
    );
}

window.addEventListener("load", comenzarAurora);