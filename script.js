const fraseUno = document.getElementById("fraseUno");
const fraseDos = document.getElementById("fraseDos");
const contenedorFoto = document.getElementById("contenedorFoto");

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
        duracion: 5500,
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
        texto: "A veces, sin darnos cuenta, alguien decide caminar a nuestro lado, permanecer en los momentos que más pesan y recorrer ese camino con nosotros.",
        duracion: 8500,
        etapaFoto: "etapa-7"
    },
    {
        texto: "Hay personas que cambian nuestra vida para siempre.",
        duracion: 5500,
        etapaFoto: "etapa-8"
    },
    {
        texto: "No por cuánto tiempo estuvieron...",
        duracion: 5000,
        etapaFoto: "etapa-9"
    },
    {
        texto: "Sino por todo lo que dejaron en nuestro corazón.",
        duracion: 6500,
        etapaFoto: "etapa-10"
    }
];

function esperar(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function cambiarEtapaFoto(etapa) {
    contenedorFoto.className = `contenedor-foto ${etapa}`;
}

async function mostrarFrase(escena) {
    cambiarEtapaFoto(escena.etapaFoto);

    fraseUno.textContent = escena.texto;
    fraseUno.classList.add("visible");

    await esperar(escena.duracion);

    fraseUno.classList.remove("visible");

    await esperar(1800);
}

async function comenzarAurora() {
    cambiarEtapaFoto("etapa-1");

    await esperar(3000);

    for (const escena of escenas) {
        await mostrarFrase(escena);
    }

    cambiarEtapaFoto("etapa-final");

    fraseUno.textContent = "";
    fraseDos.textContent = "";

    await esperar(12000);
}

window.addEventListener("load", comenzarAurora);