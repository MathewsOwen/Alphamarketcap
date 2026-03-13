const Engine = {
    banks: ["J.P. MORGAN", "GOLDMAN SACHS", "MORGAN STANLEY", "CITIGROUP", "HSBC", "BOFA", "BARCLAYS", "UBS", "DEUTSCHE BANK", "WELLS FARGO", "BNP PARIBAS", "SANTANDER", "NOMURA", "MIZUHO", "CREDIT AGRICOLE", "SOCIETE GENERALE", "UBS GROUP", "RBC", "TD BANK", "MITSUBISHI"],

    init() {
        this.renderTicker();
        this.renderChart();
        this.renderMovers();
        this.startClock();
        this.marketLoop();
    },

    renderTicker() {
        const ticker = document.getElementById('bankTicker');
        // Duplicamos a lista para o efeito de loop infinito
        [...this.banks, ...this.banks].forEach(bank => {
            const span = document.createElement('span');
            span.className = 'bank-item';
            const pts = (Math.random() * 100 + 10).toFixed(2);
            span.innerHTML = `${bank} <span style="color:#00ff6a">${pts} PTS</span>`;
            ticker.appendChild(span);
        });
    },

    renderChart() {
        const chart = document.getElementById('mainChart');
        for(let i=0; i < 35; i++) {
            const candle = document.createElement('div');
            candle.className = 'candle';
            candle.style.height = `${Math.floor(Math.random() * 60) + 20}%`;
            candle.onclick = () => console.log("Analisando Ativo...");
            chart.appendChild(candle);
        }
    },

    renderMovers() {
        const gainers = ["PETR4", "VALE3", "ITUB4", "BBDC4"];
        const losers = ["MGLU3", "AMER3", "VIIA3", "AZUL4"];

        const listGain = document.getElementById('gainers');
        const listLoss = document.getElementById('losers');

        gainers.forEach(s => {
            listGain.innerHTML += `<div class="mover-item" onclick="alert('Analisando Compra em ${s}')"><span>${s}</span><span class="gain">+${(Math.random()*4).toFixed(2)}%</span></div>`;
        });
        losers.forEach(s => {
            listLoss.innerHTML += `<div class="mover-item" onclick="alert('Analisando Venda em ${s}')"><span>${s}</span><span class="loss">-${(Math.random()*4).toFixed(2)}%</span></div>`;
        });
    },

    startClock() {
        setInterval(() => {
            document.getElementById('clock').innerText = new Date().toLocaleTimeString();
        }, 1000);
    },

    marketLoop() {
        setInterval(() => {
            document.querySelectorAll('.candle').forEach(c => {
                let h = parseFloat(c.style.height);
                c.style.height = `${Math.max(15, Math.min(95, h + (Math.random() * 10 - 5)))}%`;
            });
        }, 1000);
    }
};

document.addEventListener('DOMContentLoaded', () => Engine.init());
