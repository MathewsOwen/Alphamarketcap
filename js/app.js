/**
 * AlphaMarketCap Engine V4
 * Arquitetura Senior: Modular e Data-Driven
 */

const Engine = {
    banks: ["J.P. Morgan", "Goldman Sachs", "Morgan Stanley", "Citigroup", "HSBC", "BofA", "Barclays", "UBS", "Deutsche Bank", "Wells Fargo", "Credit Agricole", "BNP Paribas", "Santander", "Scotiabank", "BMO", "Société Générale", "Nomura", "Mizuho", "Standard Chartered", "Commerzbank"],
    
    init() {
        this.renderTicker();
        this.renderChart();
        this.renderMovers();
        this.startClock();
        this.setupRealTime();
    },

    renderTicker() {
        const ticker = document.getElementById('bankTicker');
        this.banks.forEach(bank => {
            const span = document.createElement('span');
            span.className = 'bank-item';
            const points = (Math.random() * 1000 + 500).toFixed(2);
            span.innerHTML = `${bank} <span style="color:#00ff6a">${points}</span>`;
            ticker.appendChild(span);
        });
    },

    renderChart() {
        const chart = document.getElementById('mainChart');
        for(let i=0; i < 40; i++) {
            const candle = document.createElement('div');
            candle.className = 'candle';
            candle.style.height = `${Math.random() * 80 + 10}%`;
            // Ação ao clicar na vela (interatividade)
            candle.onclick = () => alert(`DETALHES_DO_ATIVO: Nível de volume em ${candle.style.height}`);
            chart.appendChild(candle);
        }
    },

    renderMovers() {
        const gainers = document.getElementById('gainers');
        const losers = document.getElementById('losers');

        const stocks = ["AAPL", "TSLA", "NVDA", "AMZN", "META", "GOOGL"];
        
        stocks.forEach((s, i) => {
            const div = document.createElement('div');
            div.className = 'mover-item';
            if(i % 2 === 0) {
                div.innerHTML = `<span>${s}</span> <span class="gain">+${(Math.random()*5).toFixed(2)}%</span>`;
                gainers.appendChild(div);
            } else {
                div.innerHTML = `<span>${s}</span> <span class="loss">-${(Math.random()*5).toFixed(2)}%</span>`;
                losers.appendChild(div);
            }
        });
    },

    startClock() {
        setInterval(() => {
            document.getElementById('clock').innerText = new Date().toLocaleTimeString();
        }, 1000);
    },

    setupRealTime() {
        // Animação das velas para simular mercado vivo
        setInterval(() => {
            document.querySelectorAll('.candle').forEach(c => {
                const h = parseFloat(c.style.height);
                c.style.height = `${Math.max(10, Math.min(95, h + (Math.random() * 10 - 5)))}%`;
            });
        }, 1000);
    }
};

document.addEventListener('DOMContentLoaded', () => Engine.init());
