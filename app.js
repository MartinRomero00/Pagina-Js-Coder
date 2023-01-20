let carrito = [];

const modal = document.getElementById("ventanaModal");
const boton = document.getElementById("abrirModal");
const span = document.getElementsByClassName("cerrar")[0];


boton.addEventListener("click" , () => {
    modal.style.display = "block";
});

span.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click" , (e) => {
    if (e.target == modal) {
        modal.style.display = "none"
    }
});

