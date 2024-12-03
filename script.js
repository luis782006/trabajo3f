document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const menuItems = document.querySelector('.menu-items');

    hamburger.addEventListener('click', (event) => {
        event.preventDefault();
        menuItems.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic en un elemento
    document.querySelectorAll('.menu-items li').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menuItems.classList.remove('active');
            }
        });
    });

    // Cerrar el menú al hacer clic fuera
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 768 && 
            !event.target.closest('.menu-items') && 
            !event.target.closest('.hamburger')) {
            menuItems.classList.remove('active');
        }
    });

    // Manejar el cambio de tamaño de la ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            menuItems.classList.remove('active');
        }
    });
});