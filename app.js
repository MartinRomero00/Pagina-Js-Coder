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


const btnCompra = document.getElementById("printf");

btnCompra.addEventListener("click" ,(e) => {
    if (e.target.classList.contains ("lol")) {
        validarProductoCarrito(e.target.id)
    }
});

const validarProductoCarrito = async (idProducto) => {
    const data = await getData();
    const repetido = carrito.find(producto => producto.id == idProducto)

    if (!repetido) {
        const producto = await data.find(producto => producto.id == idProducto);
        carrito.push(producto)
        pintarProductosCarrito(producto)
        actualizarTotalCarrito(carrito)
    } else {
        repetido.Stock++
        const cantProducto = document.getElementById(`cantCarrito${repetido.id}`)
        cantProducto.innerHTML = `Cantidad: ${repetido.Stock}`
        actualizarTotalCarrito(carrito);
    }

};

const pintarProductosCarrito = (producto) => {
    const contenedor = document.getElementById("contenedorCarrito");
    const div = document.createElement('div')
    div.classList.add("flex,justify-evenly,flex-wrap,mt-10")
    div.innerHTML= `
    <p class="flex justify-around ml-8 text-center">${producto.Nombre} ${producto.Marca}<span class="text-blue-600 text-center">$${producto.Precio}</span></p>
    <p class="text-center flex justify-end mr-10" id="cantCarrito${producto.id}">Cantidad: ${producto.Stock}</p>
    <button type="button" class=" px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out btn" id="delete-${producto.id}">Eliminar</button>
    `
    contenedor.appendChild(div);
    document.getElementById(`delete-${producto.id}`).addEventListener("click", function(){
        eliminarProductoCarrito(producto.id);
    });
};


const actualizarTotalCarrito =  (carrito) => {
    const totalCantidad =  carrito.reduce((acc, item) => acc + item.Stock, 0);
    const totalCompra =  carrito.reduce((acc, item) => acc + (item.Precio * item.Stock), 0);
    console.log(totalCompra);

    pintarTotalesCarrito(totalCantidad, totalCompra);
};



const pintarTotalesCarrito =  (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById("contador");
    const precioTotal = document.querySelector("#precioTotal");

    contadorCarrito.innerHTML = totalCantidad;
    precioTotal.innerText = totalCompra;
};


const eliminarProductoCarrito = (id) => {
    const index = carrito.findIndex(product => product.id === id);
    carrito.splice(index, 1);
    actualizarTotalCarrito(carrito)
    actualizarCarrito(carrito)
};

const actualizarCarrito = (carrito) => {
    const contenedor = document.getElementById("contenedorCarrito");
    contenedor.innerHTML = " ";

    carrito.forEach(producto => {
        const div = document.createElement('div')
        div.classList.add("flex,justify-evenly,flex-wrap,mt-10")
        div.innerHTML= `
        <p class="flex justify-around ml-8 text-center">${producto.Nombre} ${producto.Marca}<span class="text-blue-600 text-center">$${producto.Precio}</span></p>
        <p class="text-center flex justify-end mr-10" id="cantCarrito">Cantidad: ${producto.Stock}</p>
        <button type="button" class=" px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out btn" id="delete-${producto.id}">Eliminar</button>
        `
        contenedor.appendChild(div);

        document.getElementById(`delete-${producto.id}`).addEventListener("click", function(){
            eliminarProductoCarrito(producto.id);
        });
    });
};


const btnContinuar = document.getElementById("continuar");

btnContinuar.addEventListener("click" , () => {
    Swal.fire({
        title: "Ingrese su Nombre Y Apellido para registrar el pedido",
        input: "text",
        inputValue: name,
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return "Ingrese un Nombre y Apellido"
            }
        }
    })
    .then(resultado => {
        if (resultado.value) {
            Swal.fire(`Se a registrado el pedido a nombre de: ${resultado.value}`);
        }
    })
})

let filtro = [];


// Pintar Filtro Procesadores
const filterProcessors = async () => {
    const data = await getData();
    filtroProce = data.filter(item => item.Nombre === "Procesador")
    
    return filtroProce
};
const btnProce =document.getElementById("Procesador");
btnProce.addEventListener("click" , async () => {
    const filterData = await filterProcessors();
    pintarFiltroProce (filtroProce);
})

const pintarFiltroProce = async (filtroProce) => {
    const contenedor = document.getElementById("printf")
    contenedor.innerHTML= " ";
    
    filtroProce.forEach(producto => {
    const div = document.createElement('div');
    contenedor.innerHTML += `
    <div class="flex flex-row md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg my-2 w-full">
    <img class="mt-10 h-52 " src=${producto.img} alt="" />
    <div class="p-6 flex flex-col justify-start">
      <h5 class="text-gray-900 text-xl font-medium mb-2">${producto.Nombre} ${producto.Marca}</h5>
      <p class="text-gray-700 text-base mb-4">
        ${producto.Descripcion}
      </p>
      <h5 class="text-cyan-500 text-lg"> $${producto.Precio}</h5>
      <div class="flex space-x-2 justify-center">
        <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-10 lol" id="${producto.id}">Añadir al Carrito</button>
      </div>
    </div>
  </div>
    `
    contenedor.appendChild(div);
    });
};


// Pintar Filtro PlacaV


const filterPlacaV = async () => {
    const data = await getData();
    filtroPlacaV = data.filter(producto => producto.Nombre === "Placa de Video")
    
    return filtroPlacaV
};

const btnVideo =document.getElementById("Placa de Video");
btnVideo.addEventListener("click" , async () => {
    const filterData = await filterPlacaV();
    pintarFiltroPlacaV (filtroPlacaV);
})


const pintarFiltroPlacaV = async (filtroPlacaV) => {
    const contenedor = document.getElementById("printf")
    contenedor.innerHTML= " ";
    
    filtroPlacaV.forEach(producto => {
    const div = document.createElement('div');
    contenedor.innerHTML += `
    <div class="flex flex-row md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg my-2 w-full">
    <img class="mt-10 h-52 " src=${producto.img} alt="" />
    <div class="p-6 flex flex-col justify-start">
      <h5 class="text-gray-900 text-xl font-medium mb-2">${producto.Nombre} ${producto.Marca}</h5>
      <p class="text-gray-700 text-base mb-4">
        ${producto.Descripcion}
      </p>
      <h5 class="text-cyan-500 text-lg"> $${producto.Precio}</h5>
      <div class="flex space-x-2 justify-center">
        <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-10 lol" id="${producto.id}">Añadir al Carrito</button>
      </div>
    </div>
  </div>
    `
    contenedor.appendChild(div);
    });
};


// Pintar Filtro Ram


const filterMemoria = async () => {
    const data = await getData();
    filtroMemoria = data.filter(cosa => cosa.Nombre === "Memoria Ram")
    
    return filtroMemoria
};

const btnRam =document.getElementById("Memoria Ram");
btnRam.addEventListener("click" , async () => {
    const filterData = await filterMemoria();
    pintarFiltroMemoria (filtroMemoria);
})

const pintarFiltroMemoria = async (filtroMemoria) => {
    const contenedor = document.getElementById("printf")
    contenedor.innerHTML= " ";
    
    filtroMemoria.forEach(producto => {
    const div = document.createElement('div');
    contenedor.innerHTML += `
    <div class="flex flex-row md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg my-2 w-full">
    <img class="mt-10 h-52 " src=${producto.img} alt="" />
    <div class="p-6 flex flex-col justify-start">
      <h5 class="text-gray-900 text-xl font-medium mb-2">${producto.Nombre} ${producto.Marca}</h5>
      <p class="text-gray-700 text-base mb-4">
        ${producto.Descripcion}
      </p>
      <h5 class="text-cyan-500 text-lg"> $${producto.Precio}</h5>
      <div class="flex space-x-2 justify-center">
        <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-10 lol" id="${producto.id}">Añadir al Carrito</button>
      </div>
    </div>
  </div>
    `
    contenedor.appendChild(div);
    });
};


// Pintar Filtro Disco


const filterDisco = async () => {
    const data = await getData();
    filtroDisco = data.filter(item => item.Nombre === "Disco")
    
    return filtroDisco
};

const btnDisco =document.getElementById("Disco");
btnDisco.addEventListener("click" , async () => {
    const filterData = await filterDisco();
    pintarFiltroDisco (filtroDisco);
})

const pintarFiltroDisco = async (filtroDisco) => {
    const contenedor = document.getElementById("printf")
    contenedor.innerHTML= " ";
    
    filtroDisco.forEach(producto => {
    const div = document.createElement('div');
    contenedor.innerHTML += `
    <div class="flex flex-row md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg my-2 w-full">
    <img class="mt-10 h-52 " src=${producto.img} alt="" />
    <div class="p-6 flex flex-col justify-start">
      <h5 class="text-gray-900 text-xl font-medium mb-2">${producto.Nombre} ${producto.Marca}</h5>
      <p class="text-gray-700 text-base mb-4">
        ${producto.Descripcion}
      </p>
      <h5 class="text-cyan-500 text-lg"> $${producto.Precio}</h5>
      <div class="flex space-x-2 justify-center">
        <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-10 lol" id="${producto.id}">Añadir al Carrito</button>
      </div>
    </div>
  </div>
    `
    contenedor.appendChild(div);
    });
};


//Pintar Placa Madre


const filterPlacaM = async () => {
    const data = await getData();
    filtroPlacaM = data.filter(item => item.Nombre === "Placa Madre")
    
    return filtroPlacaM
};

const btnPlacaM =document.getElementById("Placam");
btnPlacaM.addEventListener("click" , async () => {
    const filterData = await filterPlacaM();
    pintarFiltroPlacaM (filtroPlacaM);
})

const pintarFiltroPlacaM = async (filtroPlacaM) => {
    const contenedor = document.getElementById("printf")
    contenedor.innerHTML= " ";
    
    filtroPlacaM.forEach(producto => {
    const div = document.createElement('div');
    contenedor.innerHTML += `
    <div class="flex flex-row md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg my-2 w-full">
    <img class="mt-10 h-52 " src=${producto.img} alt="" />
    <div class="p-6 flex flex-col justify-start">
      <h5 class="text-gray-900 text-xl font-medium mb-2">${producto.Nombre} ${producto.Marca}</h5>
      <p class="text-gray-700 text-base mb-4">
        ${producto.Descripcion}
      </p>
      <h5 class="text-cyan-500 text-lg"> $${producto.Precio}</h5>
      <div class="flex space-x-2 justify-center">
        <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-10 lol" id="${producto.id}">Añadir al Carrito</button>
      </div>
    </div>
  </div>
    `
    contenedor.appendChild(div);
    });
};


// Pintar Equipos


const filterEquipo = async () => {
    const data = await getData();
    filtroEquipo = data.filter(item => item.Nombre === "Computadora")
    
    return filtroEquipo
};

const btnEquipo =document.getElementById("Equipo");
btnEquipo.addEventListener("click" , async () => {
    const filterData = await filterEquipo();
    pintarFiltroEquipo (filtroEquipo);
})

const pintarFiltroEquipo = async (filtroEquipo) => {
    const contenedor = document.getElementById("printf")
    contenedor.innerHTML= " ";
    
    filtroEquipo.forEach(producto => {
    const div = document.createElement('div');
    contenedor.innerHTML += `
    <div class="flex flex-row md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg my-2 w-full">
    <img class="mt-10 h-52 " src=${producto.img} alt="" />
    <div class="p-6 flex flex-col justify-start">
      <h5 class="text-gray-900 text-xl font-medium mb-2">${producto.Nombre} ${producto.Marca}</h5>
      <p class="text-gray-700 text-base mb-4">
        ${producto.Descripcion}
      </p>
      <h5 class="text-cyan-500 text-lg"> $${producto.Precio}</h5>
      <div class="flex space-x-2 justify-center">
        <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-10 lol" id="${producto.id}">Añadir al Carrito</button>
      </div>
    </div>
  </div>
    `
    contenedor.appendChild(div);
    });
};