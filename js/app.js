window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splash-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('splash-screen').style.display = 'none';
            document.getElementById('site-content').style.display = 'block';
            setTimeout(() => { 
                document.getElementById('site-content').style.opacity = '1'; 
                initApp();
            }, 50);
        }, 800);
    }, 3000);
});

function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    event.currentTarget.classList.add('active');
}

function initApp() {
    new TradingView.widget({
        "container_id": "main-chart", "symbol": "BMFBOVESPA:IBOV",
        "interval": "D", "theme": "dark", "style": "3", "width": "100%", "height": "100%", "locale": "br"
    });
    loadData();
    setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }, 1000);
}

async function loadData() {
    const res = await fetch(CONFIG.SHEET_URL);
    const text = await res.text();
    const rows = text.split('\n').slice(1);
    const sectors = {};
    const allStocks = [];

    rows.forEach(row => {
        // Regex para remover aspas e separar por vírgula corretamente
        const c = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(item => item.replace(/"/g, '').trim());
        
        if(c[0]) {
            const s = {
                ticker: c[0],
                name: c[1] || c[0],
                price: c[2],
                pct: c[3]?.substring(0,6) || "0%",
                sector: c[4] || "Outros",
                rawPct: parseFloat(c[3]?.replace(',', '.') || 0)
            };
            allStocks.push(s);
            if(!sectors[s.sector]) sectors[s.sector] = [];
            sectors[s.sector].push(s);
        }
    });

    renderHighlights(allStocks);
    renderSectors(sectors);
}

function renderHighlights(stocks) {
    const gainers = [...stocks].sort((a, b) => b.rawPct - a.rawPct).slice(0, 8);
    const losers = [...stocks].sort((a, b) => a.rawPct - b.rawPct).slice(0, 8);

    const gainersDiv = document.getElementById('top-gainers');
    const losersDiv = document.getElementById('top-losers');

    const createList = (list) => list.map(s => `
        <div class="side-item">
            <div><b>${s.ticker}</b><br><small>${s.name}</small></div>
            <span style="color:${s.rawPct >= 0 ? 'var(--up)' : 'var(--down)'}">${s.pct}</span>
        </div>
    `).join('');

    gainersDiv.innerHTML = createList(gainers);
    losersDiv.innerHTML = createList(losers);
}

function renderSectors(sectors) {
    const container = document.getElementById('sectors-container');
    container.innerHTML = "";
    for (const name in sectors) {
        const div = document.createElement('div');
        div.innerHTML = `<h2 class="sector-title">${name}</h2>`;
        const grid = document.createElement('div');
        grid.className = 'stocks-grid';
        
        sectors[name].forEach(s => {
            const isNeg = s.rawPct < 0;
            grid.innerHTML += `
                <div class="stock-card" onclick="window.location.href='detalhes.html?symbol=${s.ticker}'">
                    <div class="stock-name">${s.name}</div>
                    <div class="stock-ticker">${s.ticker}</div>
                    <div class="price">R$ ${s.price}</div>
                    <div style="color:${isNeg?'var(--down)':'var(--up)'}; font-weight:700; font-size:13px;">
                        ${isNeg?'▼':'▲'} ${s.pct}
                    </div>
                </div>`;
        });
        div.appendChild(grid);
        container.appendChild(div);
    }
}
