const AlphaCore = {
    banks: ["J.P. MORGAN", "GOLDMAN SACHS", "CITIGROUP", "BOFA", "MORGAN STANLEY", "HSBC", "UBS", "BARCLAYS", "BNP PARIBAS", "SANTANDER"],
    assets: [
        { s: "PETR4", n: "Petrobras", t: "up" },
        { s: "VALE3", n: "Vale SA", t: "up" },
        { s: "ITUB4", n: "Itaú Unibanco", t: "up" },
        { s: "MGLU3", n: "Magaz. Luiza", t: "down" },
        { s: "AMER3", n: "Americanas", t: "down" },
        { s: "AZUL4", n: "Azul Linhas", t: "down" }
    ],

    init() {
        this.renderTicker();
        this.renderMovers();
        this.startClock();
        // Espera um pouco para o script do TradingView estar pronto
        setTimeout(() => this.initTV("BMFBOVESPA:IBOV"), 500);
    },

    initTV(symbol) {
        if (typeof TradingView === 'undefined') {
            console.error("Erro: TradingView não carregado.");
            return;
        }
        document.getElementById('tradingview_alpha').innerHTML = '';
        new TradingView.widget({
            "autosize": true,
            "symbol": symbol,
            "interval": "D",
            "timezone": "America/Sao_Paulo",
            "theme": "dark",
            "style": "1",
            "locale": "br",
            "container_id": "tradingview_alpha",
            "backgroundColor": "#050505",
            "gridColor": "#111"
        });
    },

    renderTicker() {
        const div = document.getElementById('bankTicker');
        [...this.banks, ...this.banks].forEach(b => {
            div.innerHTML += `<div class="bank-unit">${b} <span>+${(Math.random()*3).toFixed(2)}%</span></div>`;
        });
    },

    renderMovers() {
        const list = document.getElementById('moversList');
        this.assets.forEach(a => {
            const row = document.createElement('div');
            row.className = 'mover-row';
            row.innerHTML = `<span>${a.s}</span><span class="${a.t}">${a.t === 'up' ? '+' : '-'}${(Math.random()*5).toFixed(2)}%</span>`;
            row.onclick = () => this.initTV(`BMFBOVESPA:${a.s}`);
            list.appendChild(row);
        });
    },

    startClock() {
        setInterval(() => {
            document.getElementById('clock').innerText = new Date().toLocaleTimeString();
        }, 1000);
    }
};

document.addEventListener('DOMContentLoaded', () => AlphaCore.init());
