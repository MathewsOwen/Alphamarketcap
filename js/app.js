window.addEventListener('load', () => {
    // Espera 3 segundos para mostrar o logo e a frase
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        const main = document.getElementById('main-content');

        splash.style.transition = 'opacity 1s';
        splash.style.opacity = '0';
        
        setTimeout(() => {
            splash.style.display = 'none';
            main.style.display = 'block';
            document.body.style.overflow = 'auto'; // Libera o scroll
        }, 1000);
    }, 3000);
});

// Alerta temporário para o botão
document.getElementById('loginBtn').addEventListener('click', () => {
    alert('Área Restrita: Estamos preparando o sistema de membros via Firebase.');
});
