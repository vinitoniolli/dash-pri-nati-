const data = window.dashboardData;
const contentArea = document.getElementById("content-area");
const tabsTrack = document.getElementById("tabs-track");
const badge = document.getElementById("invested-badge");
const infoModal = document.getElementById("card-info-modal");
const infoModalTitle = document.getElementById("info-modal-title");
const infoModalBody = document.getElementById("info-modal-body");
let activeTabId = "overview";
let chartInstances = [];

const cardInfoMap = {
  "kpi:Investimento total": "overview-investment",
  "kpi:Total de leads": "overview-leads",
  "kpi:CPL médio geral": "overview-cpl",
  "kpi:Total de disparos/ações": "overview-actions",
  "kpi:Cancelamentos de e-mail": "overview-cancellations",
  "panel:Distribuição do investimento": "overview-donut",
  "panel:Leads por agência": "overview-leads-chart",
  "panel:CPL por agência": "overview-cpl-chart",
  "panel:Investimento por funil": "funnel-table",
  "panel:Distribuição do funil": "funnel-chart",
  "panel:ATHUS": "athus-card",
  "panel:GLOBAL": "global-card",
  "panel:Instituto IBPF": "matheus-instituto-card",
  "panel:Consultoria Financeira": "matheus-financeira-card",
  "panel:Imersão Presencial": "matheus-imersao-card",
  "panel:Comparativo de CTR, CPM e CPC": "agencies-chart",
  "panel:Leitura da campanha": "agencies-reading",
  "panel:Live Kim — 15/07": "live-15-card",
  "panel:Live Kim — 22/07": "live-22-card",
  "panel:Live KIM — 27/07": "live-27-card",
  "panel:Comparativo de visualizações": "lives-chart",
  "panel:Ponto de atenção": "lives-highlight",
  "kpi:Ações no total": "crm-total-card",
  "kpi:WhatsApp": "crm-whatsapp-card",
  "kpi:E-mail": "crm-email-card",
  "kpi:SMS": "crm-sms-card",
  "panel:Narrativas trabalhadas": "crm-types-card",
  "panel:Melhores desempenhos no WhatsApp": "crm-whatsapp-chart",
  "panel:WhatsApp — maiores taxas de visualização": "crm-view-rate-card",
  "panel:WhatsApp — maiores taxas de clique": "crm-click-rate-card",
  "panel:WhatsApp — mais visualizações": "crm-top-views-card",
  "panel:WhatsApp — mais cliques": "crm-top-clicks-card",
  "panel:E-mail — melhores disparos": "crm-email-chart-card",
  "panel:E-mail — mais cliques": "crm-email-clicks-card",
  "panel:E-mail — maiores aberturas": "crm-email-opens-card",
  "panel:Queda da abertura do e-mail": "crm-email-chart",
  "panel:SMS": "crm-sms-detail-card",
  "panel:Conclusão": "crm-conclusion-card",
  "panel:✅ Funcionou": "what-worked-card",
  "panel:⚠️ Não funcionou": "what-not-worked-card",
  "panel:Melhores do WhatsApp": "what-worked-whatsapp-card",
  "panel:Insight": "what-worked-insight-card",
  "panel:LinkedIn — Kim Paiffer": "social-linkedin-card",
  "panel:Linha de narrativa — Atom": "social-narrative-card",
  "panel:Pilares": "social-pilares-card",
  "panel:O que mais / menos funciona": "social-best-worst-card",
  "panel:Feedback — Global": "social-feedback-global-card",
  "panel:Feedback — Matheus": "social-feedback-matheus-card",
  "panel:Athus": "roi-athus-card",
  "panel:Global": "roi-global-card",
  "panel:Matheus": "roi-matheus-card",
  "panel:Principais destaques do mês": "roi-card",
  "panel:LinkedIn / Kim Paiffer": "strategy-linkedin-card",
  "panel:Atom": "strategy-atom-card",
  "panel:Ações de agosto": "strategy-card",
  "panel:Como apresentar este dashboard": "guide-card"
};

// Cor por entidade: cada agência mantém a mesma cor em qualquer gráfico.
// Trio validado para o fundo navy (faixa de luminosidade, croma, separação
// para daltonismo em todos os pares e contraste >= 3:1).
const AGENCY_COLORS = {
  Athus: "#3987e5",
  Global: "#c98500",
  Matheus: "#199e70"
};

const CHART_INK = {
  primary: "#eaf1ff",
  muted: "#9bb0d3",
  grid: "rgba(255, 255, 255, 0.08)"
};

// Série única: uma cor só para todas as barras — a categoria já está no eixo.
const SERIES_COLOR = "#3987e5";

function openInfoModal(key, title) {
  const message = data.cardInfo?.[key] || "Informações de ajuda não estão disponíveis para este card.";
  infoModalTitle.textContent = title;
  infoModalBody.textContent = message;
  infoModal.classList.remove("hidden");
}

function closeInfoModal() {
  infoModal.classList.add("hidden");
}

infoModal.addEventListener("click", (event) => {
  if (event.target === infoModal || event.target.classList.contains("info-modal-close")) {
    closeInfoModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !infoModal.classList.contains("hidden")) {
    closeInfoModal();
  }
});

function createInfoButton(card, key, title) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "info-button";
  button.setAttribute("aria-label", `Ajuda: como funciona este card - ${title}`);
  button.textContent = "Ajuda";
  button.addEventListener("click", () => openInfoModal(key, title));
  card.appendChild(button);
}

function setupCardInfoButtons(panel) {
  const cards = panel.querySelectorAll(".kpi-card, .panel-card, .table-card, .alert-card, .success-card, .metric-card");

  cards.forEach((card) => {
    const labelEl = card.querySelector(".kpi-label, .section-title, h3");
    if (!labelEl) return;
    const title = labelEl.textContent.trim();
    const typePrefix = card.classList.contains("kpi-card") ? "kpi:" : "panel:";
    const key = cardInfoMap[`${typePrefix}${title}`] || cardInfoMap[title];
    if (!key) return;
    if (card.querySelector(".info-button")) return;
    createInfoButton(card, key, title);
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

// 54 -> "54%", 17.5 -> "17,50%", 26.77 -> "26,77%".
function formatPercent(value) {
  return `${value.toFixed(2).replace(/\.00$/, "").replace(".", ",")}%`;
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
}

// Lista ranqueada com barra embutida: as mensagens são frases longas demais para
// virarem rótulo de eixo, então o texto ocupa a linha e a barra mostra a taxa.
// A barra vai de 0 a 100%, não ao maior valor do painel — assim dá para ver que
// as taxas de clique são bem menores que as de visualização.
function rankCard(title, rows, formatValue) {
  return `
    <article class="panel-card">
      <h3 class="section-title">${title}</h3>
      <div class="rank-list">
        ${rows.map((row) => `
          <div class="rank-row">
            <p class="rank-message">${escapeHtml(row.message)}</p>
            <div class="rank-meta">
              <span class="rank-base">${escapeHtml(row.base)}${row.date ? ` · ${row.date}` : ""}</span>
              <span class="rank-value">${formatValue(row)}</span>
            </div>
            <div class="rank-track"><span class="rank-bar" style="width: ${row.rate}%"></span></div>
          </div>
        `).join("")}
      </div>
    </article>
  `;
}

// Tabela orientada a colunas: cada coluna é { key, label, num, strong }.
// As tabelas de WhatsApp e de e-mail têm formatos diferentes, então a forma
// vem da lista de colunas e não do corpo da função.
function dataTable(title, columns, rows) {
  const cell = (tag, column, content) =>
    `<${tag}${column.num ? ' class="num"' : ""}>${content}</${tag}>`;

  return `
    <article class="table-card">
      <h3 class="section-title">${title}</h3>
      <table>
        <thead>
          <tr>${columns.map((column) => cell("th", column, column.label)).join("")}</tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>${columns.map((column) => {
              const value = escapeHtml(row[column.key]);
              return cell("td", column, column.strong ? `<strong>${value}</strong>` : value);
            }).join("")}</tr>
          `).join("")}
        </tbody>
      </table>
    </article>
  `;
}

const WHATSAPP_VOLUME_COLUMNS = (valueHeading) => [
  { key: "date", label: "Data" },
  { key: "base", label: "Base" },
  { key: "action", label: "Ação" },
  { key: "value", label: valueHeading, num: true, strong: true },
  { key: "rate", label: "Taxa", num: true }
];

function buildTabButtons() {
  tabsTrack.innerHTML = "";

  data.tabs.forEach((tab, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tab-button";
    button.textContent = tab.label;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", tab.id === activeTabId ? "true" : "false");
    button.setAttribute("tabindex", tab.id === activeTabId ? "0" : "-1");
    button.dataset.tab = tab.id;

    button.addEventListener("click", () => setActiveTab(tab.id));
    button.addEventListener("keydown", (event) => handleTabKeydown(event, index));

    tabsTrack.appendChild(button);
  });
}

function handleTabKeydown(event, index) {
  const buttons = Array.from(tabsTrack.querySelectorAll(".tab-button"));
  let nextIndex = index;

  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    nextIndex = event.key === "ArrowRight" ? (index + 1) % buttons.length : (index - 1 + buttons.length) % buttons.length;
    buttons[nextIndex].focus();
    setActiveTab(buttons[nextIndex].dataset.tab);
  }
}

function setActiveTab(tabId) {
  activeTabId = tabId;
  buildTabButtons();
  renderActivePanel();
}

function renderActivePanel() {
  const panel = document.createElement("section");
  panel.className = "panel active";

  if (activeTabId === "overview") {
    panel.innerHTML = `
      <div class="kpi-grid">
        ${data.overview.kpis.map((item) => `
          <article class="kpi-card">
            <span class="kpi-label">${item.label}</span>
            <h3 class="metric-value counter" data-target="${item.value}">${item.value}</h3>
            <p class="metric-caption">${item.caption}</p>
          </article>
        `).join("")}
      </div>
      <div class="grid-2" style="margin-top: 16px;">
        <article class="panel-card chart-card">
          <h3 class="section-title">Distribuição do investimento</h3>
          <div class="chart-shell"><canvas id="donutChart"></canvas></div>
        </article>
        <article class="panel-card chart-card">
          <h3 class="section-title">Leads por agência</h3>
          <div class="chart-shell"><canvas id="leadChart"></canvas></div>
        </article>
      </div>
      <div class="panel-card chart-card" style="margin-top: 16px;">
        <h3 class="section-title">CPL por agência</h3>
        <div class="chart-shell"><canvas id="cplChart"></canvas></div>
      </div>
    `;
  }

  if (activeTabId === "funnel") {
    panel.innerHTML = `
      <div class="grid-2">
        <article class="table-card">
          <h3 class="section-title">Investimento por funil</h3>
          <table>
            <thead>
              <tr>
                <th>Funil</th>
                <th>Investimento</th>
              </tr>
            </thead>
            <tbody>
              ${data.funnel.rows.map((row) => `
                <tr>
                  <td>${row.name}</td>
                  <td>${row.total ? `<strong>${row.value}</strong>` : row.value}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </article>
        <article class="panel-card chart-card">
          <h3 class="section-title">Distribuição do funil</h3>
          <div class="chart-shell"><canvas id="funnelChart"></canvas></div>
        </article>
      </div>
      <article class="notice-card" style="margin-top: 16px;">
        <h3 class="section-title">Observação</h3>
        <p class="metric-caption">${data.funnel.observation}</p>
      </article>
    `;
  }

  if (activeTabId === "agencies") {
    panel.innerHTML = `
      <div class="agency-grid">
        <article class="panel-card">
          <h3 class="section-title">${data.agencies.athus.name}</h3>
          <p class="metric-caption" style="margin-bottom: 10px; color: var(--texto-suave);">${data.agencies.athus.period}</p>
          <p class="metric-value">${data.agencies.athus.investment}</p>
          <p class="metric-caption">Leads: ${data.agencies.athus.leads} · CPL: ${data.agencies.athus.cpl} · CTR: ${data.agencies.athus.ctr}</p>
          <div class="metric-list">
            <div class="metric-item"><span>Resumo Meta</span><strong>${data.agencies.athus.summary.investment}</strong></div>
            <div class="metric-item"><span>Leads</span><strong>${data.agencies.athus.summary.leads}</strong></div>
            <div class="metric-item"><span>CPL</span><strong>${data.agencies.athus.summary.cpl}</strong></div>
            <div class="metric-item"><span>CTR</span><strong>${data.agencies.athus.summary.ctr}</strong></div>
            <div class="metric-item"><span>CPM</span><strong>${data.agencies.athus.summary.cpm}</strong></div>
            <div class="metric-item"><span>WhatsApp</span><strong>${data.agencies.athus.summary.whatsapp}</strong></div>
          </div>
        </article>
        <article class="panel-card alert-card">
          <h3 class="section-title">${data.agencies.global.name}</h3>
          <p class="metric-caption" style="margin-bottom: 10px; color: var(--texto-suave);">${data.agencies.global.period}</p>
          <p class="metric-caption">Imersão Presencial</p>
          <div class="metric-list">
            <div class="metric-item"><span>Impressões Meta</span><strong>${data.agencies.global.meta.impressions}</strong></div>
            <div class="metric-item"><span>Alcance Meta</span><strong>${data.agencies.global.meta.reach}</strong></div>
            <div class="metric-item"><span>CTR Meta</span><strong>${data.agencies.global.meta.ctr}</strong></div>
            <div class="metric-item"><span>CPC</span><strong>${data.agencies.global.meta.cpc}</strong></div>
            <div class="metric-item"><span>Gasto Meta</span><strong>${data.agencies.global.meta.gasto}</strong></div>
            <div class="metric-item"><span>Impressões Google</span><strong>${data.agencies.global.google.impressions}</strong></div>
            <div class="metric-item"><span>CTR Google</span><strong>${data.agencies.global.google.ctr}</strong></div>
            <div class="metric-item"><span>Gasto Google</span><strong>${data.agencies.global.google.gasto}</strong></div>
            <div class="metric-item"><span>Total Leads</span><strong>${data.agencies.global.total.leads}</strong></div>
            <div class="metric-item"><span>Total CPL</span><strong>${data.agencies.global.total.cpl}</strong></div>
            <div class="metric-item"><span>Total CPM</span><strong>${data.agencies.global.total.cpm}</strong></div>
            <div class="metric-item"><span>Total CPC</span><strong>${data.agencies.global.total.cpc}</strong></div>
            <div class="metric-item"><span>Total Gasto</span><strong>${data.agencies.global.total.gasto}</strong></div>
          </div>
        </article>
        <article class="panel-card">
          <h3 class="section-title">Matheus — ${data.agencies.matheus.campaigns[0].name}</h3>
          <p class="metric-caption" style="margin-bottom: 10px; color: var(--texto-suave);">${data.agencies.matheus.period}</p>
          <div class="metric-list">
            <div class="metric-item"><span>Impressões</span><strong>${data.agencies.matheus.campaigns[0].impressions}</strong></div>
            <div class="metric-item"><span>Alcance</span><strong>${data.agencies.matheus.campaigns[0].reach}</strong></div>
            <div class="metric-item"><span>Leads</span><strong>${data.agencies.matheus.campaigns[0].leads}</strong></div>
            <div class="metric-item"><span>CPL</span><strong>${data.agencies.matheus.campaigns[0].cpl}</strong></div>
            <div class="metric-item"><span>CPC</span><strong>${data.agencies.matheus.campaigns[0].cpc}</strong></div>
            <div class="metric-item"><span>CTR</span><strong>${data.agencies.matheus.campaigns[0].ctr}</strong></div>
            <div class="metric-item"><span>CPM</span><strong>${data.agencies.matheus.campaigns[0].cpm}</strong></div>
            <div class="metric-item"><span>Gasto</span><strong>${data.agencies.matheus.campaigns[0].gasto}</strong></div>
          </div>
        </article>
      </div>
      <div class="agency-grid" style="margin-top: 16px;">
        ${data.agencies.matheus.campaigns.slice(1).map((campaign) => `
          <article class="panel-card">
            <h3 class="section-title">Matheus — ${campaign.name}</h3>
            <p class="metric-caption" style="margin-bottom: 10px; color: var(--texto-suave);">${data.agencies.matheus.period}</p>
            <div class="metric-list">
              <div class="metric-item"><span>Impressões</span><strong>${campaign.impressions}</strong></div>
              <div class="metric-item"><span>Alcance</span><strong>${campaign.reach}</strong></div>
              <div class="metric-item"><span>Leads</span><strong>${campaign.leads}</strong></div>
              <div class="metric-item"><span>CPL</span><strong>${campaign.cpl}</strong></div>
              <div class="metric-item"><span>CPC</span><strong>${campaign.cpc}</strong></div>
              <div class="metric-item"><span>CTR</span><strong>${campaign.ctr}</strong></div>
              <div class="metric-item"><span>CPM</span><strong>${campaign.cpm}</strong></div>
              <div class="metric-item"><span>Gasto</span><strong>${campaign.gasto}</strong></div>
            </div>
          </article>
        `).join("")}
      </div>
      <article class="panel-card compare-card" style="margin-top: 16px;">
        <h3 class="section-title">Comparativo de CTR, CPM e CPC</h3>
        <p class="metric-caption">Cada métrica tem a sua própria escala. Compare as agências dentro de cada painel — nunca de um painel para o outro.</p>
        <div class="small-multiples">
          <div class="sm-panel">
            <h4 class="sm-title">CPM<span>custo por mil impressões · menor é melhor</span></h4>
            <div class="chart-shell sm"><canvas id="cpmChart"></canvas></div>
          </div>
          <div class="sm-panel">
            <h4 class="sm-title">CPC<span>custo por clique · menor é melhor</span></h4>
            <div class="chart-shell sm"><canvas id="cpcChart"></canvas></div>
          </div>
          <div class="sm-panel">
            <h4 class="sm-title">CTR<span>taxa de clique · maior é melhor</span></h4>
            <div class="chart-shell sm"><canvas id="ctrChart"></canvas></div>
          </div>
        </div>
      </article>
      <article class="notice-card" style="margin-top: 16px;">
        <h3 class="section-title">Leitura da campanha</h3>
        <p class="metric-caption">${data.agencies.reading}</p>
      </article>
    `;
  }

  if (activeTabId === "lives") {
    panel.innerHTML = `
      <div class="live-grid">
        ${data.lives.cards.map((card) => `
          <article class="panel-card">
            <h3 class="section-title">${card.title}</h3>
            <div class="metric-list">
              ${card.metrics.map((item) => `
                <div class="metric-item"><span>${item.label}</span><strong>${item.value}</strong></div>
              `).join("")}
            </div>
          </article>
        `).join("")}
      </div>
      <article class="panel-card chart-card" style="margin-top: 16px;">
        <h3 class="section-title">Comparativo de visualizações</h3>
        <div class="chart-shell"><canvas id="livesChart"></canvas></div>
      </article>
      <article class="alert-card panel-card" style="margin-top: 16px;">
        <h3 class="section-title">Ponto de atenção</h3>
        <p class="metric-value">${data.lives.highlight}</p>
      </article>
    `;
  }

  if (activeTabId === "crm") {
    panel.innerHTML = `
      <div class="kpi-grid">
        <article class="kpi-card">
          <span class="kpi-label">Ações no total</span>
          <h3 class="metric-value">${data.crm.summary.total}</h3>
          <p class="metric-caption">WhatsApp + e-mail + SMS</p>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">WhatsApp</span>
          <h3 class="metric-value">${data.crm.summary.whatsapp}</h3>
          <p class="metric-caption">Ações no período</p>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">E-mail</span>
          <h3 class="metric-value">${data.crm.summary.email}</h3>
          <p class="metric-caption">Ações no período</p>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">SMS</span>
          <h3 class="metric-value">${data.crm.summary.sms}</h3>
          <p class="metric-caption">Ações no período</p>
        </article>
      </div>
      <div class="panel-card" style="margin-top: 16px;">
        <h3 class="section-title">Narrativas trabalhadas</h3>
        <div class="tag-list">
          ${data.crm.tags.map((item) => `<span class="tag-chip">${item}</span>`).join("")}
        </div>
      </div>
      <div class="grid-2" style="margin-top: 16px;">
        <article class="panel-card chart-card">
          <h3 class="section-title">Melhores desempenhos no WhatsApp</h3>
          <div class="chart-shell"><canvas id="whatsappChart"></canvas></div>
        </article>
        <article class="panel-card chart-card">
          <h3 class="section-title">Queda da abertura do e-mail</h3>
          <div class="chart-shell small"><canvas id="emailChart"></canvas></div>
          <div class="metric-list">
            ${data.crm.email.points.map((point) => `
              <div class="metric-item"><span>${point.date}</span><strong>${point.base} · ${point.opening}</strong></div>
            `).join("")}
          </div>
        </article>
      </div>
      <div class="two-col" style="margin-top: 16px;">
        ${rankCard("WhatsApp — maiores taxas de visualização", data.crm.whatsapp.topViewRate, (item) => `${item.views} · ${formatPercent(item.rate)}`)}
        ${rankCard("WhatsApp — maiores taxas de clique", data.crm.whatsapp.topClickRate, (item) => formatPercent(item.rate))}
      </div>
      <div class="two-col" style="margin-top: 16px;">
        ${dataTable("WhatsApp — mais visualizações", WHATSAPP_VOLUME_COLUMNS("Visualizações"), data.crm.whatsapp.topViews)}
        ${dataTable("WhatsApp — mais cliques", WHATSAPP_VOLUME_COLUMNS("Cliques"), data.crm.whatsapp.topClicks)}
      </div>
      <article class="panel-card compare-card" style="margin-top: 16px;">
        <h3 class="section-title">E-mail — melhores disparos</h3>
        <p class="metric-caption">Cliques e aberturas têm escalas muito diferentes, então cada painel tem a sua. Os mesmos números estão nas tabelas abaixo.</p>
        <div class="small-multiples cols-2">
          <div class="sm-panel">
            <h4 class="sm-title">Cliques<span>por disparo · maior é melhor</span></h4>
            <div class="chart-shell sm"><canvas id="emailClicksChart"></canvas></div>
          </div>
          <div class="sm-panel">
            <h4 class="sm-title">Aberturas<span>por disparo · maior é melhor</span></h4>
            <div class="chart-shell sm"><canvas id="emailOpensChart"></canvas></div>
          </div>
        </div>
      </article>
      <div class="two-col" style="margin-top: 16px;">
        ${dataTable("E-mail — mais cliques", [
          { key: "date", label: "Data" },
          { key: "action", label: "Ação / título principal" },
          { key: "value", label: "Cliques", num: true, strong: true }
        ], data.crm.email.topClicks)}
        ${dataTable("E-mail — maiores aberturas", [
          { key: "date", label: "Data" },
          { key: "action", label: "Título" },
          { key: "value", label: "Aberturas", num: true, strong: true },
          { key: "rate", label: "Taxa", num: true }
        ], data.crm.email.topOpens)}
      </div>
      <article class="panel-card" style="margin-top: 16px;">
        <h3 class="section-title">SMS</h3>
        <div class="metric-list">
          ${data.crm.sms.items.map((item) => `
            <div class="metric-item"><span>${item.label}</span><strong>${item.value}</strong></div>
          `).join("")}
        </div>
      </article>
      <article class="notice-card" style="margin-top: 16px;">
        <h3 class="section-title">Conclusão</h3>
        <p class="metric-caption">${data.crm.conclusion}</p>
      </article>
    `;
  }

  if (activeTabId === "what-worked") {
    panel.innerHTML = `
      <div class="two-col">
        <article class="panel-card success-card">
          <h3 class="section-title">✅ Funcionou</h3>
          <div class="metric-list">
            ${data.whatWorked.worked.map((item) => `<div class="metric-item"><span>${item}</span></div>`).join("")}
          </div>
        </article>
        <article class="panel-card alert-card">
          <h3 class="section-title">⚠️ Não funcionou</h3>
          <div class="metric-list">
            ${data.whatWorked.failed.map((item) => `<div class="metric-item"><span>${item}</span></div>`).join("")}
          </div>
        </article>
      </div>
      <div class="two-col" style="margin-top: 16px;">
        <article class="panel-card">
          <h3 class="section-title">Melhores do WhatsApp</h3>
          <div class="metric-list">
            ${data.whatWorked.whatsapp.map((item) => `<div class="metric-item"><span>${item}</span></div>`).join("")}
          </div>
        </article>
        <article class="notice-card">
          <h3 class="section-title">Insight</h3>
          <p class="metric-caption">${data.whatWorked.insight}</p>
        </article>
      </div>
    `;
  }

  if (activeTabId === "social") {
    panel.innerHTML = `
      <div class="social-grid">
        <article class="panel-card">
          <h3 class="section-title">LinkedIn — Kim Paiffer</h3>
          <p class="metric-caption">${data.social.linkedin}</p>
        </article>
        <article class="panel-card">
          <h3 class="section-title">Linha de narrativa — Atom</h3>
          <p class="metric-caption">${data.social.narrative}</p>
        </article>
      </div>
      <div class="two-col" style="margin-top: 16px;">
        <article class="panel-card">
          <h3 class="section-title">Pilares</h3>
          <div class="metric-list">
            ${data.social.pillars.map((pillar) => `<div class="metric-item"><span>${pillar}</span></div>`).join("")}
          </div>
        </article>
        <article class="panel-card">
          <h3 class="section-title">O que mais / menos funciona</h3>
          <div class="metric-list">
            <div class="metric-item"><span>Mais funciona</span><strong>${data.social.best}</strong></div>
            <div class="metric-item"><span>Menos funciona</span><strong>${data.social.worst}</strong></div>
          </div>
        </article>
      </div>
      <div class="two-col" style="margin-top: 16px;">
        ${data.social.metrics.map((metric) => `
          <article class="panel-card">
            <h3 class="section-title">${metric.title}</h3>
            <div class="metric-list">
              ${metric.items.map((item) => `<div class="metric-item"><span>${item.label}</span><strong>${item.value}</strong></div>`).join("")}
            </div>
          </article>
        `).join("")}
      </div>
      <article class="panel-card" style="margin-top: 16px;">
        <h3 class="section-title">${data.social.blog.title}</h3>
        <div class="metric-list">
          ${data.social.blog.items.map((item) => `<div class="metric-item"><span>${item}</span></div>`).join("")}
        </div>
      </article>
      <div class="two-col" style="margin-top: 16px;">
        ${data.social.feedback.map((item) => `
          <article class="panel-card">
            <h3 class="section-title">Feedback — ${item.agency}</h3>
            <p class="metric-caption">${item.text}</p>
          </article>
        `).join("")}
      </div>
    `;
  }

  if (activeTabId === "roi") {
    panel.innerHTML = `
      <div class="roi-grid">
        ${data.roi.cards.map((card) => `
          <article class="panel-card">
            <h3 class="section-title">${card.agency}</h3>
            <p class="metric-caption">${card.message}</p>
          </article>
        `).join("")}
      </div>
      <article class="panel-card" style="margin-top: 16px;">
        <h3 class="section-title">Principais destaques do mês</h3>
        <div class="metric-list">
          ${data.roi.highlights.map((item) => `<div class="metric-item"><span>${item}</span></div>`).join("")}
        </div>
      </article>
    `;
  }

  if (activeTabId === "highlights") {
    panel.innerHTML = `
      <div class="two-col">
        ${data.highlights.groups.map((group) => `
          <article class="panel-card">
            <h3 class="section-title">Feedback — ${group.agency}</h3>
            <div class="metric-list">
              ${group.items.map((item) => `<div class="metric-item"><span>${item}</span></div>`).join("")}
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }

  if (activeTabId === "strategy") {
    panel.innerHTML = `
      <article class="panel-card">
        <h3 class="section-title">${data.strategy.title}</h3>
        <p class="metric-caption">${data.strategy.intro}</p>
      </article>
      <div class="strategy-timeline">
        ${data.strategy.timeline.map((item) => `
          <div class="timeline-item">
            <span class="timeline-period">${item.period}</span>
            <h4>${item.title}</h4>
            <p class="metric-caption">${item.description}</p>
          </div>
        `).join("")}
      </div>
      <div class="strategy-grid" style="margin-top: 24px;">
        ${data.strategy.phases.map((phase) => `
          <article class="panel-card phase-card">
            <span class="phase-tag">${phase.heading}</span>
            <h3 class="section-title">${phase.subheading}</h3>
            ${phase.bullets.length ? `
              <ul class="phase-list">
                ${phase.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
              </ul>
            ` : ""}
          </article>
        `).join("")}
      </div>
    `;
  }

  if (activeTabId === "guide") {
    panel.innerHTML = `
      <article class="panel-card">
        <h3 class="section-title">${data.guide.title}</h3>
        <p class="metric-caption">${data.guide.intro}</p>
      </article>
      ${data.guide.sections.map((section) => `
        <article class="panel-card">
          <h3 class="section-title">${section.title}</h3>
          <p class="metric-caption">${section.text}</p>
        </article>
      `).join("")}
      <article class="panel-card" style="margin-top: 16px;">
        <h3 class="section-title">Glossário de siglas</h3>
        <div class="metric-list glossary-list">
          ${data.guide.glossary.map((item) => `
            <div class="metric-item glossary-item">
              <strong>${item.acronym}</strong>
              <span>${item.definition}</span>
            </div>
          `).join("")}
        </div>
      </article>
    `;
  }

  contentArea.innerHTML = "";
  contentArea.appendChild(panel);
  setupCardInfoButtons(panel);
  badge.textContent = `Investido: ${data.totalInvested}`;
  animateCounters();
  renderCharts();
}

function animateCounters() {
  const counters = contentArea.querySelectorAll(".counter");
  counters.forEach((counter, index) => {
    const from = 0;
    const toValue = counter.dataset.target;
    const isCurrency = toValue.includes("R$");
    const toNumber = parseFloat(toValue.replace(/[R$\.\s]/g, "").replace(",", "."));
    const duration = 850 + index * 80;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      if (isCurrency && !Number.isNaN(toNumber)) {
        counter.textContent = formatCurrency(toNumber * eased);
      } else if (!Number.isNaN(toNumber)) {
        counter.textContent = Math.round(toNumber * eased).toLocaleString("pt-BR");
      } else {
        counter.textContent = toValue;
      }

      if (progress < 1) requestAnimationFrame(step);
      else counter.textContent = toValue;
    };

    requestAnimationFrame(step);
  });
}

// Escreve o valor na ponta de cada barra, para que nenhum número dependa de hover.
function valueLabelPlugin(formatter, orientation = "horizontal") {
  const isHorizontal = orientation === "horizontal";

  return {
    id: "valueLabels",
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      ctx.save();
      ctx.font = '600 12px "Inter", sans-serif';
      ctx.fillStyle = CHART_INK.primary;
      ctx.textAlign = isHorizontal ? "left" : "center";
      ctx.textBaseline = isHorizontal ? "middle" : "bottom";

      chart.getDatasetMeta(0).data.forEach((bar, index) => {
        const value = formatter(chart.data.datasets[0].data[index]);
        ctx.fillText(value, isHorizontal ? bar.x + 8 : bar.x, isHorizontal ? bar.y : bar.y - 8);
      });

      ctx.restore();
    }
  };
}

// "3.192" -> 3192. Os cards guardam os números já formatados em pt-BR.
function parseNumberBR(text) {
  const cleaned = String(text).replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".");
  const value = parseFloat(cleaned);
  return Number.isNaN(value) ? null : value;
}

// Toda live que registrar a métrica escolhida entra no comparativo — assim o
// gráfico nunca fica defasado em relação aos cards.
function liveChartPoints() {
  const metric = data.lives.chartMetric;

  return data.lives.cards
    .map((card) => {
      const entry = card.metrics.find((item) => item.label === metric);
      if (!entry) return null;
      const value = parseNumberBR(entry.value);
      if (value === null) return null;
      return { label: card.title.replace(/^.*—\s*/, ""), value };
    })
    .filter(Boolean);
}

function truncate(text, limit) {
  return text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}…` : text;
}

// Barras horizontais com o valor na ponta. Escala própria por gráfico — nunca
// dois eixos no mesmo plot. `titles` alimenta o tooltip quando o rótulo do eixo
// vem truncado.
function createRankedBarChart(canvasId, options) {
  const { labels, values, color, formatValue, formatTick, tooltipLabel, titles, labelSize = 13 } = options;

  createChart(canvasId, "bar", {
    labels,
    datasets: [{
      data: values,
      backgroundColor: color,
      hoverBackgroundColor: color,
      borderRadius: { topRight: 4, bottomRight: 4 },
      borderSkipped: false,
      maxBarThickness: 24
    }]
  }, {
    indexAxis: "y",
    layout: { padding: { right: 72 } },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#071532",
        titleColor: "#ffc940",
        bodyColor: CHART_INK.primary,
        borderColor: "rgba(255,201,64,0.18)",
        borderWidth: 1,
        displayColors: false,
        padding: 10,
        callbacks: {
          title: (items) => (titles ? titles[items[0].dataIndex] : items[0].label),
          label: (context) => tooltipLabel(context.parsed.x)
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grace: "12%",
        border: { display: false },
        grid: { color: CHART_INK.grid },
        ticks: { color: CHART_INK.muted, maxTicksLimit: 4, callback: formatTick }
      },
      y: {
        border: { display: false },
        grid: { display: false },
        ticks: { color: CHART_INK.primary, font: { size: labelSize } }
      }
    }
  }, [valueLabelPlugin(formatValue)]);
}

// Um painel por métrica: cada uma tem escala própria, então nenhuma escala
// é compartilhada e o gráfico não sugere correlação entre custo e CTR.
function createAgencyMetricChart(canvasId, metric, formatValue, formatTick) {
  const radar = data.agencies.radar;
  const metricIndex = radar.labels.indexOf(metric);
  if (metricIndex === -1) return;

  const labels = radar.datasets.map((item) => item.label);

  createRankedBarChart(canvasId, {
    labels,
    values: radar.datasets.map((item) => item.values[metricIndex]),
    color: labels.map((label) => AGENCY_COLORS[label] || AGENCY_COLORS.Athus),
    formatValue,
    formatTick,
    tooltipLabel: (value) => `${metric}: ${formatValue(value)}`
  });
}

// O assunto do e-mail é o que interessa no eixo: "Ação Kim — “Desculpa insistir”"
// vira "Desculpa insistir". Linhas sem trav essão passam intactas.
function emailSubject(action) {
  return action.split("—").pop().trim().replace(/[“”"]/g, "");
}

function createEmailChart(canvasId, rows, unit) {
  const subjects = rows.map((row) => emailSubject(row.action));
  const count = (value) => value.toLocaleString("pt-BR");

  createRankedBarChart(canvasId, {
    labels: subjects.map((subject) => truncate(subject, 26)),
    titles: subjects,
    values: rows.map((row) => parseNumberBR(row.value)),
    color: SERIES_COLOR,
    formatValue: count,
    formatTick: count,
    tooltipLabel: (value) => `${count(value)} ${unit}`,
    labelSize: 12
  });
}

function renderCharts() {
  chartInstances.forEach((chart) => chart.destroy());
  chartInstances = [];

  if (activeTabId === "overview") {
    createChart("donutChart", "doughnut", {
      labels: data.overview.donut.labels,
      datasets: [{
        data: data.overview.donut.values,
        backgroundColor: ["#1e6fd9", "#6fa8ff", "#ffc940"],
        borderColor: ["#10294f", "#10294f", "#10294f"],
        borderWidth: 2,
        hoverOffset: 8
      }]
    }, { plugins: { legend: { labels: { color: "#eaf1ff" } } }, cutout: "64%" });

    createChart("leadChart", "bar", {
      labels: data.overview.leads.labels,
      datasets: [{
        label: "Leads",
        data: data.overview.leads.values,
        backgroundColor: "#1e6fd9",
        borderRadius: 10,
        maxBarThickness: 28
      }]
    }, { indexAxis: "y", scales: { x: { ticks: { color: "#eaf1ff" }, grid: { color: "rgba(255,255,255,0.06)" } }, y: { ticks: { color: "#eaf1ff" }, grid: { color: "rgba(255,255,255,0.06)" } } } });

    createChart("cplChart", "bar", {
      labels: data.overview.cpl.labels,
      datasets: [{
        label: "CPL",
        data: data.overview.cpl.values,
        backgroundColor: ["#ffc940", "#1e6fd9", "#6fa8ff"],
        borderRadius: 8
      }]
    }, { scales: { y: { beginAtZero: true, ticks: { color: "#eaf1ff" }, grid: { color: "rgba(255,255,255,0.06)" } }, x: { ticks: { color: "#eaf1ff" }, grid: { display: false } } } });
  }

  if (activeTabId === "funnel") {
    createChart("funnelChart", "bar", {
      labels: data.funnel.chart.labels,
      datasets: [{
        label: "Investimento",
        data: data.funnel.chart.values,
        backgroundColor: ["#1e6fd9", "#ffc940", "#6fa8ff"],
        borderRadius: 10,
        maxBarThickness: 36
      }]
    }, { scales: { y: { beginAtZero: true, ticks: { color: "#eaf1ff", callback: (value) => formatCurrency(value) }, grid: { color: "rgba(255,255,255,0.06)" } }, x: { ticks: { color: "#eaf1ff" }, grid: { display: false } } } });
  }

  if (activeTabId === "agencies") {
    const money = (value) => `R$ ${value.toLocaleString("pt-BR")}`;
    const percent = (value) => `${value.toLocaleString("pt-BR")}%`;

    createAgencyMetricChart("cpmChart", "CPM", formatCurrency, money);
    createAgencyMetricChart("cpcChart", "CPC", formatCurrency, money);
    createAgencyMetricChart("ctrChart", "CTR", formatPercent, percent);
  }

  if (activeTabId === "lives") {
    const points = liveChartPoints();
    const count = (value) => value.toLocaleString("pt-BR");

    createChart("livesChart", "bar", {
      labels: points.map((point) => point.label),
      datasets: [{
        label: data.lives.chartMetric,
        data: points.map((point) => point.value),
        backgroundColor: SERIES_COLOR,
        hoverBackgroundColor: SERIES_COLOR,
        borderRadius: { topLeft: 4, topRight: 4 },
        borderSkipped: false,
        maxBarThickness: 24
      }]
    }, {
      layout: { padding: { top: 26 } },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#071532",
          titleColor: "#ffc940",
          bodyColor: CHART_INK.primary,
          borderColor: "rgba(255,201,64,0.18)",
          borderWidth: 1,
          displayColors: false,
          padding: 10,
          callbacks: { label: (context) => `${data.lives.chartMetric}: ${count(context.parsed.y)}` }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          border: { display: false },
          grid: { color: CHART_INK.grid },
          ticks: { color: CHART_INK.muted, maxTicksLimit: 5, callback: count }
        },
        x: {
          border: { display: false },
          grid: { display: false },
          ticks: { color: CHART_INK.primary, font: { size: 13 } }
        }
      }
    }, [valueLabelPlugin(count, "vertical")]);
  }

  if (activeTabId === "crm") {
    const bars = {
      borderRadius: { topLeft: 4, topRight: 4 },
      borderSkipped: false,
      maxBarThickness: 24
    };

    createChart("whatsappChart", "bar", {
      labels: data.crm.whatsapp.best.labels,
      datasets: [
        { label: "Abertura", data: data.crm.whatsapp.best.open, backgroundColor: "#c98500", ...bars },
        { label: "Cliques", data: data.crm.whatsapp.best.clicks, backgroundColor: "#3987e5", ...bars }
      ]
    }, {
      scales: {
        y: {
          beginAtZero: true,
          max: 60,
          border: { display: false },
          grid: { color: CHART_INK.grid },
          ticks: { color: CHART_INK.muted, callback: (value) => `${value}%` }
        },
        x: {
          border: { display: false },
          grid: { display: false },
          ticks: { color: CHART_INK.primary }
        }
      }
    });

    createChart("emailChart", "line", {
      labels: ["01/07", "Depois"],
      datasets: [{
        label: "Taxa de abertura",
        data: [6.55, 1.1],
        borderColor: "#1e6fd9",
        backgroundColor: "rgba(30,111,217,0.18)",
        tension: 0.35,
        fill: true,
        pointBackgroundColor: "#ffc940"
      }]
    }, { scales: { y: { beginAtZero: true, ticks: { color: "#eaf1ff", callback: (value) => `${value}%` }, grid: { color: "rgba(255,255,255,0.06)" } }, x: { ticks: { color: "#eaf1ff" }, grid: { display: false } } } });

    createEmailChart("emailClicksChart", data.crm.email.topClicks, "cliques");
    createEmailChart("emailOpensChart", data.crm.email.topOpens, "aberturas");
  }
}

function createChart(canvasId, type, dataSet, options = {}, plugins = []) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const chart = new Chart(canvas, {
    type,
    plugins,
    data: {
      labels: dataSet.labels,
      datasets: dataSet.datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: "#eaf1ff"
          }
        },
        tooltip: {
          backgroundColor: "#071532",
          titleColor: "#ffc940",
          bodyColor: "#eaf1ff",
          borderColor: "rgba(255,201,64,0.18)",
          borderWidth: 1
        }
      },
      // Donut e pizza não têm eixos: sem isto o Chart.js desenha uma escala 0–1.
      ...(type === "doughnut" || type === "pie" ? {} : {
        scales: {
          y: {
            grid: { color: "rgba(255,255,255,0.06)" },
            ticks: { color: "#eaf1ff" }
          },
          x: {
            grid: { color: "rgba(255,255,255,0.06)" },
            ticks: { color: "#eaf1ff" }
          }
        }
      }),
      ...options
    }
  });

  chartInstances.push(chart);
}

// O cabeçalho vem do data.js para não existir um segundo texto no index.html.
function applyHeader() {
  const heading = document.querySelector(".header-copy h1");
  const subtitle = document.querySelector(".header-copy .subtitle");

  document.title = data.title;
  if (heading) heading.textContent = data.title;
  if (subtitle) subtitle.textContent = data.subtitle;
}

applyHeader();
buildTabButtons();
renderActivePanel();
