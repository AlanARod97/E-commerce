let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones= document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito(){
if(productosEnCarrito && productosEnCarrito.length > 0){

   

    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.remove("disabled")
    contenedorCarritoAcciones.classList.remove("disabled")
    contenedorCarritoComprado.classList.add("disabled")

    contenedorCarritoProductos.innerHTML = " ";

    productosEnCarrito.forEach(producto =>{
        const div = document.createElement("div")
        div.classList.add("carrito-producto")
        div.innerHTML = ` 
        <img src="${producto.imagen}" alt="${producto.titulo}" class="carrito-producto-imagen">
        <div class="carrito-producto-titulo">
            <small>titulo</small>
            <h3>${producto.titulo}</h3>

        </div>
        <div class="carrito-producto-cantidad">
            <small>cantidad</small>
            <p>${producto.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
            <small>precio</small>
            <p>${producto.precio}</p>
        </div>
        <div class="carrito-producto-subtotal">
            <small>subtotal</small>
            <p>${producto.precio * producto.cantidad}</p>
        </div>
        <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>

        
        `;

        contenedorCarritoProductos.append(div)
    })
    

}else{
    contenedorCarritoVacio.classList.remove("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritoComprado.classList.add("disabled") 
}

actualizarBotonesEliminar();
actualizarTotal()

}

cargarProductosCarrito();



function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton =>{
        boton.addEventListener("click", eliminarDelCarrito);
    });
} 


function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

botonVaciar.addEventListener("click", vaciarCarrito);
  

function vaciarCarrito(){

    Swal.fire(
        {
            icon: "warning",
            title:"Se vaciará el carrito de compras",
            text:"desea continuar?",
            showCancelButton:true,
            confirmButtonText:"Vaciar Carrito",
            confirmButtonColor:"#961818",
            cancelButtonText:"Cancelar",
        }
    ).then((result)=>{
        if(result.value){
            productosEnCarrito.length =0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito()
        }
    })

  

};

function actualizarTotal(){

    const totalCalculado  = productosEnCarrito.reduce((acc, producto)=> acc + (producto.cantidad * producto.precio), 0)
    total.innerText =  `$${totalCalculado};`;
};



botonComprar.addEventListener("click", comprarCarrito);
  

function comprarCarrito(){

    Swal.fire(
        {
            icon: "success",
            title:"Esta a punto de comprar",
            text:"desea continuar?",
            showCancelButton:true,
            confirmButtonText:"Comprar Producto/s",
            confirmButtonColor:"green",
            cancelButtonText:"Cancelar",
        }
    ).then((result)=>{
        if(result.value){
            productosEnCarrito.length =0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

            contenedorCarritoVacio.classList.add("disabled")
            contenedorCarritoProductos.classList.add("disabled")
            contenedorCarritoAcciones.classList.add("disabled")
            contenedorCarritoComprado.classList.remove("disabled")
           
        }
    })

  

};
