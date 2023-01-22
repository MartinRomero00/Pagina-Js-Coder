const sponsor = document.getElementById("sponsor");

sponsor.addEventListener("click" , () => {
  Swal.fire({
    imageUrl: '/Styles/images/sponsor.png',
    imageHeight: 220,
  })
})


const form = document.getElementById("form");

form.addEventListener("submit" , (e) => {
    Swal.fire({
        title: "Su consulta fue enviada"
    })
    e.preventDefault();
    form.reset();
})