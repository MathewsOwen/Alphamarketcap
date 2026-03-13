// Configuração do Gráfico de Impacto
const ctx = document.getElementById('impactChart').getContext('2d');

const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(0, 71, 187, 0.4)');
gradient.addColorStop(1, 'rgba(0, 71, 187, 0)');

const impactChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
        datasets: [{
            label: 'Crescimento do Mercado',
            data: [30, 45, 38, 60, 55, 80, 95],
            borderColor: '#0047bb',
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 0
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { display: false } },
            y: { grid: { color: '#f0f0f0' } }
        }
    }
});

// Simulação de atualização em tempo real
setInterval(() => {
    const newData = impactChart.data.datasets[0].data;
    newData.shift();
    newData.push(Math.floor(Math.random() * (100 - 70 + 1) + 70));
    impactChart.update();
}, 3000);
