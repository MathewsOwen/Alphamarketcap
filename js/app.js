window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        const content = document.getElementById('site-content');
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
            content.style.display = 'block';
            setTimeout(() => { 
                content.style.opacity = '1'; 
                initApp();
            }, 50);
        }, 800);
    }, CONFIG.SPLASH_DELAY || 3000);
});

function initApp() {
    new TradingView.widget({
        "container_id": "main-chart", "symbol": CONFIG.IBOV_SYMBOL,
        "interval": "D", "theme": "dark", "style": "3", "width": "100%", "height": "450", "locale": "br"
    });
    loadData();
    setInterval(() => { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }, 1000);
}

async function loadData() {
    try {
        const response = await fetch(CONFIG.SHEET_URL);
        const csvText = await response.text();
        const rows = csvText.split('\n').slice(1);
        const sectors = {};

        rows.forEach(row => {
            const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if(cols[0] && cols[0].trim() !== "") {
                const stock = {
                    ticker: cols[0].replace(/"/g,'').trim(),
                    name: cols[1]?.replace(/"/g,'').trim() || "",
                    price: cols[2]?.trim() || "0,00",
                    // LIMPEZA: Pega apenas os primeiros 5 caracteres da variação (ex: -0.33)
                    pct: cols[3]?.trim().substring(0, 6) || "0%"
                };
                const sectorName = (cols[4] || "Outros").trim().replace(/"/g,'');
                if(!sectors[sectorName]) sectors[sectorName] = [];
                sectors[sectorName].push(stock);
            }
        });
        renderSectors(sectors);
    } catch (err) { console.error("Erro ao processar dados:", err); }
}

function renderSectors(sectors) {
    const container = document.getElementById('sectors-container');
    container.innerHTML = ""; // Limpa antes de renderizar
    
    for (const name in sectors) {
        const section = document.createElement('div');
        section.innerHTML = `<h2 class="sector-title">${name}</h2>`;
        const grid = document.createElement('div');
        grid.className = 'stocks-grid';

        sectors[name].forEach(s => {
            const isNegative = s.pct.includes('-');
            grid.innerHTML += `
                <div class="stock-card" onclick="window.open('https://br.tradingview.com/symbols/${s.ticker}')">
                    <div style="color:var(--accent); font-weight:800; font-size:12px; letter-spacing:1px">${s.ticker}</div>
                    <div class="price">R$ ${s.price}</div>
                    <div class="pct" style="color:${isNegative ? 'var(--down)' : 'var(--up)'}">
                        ${isNegative ? '▼' : '▲'} ${s.pct}
                    </div>
                </div>`;
        });
        section.appendChild(grid);
        container.appendChild(section);
    }
}
