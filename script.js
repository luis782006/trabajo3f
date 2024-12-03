document.addEventListener('DOMContentLoaded', () => {
    // Realizamos todoas las acciones necesarias despues de asegurarnoque el DOM este listo
        const hamburger = document.querySelector('.hamburger');
        const menuItems = document.querySelector('.menu-items');
        const botonAbout = document.getElementById('boton-about');
        const modal = document.getElementById('modal');
        const closebtn = document.querySelector('.close-btn');

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