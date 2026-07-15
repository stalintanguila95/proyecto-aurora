"use strict";

const escenas = document.querySelectorAll(".escena");
const botonesSiguiente = document.querySelectorAll(".boton-siguiente");
const botonReiniciar = document.querySelector("#reiniciar");

let cambiandoEscena = false;

function obtenerEscenaActiva() {
  return document.querySelector(".escena.activa");
}

function mostrarEscena(idEscena) {
  const escenaActual = obtenerEscenaActiva();
  const nuevaEscena = document.getElementById(idEscena);

  if (!nuevaEscena) {
    console.error(`No existe la escena: ${idEscena}`);
    return;
  }

  if (cambiandoEscena || escenaActual === nuevaEscena) {
    return;
  }

  cambiandoEscena = true;

  if (!escenaActual) {
    nuevaEscena.classList.add("activa");
    cambiandoEscena = false;
    return;
  }

  escenaActual.classList.add("saliendo");

  window.setTimeout(() => {
    escenaActual.classList.remove("activa", "saliendo");
    nuevaEscena.classList.add("activa");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    cambiandoEscena = false;
  }, 600);
}

botonesSiguiente.forEach((boton) => {
  boton.addEventListener("click", () => {
    mostrarEscena(boton.dataset.siguiente);
  });
});

if (botonReiniciar) {
  botonReiniciar.addEventListener("click", () => {
    mostrarEscena("codigo-00");
  });
}