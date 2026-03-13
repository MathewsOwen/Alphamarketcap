/**
 * AlphaMarketCap Core Engine V5.1
 * Arquitetura Senior - Interatividade e Dados Sincronizados
 */

const AlphaCore = {
    // Top 20 Bancos Mundiais
    banks: ["J.P. MORGAN", "GOLDMAN SACHS", "MORGAN STANLEY", "CITIGROUP", "HSBC", "BOFA", "BARCLAYS", "UBS", "DEUTSCHE BANK", "WELLS FARGO", "BNP PARIBAS", "SANTANDER", "NOMURA", "MIZUHO", "CREDIT AGRICOLE", "SOCIETE GENERALE", "UBS GROUP", "RBC", "TD BANK", "MITSUBISHI"],
    
    // Lista de Ativos Sincronizados
    assets: [
        { s: "PETR4", name: "Petrobras", t: "up" }, { s: "VALE3", name: "Vale SA", t: "up" },
        { s: "ITUB4", name: "Itaú Unibanco", t: "up" }, { s: "MGLU3", name: "Magaz. Luiza", t: "down" },
        { s: "AMER3", name: "Americanas", t: "down" }, { s: "AZUL4", name: "Azul Linhas", t: "down" }
    ],

    init() {
        this.renderTicker();
        this.renderMovers();
        this.initTradingView("BMFBOVESPA:IBOV"); // Começa com Ibovespa
        this.initNavigation();
        this.startClock();
        console.log("AlphaCore Terminal V5.1: Online.");
    },

    initTradingView(symbol) {
        // Limpa container anterior
        document.getElementById('tradingview_alpha').innerHTML = '';
        
        // Novo Widget Real-Time
        new TradingView.widget({
            "autosize": true,
            "symbol": symbol,
            "interval": "D",
            "timezone": "America/Sao_Paulo",
            "theme": "dark",
            "style": "1",
            "locale": "br",
            "toolbar_bg": "#000000",
            "enable_publishing": false,
            "hide_top_toolbar": false,
            "hide_legend": false,
            "save_image": false,
            "container_id": "tradingview_alpha",
            "backgroundColor": "#080808",
            "gridColor": "#151515"
        });
    },

    initNavigation() {
        const btns = document.querySelectorAll('.nav-btn');
        const dashboard = document.getElementById('view-dashboard');
        
        btns.forEach(btn => {
            btn.onclick = () => {
                // Ativa botão
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Esconde todas as views
                dashboard.classList.remove('active-view');
                document.getElementById('view-signals').style.display = 'none';
                document.getElementById('view-liquidity').style.display = 'none';

                // Mostra a selecionada
                const target = btn.getAttribute('data-target');
                if (target === 'dashboard') {
                    dashboard.classList.add('active-view');
                } else {
                    document.getElementById(`view-${target}`).style.display = 'block';
                }
            };
        });
    },

    renderTicker() {
        const container = document.getElementById('bankTicker');
        // Duplicando para efeito infinito
        [...this.banks, ...this.banks].forEach(b => {
            container.innerHTML += `<div class="bank-unit">${b} <span>+${(Math.random()*4).toFixed(2)}%</span></div>`;
        });
    },

    renderMovers() {
        const list = document.getElementById('moversList');
        this.assets.forEach(item => {
            const row = document.createElement('div');
            row.className = 'mover-row';
            const val = (Math.random()*6).toFixed(2);
            row.innerHTML = `<span>${item.s} <span style="color:#444; font-size:10px">${item.name}</span></span><span class="${item.type}">${item.type === 'up' ? '+' : '-'}${val}%</span>`;
            
            // AO CLICAR NA AÇÃO, O GRÁFICO ATUALIZA!
            row.onclick = () => this.initTradingView(`BMFBOVESPA:${item.s}`);
            list.appendChild(row);
        });
    },

    startClock() {
        setInterval(() => {
            document.getElementById('clock').innerText = new Date().toLocaleTimeString('pt-BR', { timeZone: 'UTC' });
        }, 1000);
    }
};

document.addEventListener('DOMContentLoaded', () => AlphaCore.init());
