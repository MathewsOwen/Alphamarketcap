const AlphaCore = {
    banks: ["J.P. MORGAN", "GOLDMAN SACHS", "MORGAN STANLEY", "CITIGROUP", "HSBC", "BOFA", "BARCLAYS", "UBS", "DEUTSCHE BANK", "WELLS FARGO"],
    assets: [
        { s: "PETR4", type: "up" }, { s: "VALE3", type: "up" }, { s: "ITUB4", type: "up" },
        { s: "MGLU3", type: "down" }, { s: "AMER3", type: "down" }, { s: "AZUL4", type: "down" }
    ],

    init() {
        this.renderTicker();
        this.renderMovers();
        this.initTradingView("BMFBOVESPA:IBOV");
        this.initNavigation();
        this.startClock();
    },

    initTradingView(symbol) {
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
            "backgroundColor": "#080808",
            "gridColor": "#151515"
        });
    },

    initNavigation() {
        const btns = document.querySelectorAll('.nav-btn');
        btns.forEach(btn => {
            btn.onclick = () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Esconde todas as views
                document.getElementById('view-dashboard').style.display = 'none';
                document.getElementById('view-signals').style.display = 'none';
                document.getElementById('view-liquidity').style.display = 'none';

                // Mostra a selecionada
                const target = btn.getAttribute('data-target');
                document.getElementById(`view-${target}`).style.display = 
                    target === 'dashboard' ? 'grid' : 'block';
            };
        });
    },

    renderTicker() {
        const container = document.getElementById('bankTicker');
        [...this.banks, ...this.banks].forEach(b => {
            container.innerHTML += `<div class="bank-unit">${b} <span>+${(Math.random()*3).toFixed(2)}%</span></div>`;
        });
    },

    renderMovers() {
        const list = document.getElementById('moversList');
        this.assets.forEach(item => {
            const row = document.createElement('div');
            row.className = 'mover-row';
            row.innerHTML = `<span>${item.s}</span><span class="${item.type}">${item.type === 'up' ? '+' : '-'}${(Math.random()*5).toFixed(2)}%</span>`;
            row.onclick = () => this.initTradingView(`BMFBOVESPA:${item.s}`);
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
