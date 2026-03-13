window.addEventListener('load', () => {
    // Dá tempo do usuário admirar o logo antes de entrar
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        const main = document.getElementById('main-content');

        splash.style.transition = 'opacity 1s ease-in-out';
        splash.style.opacity = '0';
        
        setTimeout(() => {
            splash.style.display = 'none';
            main.style.display = 'block';
            document.body.style.overflow = 'auto';
        }, 1000);
    }, 3000);
});
