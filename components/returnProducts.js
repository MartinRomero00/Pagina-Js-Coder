const getData = async () => {
    const resp = await fetch('/components/products/stock.json');
    const data = await resp.json()

    return data
};


const print = async () => {
    const contenedor = document.getElementById("printf")
    const info = await getData ();
    
    info.forEach(producto => {
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
        <button id="sumar" type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-10">Añadir al Carrito</button>
      </div>
    </div>
  </div>
    `
    contenedor.appendChild(div);
    });
};


print()

