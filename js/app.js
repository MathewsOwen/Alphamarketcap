const AlphaCore = {
    highs: ["VALE3", "PETR4", "ITUB4", "BBAS3", "BBDC4", "ELET3", "WEGE3", "RENT3", "SUZB3", "JBSS3"],
    lows: ["MGLU3", "AMER3", "AZUL4", "GOLL4", "LREN3", "CVCB3", "VIIA3", "COGN3", "HAPV3", "BEEF3"],
    
    newsSources: [
        { portal: "REUTERS", title: "Acordo comercial entre China e Brasil impulsiona commodities." },
        { portal: "BLOOMBERG", title: "Dólar cai após dados de emprego nos EUA virem abaixo do esperado." },
        { portal: "VALOR", title: "Tesouro Nacional anuncia novo leilão de títulos prefixados." }
    ],

    init() {
        this.renderRankings();
        this.initTV("BMFBOVESPA:IBOV");
        this.renderNews(false); // Primeira carga sem som

        // Atualização de notícias a cada 1 minuto com SOM
        setInterval(() => this.renderNews(true), 60000);
    },

    initTV(symbol) {
        new TradingView.widget({
            "autosize": true,
            "symbol": symbol,
            "theme": "dark",
            "container_id": "tradingview_alpha",
            "backgroundColor": "#000b1a",
            "gridColor": "rgba(211, 175, 55, 0.05)"
        });
    },

    renderRankings() {
        const hList = document.getElementById('highList');
        const lList = document.getElementById('lowList');
        
        this.highs.forEach(s => {
            hList.innerHTML += `<div class="asset-row"><span>${s}</span><span style="color:var(--green)">+${(Math.random()*5).toFixed(2)}%</span></div>`;
        });
        this.lows.forEach(s => {
            lList.innerHTML += `<div class="asset-row"><span>${s}</span><span style="color:var(--red)">-${(Math.random()*5).toFixed(2)}%</span></div>`;
        });
    },

    renderNews(shouldPlaySound) {
        const feed = document.getElementById('newsFeed');
        const now = new Date().toLocaleTimeString();
        const news = this.newsSources[Math.floor(Math.random() * this.newsSources.length)];

        // Adiciona a notícia no topo
        const item = `
            <div class="news-item">
                <small style="color:var(--gold)">${news.portal} • AGORA</small>
                <h4 style="margin-top:5px">${news.title}</h4>
            </div>`;
        
        feed.insertAdjacentHTML('afterbegin', item);

        // Toca o som se for uma atualização automática
        if(shouldPlaySound) {
            const audio = document.getElementById('notif-sound');
            audio.play().catch(e => console.log("Áudio bloqueado pelo browser até o primeiro clique."));
        }
    }
};

// Funções de Interface
function toggleRanking(type) {
    const high = document.getElementById('highList');
    const low = document.getElementById('lowList');
    const bHigh = document.getElementById('btn-high');
    const bLow = document.getElementById('btn-low');

    if(type === 'high') {
        high.classList.remove('hidden'); low.classList.add('hidden');
        bHigh.classList.add('active'); bLow.classList.remove('active');
    } else {
        high.classList.add('hidden'); low.classList.remove('hidden');
        bHigh.classList.remove('active'); bLow.classList.add('active');
    }
}

function switchTab(tab) {
    const market = document.getElementById('marketView');
    const ranking = document.getElementById('rankingView');
    const news = document.getElementById('newsView');
    const btns = document.querySelectorAll('.nav-link');

    btns.forEach(b => b.classList.remove('active'));
    
    if(tab === 'news') {
        market.classList.add('hidden'); ranking.classList.add('hidden'); news.classList.remove('hidden');
        btns[1].classList.add('active');
    } else {
        market.classList.remove('hidden'); ranking.classList.remove('hidden'); news.classList.add('hidden');
        btns[0].classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => AlphaCore.init());
