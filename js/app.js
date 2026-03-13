const AlphaCore = {
    tickerData: [
        { name: "BITCOIN", val: "64.215", s: "BTC", img: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
        { name: "ETHEREUM", val: "3.482", s: "ETH", img: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
        { name: "IBOVESPA", val: "128.450", s: "B3", img: "https://logodownload.org/wp-content/uploads/2017/10/b3-logo.png" },
        { name: "USD/BRL", val: "5.021", s: "USD", img: "https://flagcdn.com/w80/us.png" },
        { name: "S&P 500", val: "5.123", s: "SPX", img: "https://logo.clearbit.com/spglobal.com" },
        { name: "NASDAQ", val: "16.270", s: "NSD", img: "https://logo.clearbit.com/nasdaq.com" }
    ],

    assets: ["PETR4", "VALE3", "ITUB4", "BBAS3", "BBDC4", "ELET3", "WEGE3", "RENT3", "SUZB3", "JBSS3", "MGLU3", "AMER3", "AZUL4", "GOLL4", "LREN3", "CVCB3", "VIIA3", "COGN3", "HAPV3", "BEEF3"],

    init() {
        this.renderTicker();
        this.renderRankings();
        this.initTV("BMFBOVESPA:IBOV");
        this.renderNews(false);

        // Timer de Reordenação (60 segundos)
        setInterval(() => this.renderRankings(), 60000);
        let timeLeft = 60;
        setInterval(() => {
            timeLeft = timeLeft <= 1 ? 60 : timeLeft - 1;
            const timerEl = document.getElementById('timer');
            if(timerEl) timerEl.innerText = timeLeft;
        }, 1000);

        // Notícias (5 em 5 minutos)
        setInterval(() => this.renderNews(true), 300000);
    },

    renderTicker() {
        const track = document.getElementById('globalTicker');
        const content = this.tickerData.map(item => `
            <div class="ticker-item">
                <img src="${item.img}" onerror="this.src='https://ui-avatars.com/api/?name=${item.s}&background=d4af37&color=fff'">
                ${item.name} <b>${item.val}</b>
            </div>
        `).join('');
        track.innerHTML = content + content;
    },

    initTV(symbol) {
        document.getElementById('tradingview_alpha').innerHTML = ''; // Limpa antes de carregar
        new TradingView.widget({
            "autosize": true, "symbol": symbol, "theme": "dark",
            "container_id": "tradingview_alpha", "backgroundColor": "#001633",
            "gridColor": "rgba(211, 175, 55, 0.05)", "locale": "br"
        });
    },

    renderRankings() {
        const hList = document.getElementById('highList');
        const lList = document.getElementById('lowList');
        
        // Gera e ordena os dados
        let data = this.assets.map(s => ({ symbol: s, val: parseFloat((Math.random() * 10 - 5).toFixed(2)) }));
        
        const sortedHighs = [...data].sort((a, b) => b.val - a.val).slice(0, 10);
        const sortedLows = [...data].sort((a, b) => a.val - b.val).slice(0, 10);

        hList.innerHTML = sortedHighs.map(a => `
            <div class="asset-row" onclick="AlphaCore.initTV('BMFBOVESPA:${a.symbol}')">
                <span>${a.symbol}</span><span style="color:var(--green)">▲ ${a.val.toFixed(2)}%</span>
            </div>`).join('');

        lList.innerHTML = sortedLows.map(a => `
            <div class="asset-row" onclick="AlphaCore.initTV('BMFBOVESPA:${a.symbol}')">
                <span>${a.symbol}</span><span style="color:var(--red)">▼ ${a.val.toFixed(2)}%</span>
            </div>`).join('');
    },

    renderNews(playSound) {
        const feed = document.getElementById('newsFeed');
        const sources = [
            {n: "BLOOMBERG", t: "Fluxo de capital estrangeiro bate recorde na B3.", u: "https://www.bloomberg.com.br"},
            {n: "CNN BUSINESS", t: "Inflação nos EUA impacta mercados emergentes.", u: "https://www.cnnbrasil.com.br/economia/"},
            {n: "REUTERS", t: "Ouro atinge máxima histórica com busca por segurança.", u: "https://www.reuters.com"},
            {n: "INFO MONEY", t: "Ibovespa sobe impulsionado por commodities e setor bancário.", u: "https://www.infomoney.com.br"}
        ];
        const item = sources[Math.floor(Math.random() * sources.length)];
        const html = `
            <a href="${item.u}" target="_blank" class="news-item">
                <small style="color:var(--gold)">${item.n} • AGORA</small>
                <h3 style="margin-top:10px">${item.t}</h3>
                <p style="font-size:11px; color:#555; margin-top:8px">Leia no portal oficial →</p>
            </a>`;
        feed.insertAdjacentHTML('afterbegin', html);
        if(playSound) {
            const audio = document.getElementById('notif-sound');
            if(audio) audio.play().catch(()=>{});
        }
    }
};

window.switchTab = (t) => {
    document.getElementById('marketView').classList.toggle('hidden', t === 'news');
    document.getElementById('rankingView').classList.toggle('hidden', t === 'news');
    document.getElementById('newsView').classList.toggle('hidden', t === 'market');
};

window.toggleRanking = (type) => {
    document.getElementById('highList').classList.toggle('hidden', type === 'low');
    document.getElementById('lowList').classList.toggle('hidden', type === 'high');
    document.getElementById('btn-high').classList.toggle('active', type === 'high');
    document.getElementById('btn-low').classList.toggle('active', type === 'low');
};

document.addEventListener('DOMContentLoaded', () => AlphaCore.init());
