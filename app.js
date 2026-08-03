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
  "panel:Comparativo de visualizações": "lives-chart",
  "panel:Ponto de atenção": "lives-highlight",
  "kpi:Ações no total": "crm-total-card",
  "kpi:WhatsApp": "crm-whatsapp-card",
  "kpi:E-mail": "crm-email-card",
  "kpi:SMS": "crm-sms-card",
  "kpi:Peças": "crm-pieces-card",
  "panel:Tipos de ação usados": "crm-types-card",
  "panel:Melhores desempenhos no WhatsApp": "crm-whatsapp-chart",
  "panel:Queda da abertura do e-mail": "crm-email-chart",
  "panel:Aberturas absolutas": "crm-absolutes-card",
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

function formatPercent(value) {
  return `${value.toFixed(2).replace(".", ",")}%`;
}

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
            <div class="metric-item"><span>Impressões</span><strong>${data.agencies.global.campaign.impressions}</strong></div>
            <div class="metric-item"><span>Alcance</span><strong>${data.agencies.global.campaign.reach}</strong></div>
            <div class="metric-item"><span>Leads</span><strong>${data.agencies.global.campaign.leads}</strong></div>
            <div class="metric-item"><span>CPL</span><strong>${data.agencies.global.campaign.cpl}</strong></div>
            <div class="metric-item"><span>CPM</span><strong>${data.agencies.global.campaign.cpm}</strong></div>
            <div class="metric-item"><span>CTR</span><strong>${data.agencies.global.campaign.ctr}</strong></div>
            <div class="metric-item"><span>CPC</span><strong>${data.agencies.global.campaign.cpc}</strong></div>
            <div class="metric-item"><span>Gasto</span><strong>${data.agencies.global.campaign.gasto}</strong></div>
          </div>
        </article>
        <article class="panel-card">
          <h3 class="section-title">Matheus — ${data.agencies.matheus.campaigns[0].name}</h3>
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
      <article class="panel-card chart-card" style="margin-top: 16px;">
        <h3 class="section-title">Comparativo de CTR, CPM e CPC</h3>
        <div class="chart-shell"><canvas id="radarChart"></canvas></div>
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
          <p class="metric-caption">356 ações registradas</p>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">WhatsApp</span>
          <h3 class="metric-value">${data.crm.summary.whatsapp}</h3>
          <p class="metric-caption">204 ações</p>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">E-mail</span>
          <h3 class="metric-value">${data.crm.summary.email}</h3>
          <p class="metric-caption">127 ações</p>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">SMS</span>
          <h3 class="metric-value">${data.crm.summary.sms}</h3>
          <p class="metric-caption">25 ações</p>
        </article>
        <article class="kpi-card">
          <span class="kpi-label">Peças</span>
          <h3 class="metric-value">${data.crm.summary.whatsappPieces} / ${data.crm.summary.emailPieces}</h3>
          <p class="metric-caption">WhatsApp / E-mail</p>
        </article>
      </div>
      <div class="panel-card" style="margin-top: 16px;">
        <h3 class="section-title">Tipos de ação usados</h3>
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
        <article class="panel-card">
          <h3 class="section-title">Aberturas absolutas</h3>
          <div class="metric-list">
            ${data.crm.email.absolutes.map((item) => `
              <div class="metric-item"><span>${item.label}</span><strong>${item.value}</strong></div>
            `).join("")}
          </div>
        </article>
        <article class="panel-card">
          <h3 class="section-title">SMS</h3>
          <div class="metric-list">
            ${data.crm.sms.items.map((item) => `
              <div class="metric-item"><span>${item.label}</span><strong>${item.value}</strong></div>
            `).join("")}
          </div>
        </article>
      </div>
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
      <article class="panel-card strategy-note" style="margin-top: 18px;">
        <h3 class="section-title">Live 11/08 — destaque</h3>
        <p class="metric-caption">${data.strategy.liveHighlight}</p>
      </article>
      <div class="strategy-grid" style="margin-top: 24px;">
        ${data.strategy.phases.map((phase) => `
          <article class="panel-card phase-card">
            <span class="phase-tag">${phase.heading}</span>
            <h3 class="section-title">${phase.subheading}</h3>
            <ul class="phase-list">
              ${phase.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
            </ul>
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
    createChart("radarChart", "bar", {
      labels: ["Athus", "Global", "Matheus"],
      datasets: [
        {
          label: "CPM",
          data: [16.2, 62.7, 42.0],
          backgroundColor: ["#1e6fd9", "#ffc940", "#6fa8ff"],
          borderRadius: 10,
          order: 2
        },
        {
          label: "CPC",
          data: [2.0, 3.29, 1.03],
          backgroundColor: ["rgba(30,111,217,0.4)", "rgba(255,201,64,0.4)", "rgba(111,168,255,0.4)"],
          borderRadius: 10,
          order: 2
        },
        {
          label: "CTR",
          type: "line",
          data: [1.73, 1.91, 4.10],
          borderColor: "#ffffff",
          backgroundColor: "rgba(255,255,255,0.16)",
          yAxisID: "ctr",
          tension: 0.35,
          fill: false,
          pointRadius: 6,
          pointBackgroundColor: "#ffffff",
          order: 1
        }
      ]
    }, {
      scales: {
        x: {
          ticks: { color: "#eaf1ff" },
          grid: { display: false }
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: "Custo (R$)", color: "#eaf1ff" },
          ticks: { color: "#eaf1ff" },
          grid: { color: "rgba(255,255,255,0.06)" }
        },
        ctr: {
          position: "right",
          beginAtZero: true,
          title: { display: true, text: "CTR (%)", color: "#eaf1ff" },
          ticks: { color: "#eaf1ff", callback: (value) => `${value}%` },
          grid: { display: false }
        }
      },
      plugins: {
        legend: { labels: { color: "#eaf1ff" } },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || "";
              return `${label}: ${context.formattedValue}${label === "CTR" ? "%" : ""}`;
            }
          }
        }
      }
    });
  }

  if (activeTabId === "lives") {
    createChart("livesChart", "bar", {
      labels: data.lives.chart.labels,
      datasets: [{
        label: "Visualizações",
        data: data.lives.chart.values,
        backgroundColor: ["#ffc940", "#1e6fd9"],
        borderRadius: 10,
        maxBarThickness: 30
      }]
    }, { scales: { y: { beginAtZero: true, ticks: { color: "#eaf1ff" }, grid: { color: "rgba(255,255,255,0.06)" } }, x: { ticks: { color: "#eaf1ff" }, grid: { display: false } } } });
  }

  if (activeTabId === "crm") {
    createChart("whatsappChart", "bar", {
      labels: data.crm.whatsapp.labels,
      datasets: [
        { label: "Abertura", data: data.crm.whatsapp.open, backgroundColor: "#ffc940", borderRadius: 8 },
        { label: "Cliques", data: data.crm.whatsapp.clicks, backgroundColor: "#1e6fd9", borderRadius: 8 }
      ]
    }, { scales: { y: { beginAtZero: true, max: 60, ticks: { color: "#eaf1ff", callback: (value) => `${value}%` }, grid: { color: "rgba(255,255,255,0.06)" } }, x: { ticks: { color: "#eaf1ff" }, grid: { display: false } } } });

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
  }
}

function createChart(canvasId, type, dataSet, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const chart = new Chart(canvas, {
    type,
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
      scales: {
        y: {
          grid: { color: "rgba(255,255,255,0.06)" },
          ticks: { color: "#eaf1ff" }
        },
        x: {
          grid: { color: "rgba(255,255,255,0.06)" },
          ticks: { color: "#eaf1ff" }
        }
      },
      ...options
    }
  });

  chartInstances.push(chart);
}

buildTabButtons();
renderActivePanel();
