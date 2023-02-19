const productos = [

    /*Mujer*/
    {
        id: "reloj-francia",
        titulo: "Reloj Francia",
        imagen: "./img/RelojMujer-productos1.jpg",
        categoria: {
            nombre: "Relojes de Mujer",
            id: "mujer"
        },
        precio: 1500

    },

    {

        id: "reloj-heidi",
        titulo: "Reloj Heidi",
        imagen: "./img/RelojMujer-productos2.jpg",
        categoria: {
            nombre: "Relojes de Mujer",
            id: "mujer"
        },
        precio: 2000
    },

    {

        id: "reloj-shirley",
        titulo: "Reloj Shirley",
        imagen: "./img/RelojMujer-productos3.jpg",
        categoria: {
            nombre: "Relojes de Mujer",
            id: "mujer"
        },
        precio: 2000
    },

    {

        id: "reloj-mile",
        titulo: "Reloj Mile",
        imagen: "./img/RelojMujer-Producto4.jpg",
        categoria: {
            nombre: "Relojes de Mujer",
            id: "mujer"
        },
        precio: 2500
    },

    {

        id: "reloj-italia",
        titulo: "Reloj Italia",
        imagen: "./img/RelojMujer-Producto5.jpg",
        categoria: {
            nombre: "Relojes de Mujer",
            id: "mujer"
        },
        precio: 2000
    },

    {

        id: "reloj-pink",
        titulo: "Reloj Pink",
        imagen: "./img/RelojMujer-Producto6.jpg.jpg",
        categoria: {
            nombre: "Relojes de Mujer",
            id: "mujer"
        },
        precio: 2000
    },

    {

        id: "reloj-shinning",
        titulo: "Reloj Shinning",
        imagen: "./img/RelojMujer-Producto7.jpg.jpg",
        categoria: {
            nombre: "Relojes de Mujer",
            id: "mujer"
        },
        precio: 2000
    },

    {

        id: "reloj-sweet-white",
        titulo: "Reloj Sweet White",
        imagen: "./img/RelojMujer-Producto8.jpg.jpg",
        categoria: {
            nombre: "Relojes de Mujer",
            id: "mujer"
        },
        precio: 2000
    },

    {

        id: "reloj-world",
        titulo: "Reloj World",
        imagen: "./img/RelojMujer-Producto9.jpg.jpg",
        categoria: {
            nombre: "Relojes de Mujer",
            id: "mujer"
        },
        precio: 2000
    },

    /*Hombre*/

    {

        id: "reloj-land",
        titulo: "Reloj Land",
        imagen: "./img/RelojHombre-productos1.0.jpg",
        categoria: {
            nombre: "Relojes de Hombre",
            id: "hombre"
        },
        precio: 2000
    },

    {

        id: "reloj-milo",
        titulo: "Reloj Milo",
        imagen: "./img/RelojHombre-productos2.jpg",
        categoria: {
            nombre: "Relojes de Hombre",
            id: "hombre"
        },
        precio: 2500
    },

    {

        id: "reloj-iron",
        titulo: "Reloj Iron",
        imagen: "./img/RelojHombre-productos3.jpg",
        categoria: {
            nombre: "Relojes de Hombre",
            id: "hombre"
        },
        precio: 3000
    },

    {

        id: "reloj-silver",
        titulo: "Reloj Silver",
        imagen: "./img/RelojHombre-producto4.jpg",
        categoria: {
            nombre: "Relojes de Hombre",
            id: "hombre"
        },
        precio: 2500

    },

    {

        id: "reloj-milotwo",
        titulo: "Reloj MiloTwo",
        imagen: "./img/RelojHombre-producto8.jpg",
        categoria: {
            nombre: "Relojes de Hombre",
            id: "hombre"
        },
        precio: 2300
    },



]



const contenedor_productos = document.querySelector("#contenedorProductos");
const botonesCategoria = document.querySelectorAll(".botonCategoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedor_productos.innerHTML = "";
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `<img src="${producto.imagen}" alt="${producto.titulo}" class="producto-imagen">
        <div class="detallesProductos">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$ ${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>`
        contenedor_productos.append(div);
    });



    actualizarBotonesAgregar();

}

cargarProductos(productos)

botonesCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategoria.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)

            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productosBoton)
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos)
        }


    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}


let productosEnCarrito
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);


    }


    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));



}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}






/*API REST*/

fetch('https://api.chucknorris.io/jokes/random')
.then((response ) => {return response.json()})
.then((data) =>{
    const logArt = document.getElementById("logoArt");
    logArt.addEventListener("click", ()=>{
            
        Toastify({

            text: `${data.value}`,
            style: {
                background:"linear-gradient(to bottom, #F2DED4, #E8C6B6,#DAAB96)",
              },
         
            duration: 3000,
            
            }).showToast();
    });

    
}
)







