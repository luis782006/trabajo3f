document.addEventListener('DOMContentLoaded', () => {
    // Realizamos todoas las acciones necesarias despues de asegurarnoque el DOM este listo
        const hamburger = document.querySelector('.hamburger');
        const menuItems = document.querySelector('.menu-items');
        const botonAbout = document.getElementById('boton-about');
        const modal = document.getElementById('modal');
        const closebtn = document.querySelector('.close-btn');
        const heroBanners = document.querySelectorAll('.hero-banner');
        const productosContainer = document.querySelector('.productos');
        
        const modalCard = document.getElementById('modal-card');
        const closebtnCard = document.querySelector('.close-btn-card');

        const modalCardNombreProducto = document.querySelector('.modal-content-card h3');
        const modalCardPrecioProducto = document.querySelector('.modal-content-card p');
        const modalCardImagenProducto = document.querySelector('.modal-content-card img');
        const botonComprarProducto = document.querySelector('.boton-comprar-producto');

        const inputs=document.querySelectorAll('#nombre, #correo, #contrasena');
        const botonform = document.querySelector('.boton-form');
        const spinnerForm = document.querySelector('.fa-spin');
        const mensajeExito = document.querySelector('.mensaje-exito');
        const nombreSocio = document.getElementById('nombre-socio');
        const correoSocio = document.getElementById('correo-socio');
        const talle=document.getElementById('talle');
        const color=document.getElementById('color');
        const toastContainer = document.querySelector('.toast-container');   
        const categorias = document.getElementById('categorias');
        const precios = document.getElementById('precios');
        const nroSocio = document.getElementById('nro-socio'); 
        const carritoStorage=[];
        const totalStorage=document.getElementById('total-storage'); 
        const carritoItems = document.getElementById('carrito-total');
        const vaciarCarrito = document.getElementById('vaciar-carrito');

        const url = "https://fakestoreapi.com/products"

        async function getProducts(){
            try {
                const response = await fetch(url);
                const data = await response.json();
                return data; // Added return statement
            } catch (error) {
                console.log(error);
                return []; // Added return for error case
            }
        }
        //carga de imagenes para el banner
        const imagenes=[
            'asset/imagen1.png',
            'asset/imagen3.png',
            'asset/imagen2.png',
            'asset/imagen4.png',            
        ]

        //funcion para cargar imagenes
        function cargarImagenes(imagenes) {
            heroBanners.forEach((heroBanner,bannerIndex) => {
            // Crear contenedor de imágenes
            const imageContainer = document.createElement('div');
            imageContainer.className = 'carrusel-images';

            // Crear imagen y pasarsela al contenedor creado
            imagenes.forEach((imagen, index) => {
                const imagenElement = document.createElement('img');
                imagenElement.src = imagen;
                imagenElement.alt = 'Imagen';
                imagenElement.className = 'hero-image';
                
                // agrego la clase active a la primera imagen  primer banner
                if (index === (bannerIndex * 2)) {
                    imagenElement.classList.add('active');
                }
                imageContainer.appendChild(imagenElement);
            });

        heroBanner.appendChild(imageContainer);

        let currentIndex = bannerIndex * 2;

        function showNextImage() {
            const images = imageContainer.querySelectorAll('.hero-image');
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }

        // Intervalos para llamar la funcion
        setInterval(showNextImage, 2000); // 3 segundos
    });
}         
        //cargamos imagenes
        cargarImagenes(imagenes);

        //funcion para modificar los productos originales de la api y agregarle las propiedades talle y color
        // y devolver un nuevo array de obejto
        async function modificarProductos(){
            const productos = await getProducts();
            //debugger;
            const productosRopa =productos.filter(producto => 
                producto.category === "men's clothing" || 
                producto.category === "women's clothing"
            );
            productosRopa.forEach(producto => {
                producto.talle = ["S", "M", "L", "XL"];
                producto.color = ["Negro", "Blanco", "Rojo", "Azul"];
            });
            return productosRopa;
        }

        async function mostrarProductos(productosRopa){
            productosRopa.forEach(producto => {
                const card = document.createElement('div');
                card.className = 'card';
                const imagenUrl = producto.image;
                //Concateno los elementos del array de la propiedad talle y color
                const talleString = producto.talle.join(', ');
                const colorString = producto.color.join(', ');
                card.innerHTML = `
                <img src="${imagenUrl}" alt="${producto.title}">
                <h3>${producto.title}</h3>                
                <p>Precio: $${producto.price}</p>                                
                `;
                //Creo un boton para agregarlo a la card
                const boton = document.createElement('button');
                boton.className = 'boton-comprar';
                boton.textContent = 'Ver Detalle';

                boton.addEventListener('click', () => {                    
                    modalCardNombreProducto.textContent = producto.title;
                    modalCardPrecioProducto.textContent = `Precio: $${producto.price}`;
                    modalCardImagenProducto.src = imagenUrl;
                    modalCardImagenProducto.alt = producto.title; 
                    talle.textContent =`Talles: ${talleString}`;
                    color.textContent = `Color:  ${colorString}`;
                    modalCard.classList.remove('modal-oculto');
                    modalCard.classList.add('modal-visible');
                    
                    //variables para manejar el carrito en los botones de agregar y eliminar items
                    let carritoAuxiliar=[];
                    let totalPrecioCarrito = 0;
                    // Configurar el botón de comprar para este producto específico
                    botonComprarProducto.onclick = () => {   
                        //Agregar el producto al carrito                   
                        const productoActual = {
                            id: producto.id,
                            title: producto.title,
                            price: producto.price,
                            image: producto.image,
                            talle: producto.talle,
                            color: producto.color
                        };
                        carritoStorage.push(productoActual);
                        localStorage.setItem('carrito', JSON.stringify(carritoStorage));                    
                        debugger;
                        
                        ObtenerDatosLocalStorage(carritoAuxiliar, totalPrecioCarrito);
                         
                        const carritoItem = document.createElement('div');
                        carritoItem.className = 'carrito-item';
                        carritoItem.innerHTML = `
                            <img src="${productoActual.image}" alt="${productoActual.title}">
                            <h3>${productoActual.title}</h3>
                            <p>Precio: $${productoActual.price}</p>
                            <button class="boton-eliminar">Eliminar</button>
                        `;
                       
                        carritoItem.querySelector('.boton-eliminar').addEventListener('click', () => {
                            const index = carritoStorage.findIndex(item => item.id === productoActual.id);
                            if (index !== -1) {
                                carritoStorage.splice(index, 1);
                                localStorage.setItem('carrito', JSON.stringify(carritoStorage));
                                
                                carritoItem.remove();
                            }
                            //debugger;                            
                            //debe actualizar la cantidad en el menu y el total en la lista                                                  
                            ObtenerDatosLocalStorage(carritoAuxiliar, totalPrecioCarrito);
                          
                        });
                        
                        document.querySelector('.carrito-items').appendChild(carritoItem);

                        modalCard.classList.remove('modal-visible');
                        modalCard.classList.add('modal-oculto');  
                        toastContainer.classList.add('show'); 
                        setTimeout(() => {
                            toastContainer.classList.remove('show');
                        }, 2000);
                    };
                });
                card.appendChild(boton);
                productosContainer.appendChild(card); 
            });
        }

        function ObtenerDatosLocalStorage(carritoAuxiliar , totalPrecioCarrito) {   
            carritoAuxiliar = localStorage.getItem('carrito');
            //convertimos el string en array
            carritoAuxiliar = JSON.parse(carritoAuxiliar);                       
            debugger;
            if (carritoAuxiliar.length!==0) {

                for (let i = 0; i < carritoAuxiliar.length; i++) {
                    //acumulo y redondeo                
                    //debugger;
                     totalPrecioCarrito += Math.round(carritoAuxiliar[i].price * 100) / 100; 
                     totalStorage.textContent = `Total: $${totalPrecioCarrito}`;
                     carritoItems.textContent = `${carritoAuxiliar.length}`;
                }
            }else{
                totalStorage.textContent = `Total: $0`;
                carritoItems.textContent = `${carritoAuxiliar.length}`;
            }
        }

        // funcion para vaciar el carrito
        vaciarCarrito.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('carrito');
            location.reload();
        });


        //cargamos productos
        async function cargarProductos(){
            const productosRopa = await modificarProductos();
            await mostrarProductos(productosRopa);                                    
        }
        //cargamos productos ya convertidos a cards
        cargarProductos();      
        
        //Agregamos una clase o la quita segun el estado en que este menuItems
        hamburger.addEventListener('click', (event) => {
            event.preventDefault();
            menuItems.classList.toggle('active');
        });
        

        // Cerrar el menú al hacer clic en un elemento osea cada li
        document.querySelectorAll('.menu-items li').forEach(link => {
            link.addEventListener('click', () => {
                // Si la ventana es menor o igual a 768px, cerrar el menú
                if (window.innerWidth <= 768) {
                    menuItems.classList.remove('active');
                }
            });
        });
       

        // Manejar el cambio de tamaño de la ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                menuItems.classList.remove('active');
            }
        });
        
        botonAbout.addEventListener('click', () => {
            modal.classList.remove('modal-oculto');
            modal.classList.add('modal-visible');
            
        });
        
        closebtn.addEventListener('click', () => {
            modal.classList.remove('modal-visible');
            modal.classList.add('modal-oculto');
        });
        
        closebtnCard.addEventListener('click', () => {
            modalCard.classList.remove('modal-visible');
            modalCard.classList.add('modal-oculto');
        });
        
        inputs.forEach(input => {
            input.addEventListener('mouseenter', () => {
                input.style.border = "1px solid var(--color-resaltado)";
                input.style.backgroundColor = "var(--color-secundario)";                
                input.style.color = "var(--color-texto)";
            });
            if(input.id === 'nombre'){
                input.addEventListener('input', (e) => {
                    nombreSocio.textContent = e.target.value;
                });
            }
            if(input.id === 'correo'){
                input.addEventListener('input', (e) => {
                    correoSocio.textContent = e.target.value;
                    // número de socio al azarde 5 dígitos (entre 10000 y 99999)
                    let numeroDeSocio = 10000 + Math.floor(Math.random() * 90000);
                    nroSocio.textContent = `3F${numeroDeSocio}`;    
                });
            }
            
            input.addEventListener('mouseleave', () => {              
                input.style.border = "2px solid transparent";
                input.style.backgroundColor = "var(--color-texto)";
                input.style.color = "var(--color-secundario)";               
            });
            
            input.addEventListener('focus', () => {  
                input.style.border = "1px solid var(--color-resaltado)";
                input.style.backgroundColor = "var(--color-secundario)";
                input.style.color = "var(--color-texto)";
            });

            input.addEventListener('blur', () => { 
                input.style.border = "2px solid transparent";
                input.style.backgroundColor = "var(--color-texto)";
                input.style.color = "var(--color-secundario)";
            });
        });
        botonform.addEventListener('click', (event) => {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const contrasena = document.getElementById('contrasena').value;
            let formularioValidado = true; // Cambiamos a true por defecto
            
            //validar nombre
            if (nombre.trim() === '') {
                document.getElementById('errorNombre').textContent = 'El nombre es obligatorio';   
                formularioValidado = false;            
            } else {
                document.getElementById('errorNombre').textContent = '';                
            }
            
            //validar correo
            if (correo.trim() === '' || !correo.includes('@')) {
                document.getElementById('errorCorreo').textContent = 'El correo es obligatorio'; 
                formularioValidado = false;  
            } else {
                document.getElementById('errorCorreo').textContent = '';                
                            
            }
            
            //validar contrasena
            if (contrasena.trim() === '' || contrasena.length < 8) {
                document.getElementById('errorContrasena').textContent = 'La contrasena debe tener al menos 8 caracteres';                
                formularioValidado = false;
            } else {
                document.getElementById('errorContrasena').textContent = '';                
            }
            
            if (formularioValidado) {
                // Ocultar botón y mostrar spinner
                botonform.style.display = 'none';
                spinnerForm.classList.add('showSpinner');
               
                //muestro el mensaje de exito y espero 2 segundos
                setTimeout(() => {                    
                    mensajeExito.textContent = 'Registro exitoso';
                    
                }, 1000);
                // trabajo sobre el spinner y form
                setTimeout(() => {                
                    spinnerForm.classList.remove('showSpinner');
                    botonform.style.display = 'block';
                    
                    document.getElementById('formularioRegistro').reset();
                }, 2000);
                //me limpio el mensaje
                setTimeout(()=>{
                    mensajeExito.textContent = '';
                    nombreSocio.textContent = 'Usuario';
                    correoSocio.textContent = 'Correo Electronico';
                    nroSocio.textContent = 'Nro de Socio';
                },2000);                 
            }
        });

        //con los valores de los select filtro. La funcion se ejecuta cada vez que se cambia el select
        async function aplicarFiltros() {
            let categoriaSeleccionada = categorias.value;
            let precioSeleccionado = precios.value;
            
            if (categoriaSeleccionada === 'ropaM') {
                categoriaSeleccionada = "women's clothing";
            } else if(categoriaSeleccionada === 'ropaH') {
                categoriaSeleccionada = "men's clothing";
            }

            let productos = await modificarProductos();
            
            if(categoriaSeleccionada !== 'todos') {
                productos = productos.filter(producto => producto.category === categoriaSeleccionada);
            }

            if (precioSeleccionado === 'menor') {
                productos.sort((a, b) => a.price - b.price);
            } else if (precioSeleccionado === 'mayor') {
                productos.sort((a, b) => b.price - a.price);
            }

            productosContainer.innerHTML = '';
            await mostrarProductos(productos);
        }


        categorias.addEventListener('change', aplicarFiltros);
        precios.addEventListener('change', aplicarFiltros);
});