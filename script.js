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

        //cargamos productos
        async function cargarProductos(){
            const productos = await getProducts();
            //debugger;   
            //filtro de productos para quedarme solo con ropa de hombre y mujer             
            const productosRopa = productos.filter(producto => 
                producto.category === "men's clothing" || 
                producto.category === "women's clothing"
            );
            productosRopa.forEach(producto => {
                const card = document.createElement('div');
                card.className = 'card';
                const imagenUrl = producto.image;
                card.innerHTML = `
                <img src="${imagenUrl}" alt="${producto.title}">
                <h3>${producto.title}</h3>
                <p>$${producto.price}</p>                                
                `;
                //Creo un boton para agregarlo a la card
                const boton = document.createElement('button');
                boton.className = 'boton-comprar';
                boton.textContent = 'Ver Detalle';

                
                boton.addEventListener('click', () => {                    
                    modalCardNombreProducto.textContent =producto.title;
                    modalCardPrecioProducto.textContent = `$${producto.price}`;
                    modalCardImagenProducto.src = imagenUrl;
                    modalCardImagenProducto.alt = producto.title;
                    botonComprarProducto.addEventListener('click', () => {                        
                        alert(`Producto ${producto.title} agregado al carrito`);                                              
                    });
                    modalCard.classList.remove('modal-oculto');
                    modalCard.classList.add('modal-visible');
                   
                });

                card.appendChild(boton);

                productosContainer.appendChild(card); 
            });
            }
        cargarProductos();      


        
        //Agregamos una clase o la quita seguen el estado en que este menuItems
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
});