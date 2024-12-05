document.addEventListener('DOMContentLoaded', () => {
    // Realizamos todoas las acciones necesarias despues de asegurarnoque el DOM este listo
        const hamburger = document.querySelector('.hamburger');
        const menuItems = document.querySelector('.menu-items');
        const botonAbout = document.getElementById('boton-about');
        const modal = document.getElementById('modal');
        const closebtn = document.querySelector('.close-btn');
        const heroBanners = document.querySelectorAll('.hero-banner');

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
        setInterval(showNextImage, 3000); // 3 segundos
    });
}
              
        //cargamos imagenes
        cargarImagenes(imagenes);
      

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