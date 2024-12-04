document.addEventListener('DOMContentLoaded', () => {
    // Realizamos todoas las acciones necesarias despues de asegurarnoque el DOM este listo
        const hamburger = document.querySelector('.hamburger');
        const menuItems = document.querySelector('.menu-items');
        const botonAbout = document.getElementById('boton-about');
        const modal = document.getElementById('modal');
        const closebtn = document.querySelector('.close-btn');
        const heroBanner = document.querySelector('.hero-banner');

        const url = "https://api.escuelajs.co/api/v1/products"

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

        //Selecionamos 5 productos y de ellos extraemos 5 imagenes
        getProducts().then(async (data) => {
            const productos = data.slice(0, 5);
            productos.forEach((producto) => {
                const imagen = producto.images[0];
                const imagenElement = document.createElement('img');
                imagenElement.src = imagen;
                console.log(imagen)
                imagenElement.alt = producto.title;
                heroBanner.appendChild(imagenElement);
            });
        }).catch((error) => {
            console.log('Error:', error);
        });

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
});