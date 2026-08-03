window.dashboardData = {
  // Seção principal: dados gerais do mês e resumo da campanha.
  title: "Marketing - Ações Julho",
  subtitle: "Relatório de Performance · Julho 2025",
  totalInvested: "R$ 47.239,83",
  totalInvestedLabel: "Total investido consolidado",

  tabs: [
    { id: "overview", label: "Visão Geral" },
    { id: "funnel", label: "Investimento por Funil" },
    { id: "agencies", label: "Agências" },
    { id: "highlights", label: "Principais destaques do mês e coisas que acharem pertinentes" },
    { id: "lives", label: "Lives do Kim" },
    { id: "crm", label: "Disparos e CRM" },
    { id: "what-worked", label: "O que funcionou" },
    { id: "social", label: "Redes Sociais e Conteúdo" },
    { id: "roi", label: "ROI e Destaques" },
    { id: "strategy", label: "Estratégia para Agosto" },
    { id: "guide", label: "Guia de Apresentação" }
  ],

  // Visão Geral: atualize estes números ao fechar o mês.
  overview: {
    kpis: [
      { label: "Investimento total", value: "R$ 47.239,83", caption: "Athus + Global + Matheus" },
      { label: "Total de leads", value: "4.099", caption: "Volume consolidado" },
      { label: "CPL médio geral", value: "R$ 10,47", caption: "Custo por lead" },
      { label: "Total de disparos/ações", value: "356", caption: "Ações registradas" },
      { label: "Cancelamentos de e-mail", value: "12.353", caption: "Em julho" }
    ],
    donut: {
      labels: ["Athus", "Global", "Matheus"],
      values: [29756, 7183, 10300.83],
      currency: ["R$ 29.756", "R$ 7.183", "R$ 10.300,83"]
    },
    leads: {
      labels: ["Athus", "Matheus", "Global"],
      values: [3370, 501, 228]
    },
    cpl: {
      labels: ["Athus", "Matheus", "Global"],
      values: [8.83, 12.13, 31.52],
      currency: ["R$ 8,83", "R$ 12,13", "R$ 31,52"]
    }
  },

  // Investimento por Funil: ajuste os valores para alterar a tabela e o gráfico.
  funnel: {
    rows: [
      { name: "Instituto IBFP", value: "R$ 1.115,36" },
      { name: "Imersão Presencial", value: "R$ 14.711,20" },
      { name: "Consultoria Financeira", value: "R$ 2.502,27" },
      { name: "Total", value: "R$ 18.328,83", total: true }
    ],
    observation: "A Imersão Presencial concentra o maior investimento por funil no mês de julho.",
    chart: {
      labels: ["Instituto IBFP", "Imersão Presencial", "Consultoria Financeira"],
      values: [1115.36, 14711.2, 2502.27]
    }
  },

  // Agências: manter os dados por agência para o comparativo e o resumo da campanha.
  agencies: {
    athus: {
      name: "ATHUS",
      period: "Dados dos últimos 7 meses",
      investment: "R$ 29.756",
      leads: 3370,
      cpl: "R$ 8,83",
      ctr: "1,73%",
      summary: {
        investment: "R$ 25.747",
        leads: 3045,
        cpl: "R$ 7,28",
        ctr: "1,39%",
        cpm: "R$ 16,20",
        whatsapp: 324
      }
    },
    global: {
      name: "GLOBAL",
      period: "Período 30/06–31/07",
      meta: {
        impressions: "117.728",
        reach: "55.489",
        ctr: "1,95%",
        cpc: "R$ 1,60",
        gasto: "R$ 7.579,86"
      },
      google: {
        impressions: "68.130",
        ctr: "8,35%",
        gasto: "R$ 5.169,28"
      },
      total: {
        impressions: "185.858",
        leads: 228,
        cpl: "R$ 23,92",
        cpm: "R$ 62,70",
        cpc: "R$ 1,60",
        gasto: "R$ 12.749,14"
      }
    },
    matheus: {
      campaigns: [
        {
          name: "Instituto IBPF",
          impressions: "37.441",
          reach: "26.465",
          leads: 225,
          cpl: "R$ 4,96",
          cpc: "R$ 1,84",
          ctr: "1,63%",
          cpm: "R$ 30,03",
          gasto: "R$ 1.115,36"
        },
        {
          name: "Consultoria Financeira",
          impressions: "58.136",
          reach: "21.142",
          leads: 160,
          cpl: "R$ 15,64",
          cpc: "R$ 1,90",
          ctr: "2,25%",
          cpm: "R$ 42,91",
          gasto: "R$ 2.502,27"
        },
        {
          name: "Imersão Presencial",
          impressions: "210.601",
          reach: "131.048",
          leads: 431,
          cpl: "R$ 15,51",
          cpc: "R$ 1,89",
          ctr: "1,68%",
          cpm: "R$ 31,73",
          gasto: "R$ 6.683,20"
        }
      ],
      total: "R$ 10.300,83"
    },
    radar: {
      labels: ["CTR", "CPM", "CPC"],
      datasets: [
        { label: "Athus", values: [1.73, 16.2, 2.0] },
        { label: "Global", values: [1.91, 62.7, 3.29] },
        { label: "Matheus", values: [1.76, 33.64, 1.89] }
      ]
    },
    reading: "Bom volume de entrega e CTR alto — o anúncio chama atenção e gera interação. Ponto de atenção: CPM alto, a entrega está cara, mas o interesse também é maior."
  },

  highlights: {
    title: "Principais destaques do mês e coisas que acharem pertinentes",
    items: [
      "Ajustes e melhorias",
      "Colocar o feedback das agências, que estão no doc",
      "Treinamento comercial junto ao time de marketing (validar a abordagem e verificar onde o marketing pode ajudar)",
      "Acelerar nos criativos e organizar rotina de gravação"
    ]
  },

  // Lives do Kim: atualize as métricas quando houver novo evento.
  lives: {
    cards: [
      {
        title: "Live Kim — 15/07",
        metrics: [
          { label: "Impressões", value: "30.843" },
          { label: "Alcance", value: "29.702" },
          { label: "Visualizações", value: "3.192" },
          { label: "CPC", value: "R$ 0,85" },
          { label: "CTR", value: "0,61%" },
          { label: "CPM", value: "R$ 5,18" },
          { label: "Gasto", value: "R$ 159,66" }
        ]
      },
      {
        title: "Live Kim — 22/07",
        metrics: [
          { label: "Impressões", value: "21.125" },
          { label: "Alcance", value: "19.453" },
          { label: "Visualizações", value: "1.855" },
          { label: "CPC", value: "R$ 1,14" },
          { label: "CTR", value: "0,61%" },
          { label: "CPM", value: "R$ 6,98" },
          { label: "Gasto", value: "R$ 147,38" }
        ]
      },
      {
        title: "Live KIM — 27/07",
        metrics: [
          { label: "Impressões", value: "20.171" },
          { label: "Alcance", value: "19.156" },
          { label: "CPC", value: "R$ 1,13" },
          { label: "CTR", value: "0,50%" },
          { label: "CPM", value: "R$ 5,63" },
          { label: "Valor gasto", value: "R$ 113,66" }
        ]
      }
    ],
    chart: {
      labels: ["15/07", "22/07"],
      values: [3192, 1855]
    },
    highlight: "Queda de 42% nas visualizações entre as duas lives.",
    highlightTone: "alert"
  },

  // Disparos e CRM: dados por canal e desempenho das peças.
  crm: {
    summary: {
      total: 356,
      whatsapp: 204,
      email: 127,
      sms: 25,
      whatsappPieces: 46,
      emailPieces: 31
    },
    tags: [
      "Divulgação de live",
      "Imersão Presencial",
      "Indicação",
      "Kim quer falar com você",
      "Desconto exclusivo",
      "Conteúdos orgânicos",
      "Enquetes de interação"
    ],
    whatsapp: {
      labels: ["Palpite premiado 05/07", "Live ao vivo 15/07", "Live ao vivo 22/07", "Conteúdo orgânico 18/07"],
      open: [41.98, 39.1, 41, 53.67],
      clicks: [39.15, 28, 22.25, 19.1]
    },
    email: {
      points: [
        { date: "01/07", base: "~41.000", opening: "3,82% a 6,55%" },
        { date: "Depois", base: "~472.000 a 483.000", opening: "0,40% a 1,10%" }
      ],
      absolutes: [
        { label: "13/07", value: "5.075" },
        { label: "08/07", value: "4.983" },
        { label: "06/07", value: "4.661" },
        { label: "22/07 (Ação Kim)", value: "543 cliques" }
      ]
    },
    sms: {
      title: "SMS",
      items: [
        { label: "Indique e ganhe (04/07)", value: "15,33% de cliques" },
        { label: "Participe e ganhe (05/07)", value: "15,33% de cliques" },
        { label: "Lembretes repetidos de live", value: "0,53% a 3,02%" }
      ]
    },
    conclusion: "O WhatsApp, especialmente a Comunidade VIP, foi o canal mais eficiente em atenção e cliques. O e-mail entregou alcance, mas o crescimento da base derrubou a taxa de abertura — é preciso melhorar segmentação e qualidade dos contatos. O SMS funciona em ações pontuais com benefício claro."
  },

  // O que funcionou: destaque dos melhores elementos de cada canal.
  whatWorked: {
    worked: [
      "Abertura: suspense e medo de perder uma live ou anúncio",
      "Clique: 'Kim precisa falar com você', em primeira pessoa",
      "Melhor assunto em abertura: 'Não espere alguém te contar depois'",
      "Melhor resultado em clique: 'Oi. Sou eu de novo'"
    ],
    failed: [
      "Não funcionou: assunto muito genérico em e-mail",
      "Não funcionou: CTA sem urgência clara",
      "Não funcionou: mensagens excessivamente longas"
    ],
    whatsapp: [
      "Abertura: mensagem pessoal do Kim com novidade — 59%",
      "Clique: interação com recompensa — 39,15%",
      "Eventos: 'AO VIVO AGORA' — até 28% de cliques entre quem abriu",
      "Relacionamento: vídeo + enquete — 53,67% de abertura e 19,10% de interação"
    ],
    insight: "No e-mail, o público abre por curiosidade, mas clica quando sente uma conversa pessoal e direta. No WhatsApp, responde melhor quando existe uma ação fácil e concreta: dar um palpite, responder enquete, receber um benefício ou entrar numa live que já começou."
  },

  // Redes Sociais e Conteúdo: materiais e feedback para as agências.
  social: {
    linkedin: "Os conteúdos que mais funcionam são os pessoais: trajetória, conquistas, bastidores, linha do tempo e momentos de vida. A estratégia inicial posicionava o Kim como CEO da Atom e líder do setor educacional, mas ficou claro que fortalecer a marca pessoal também é essencial. O público se conecta com experiências reais, aprendizados e desafios. Conteúdos muito técnicos ou apenas chamadas de live performam menos.",
    narrative: "Começou reforçando a autoridade no mercado financeiro e ampliou para apresentar a empresa como instituição educacional, humanizando a marca com colaboradores, bastidores e eventos.",
    pillars: [
      "Educação que gera oportunidades",
      "Autoridade com linguagem acessível",
      "Pessoas por trás da Atom",
      "Educação para a vida real",
      "Conteúdo antes da venda"
    ],
    best: "Conteúdos com colaboradores, dicas práticas e vídeos.",
    worst: "Posts muito motivacionais e pouco conectados à realidade da marca.",
    metrics: [
      {
        title: "LinkedIn — Kim Paiffer",
        items: [
          { label: "Seguidores Kim", value: "" },
          { label: "Quantidade de post", value: "13" },
          { label: "Visitas no perfil Kim", value: "164" },
          { label: "Seguidores novos", value: "4" },
          { label: "Impressões", value: "5.344" },
          { label: "Contas alcançadas", value: "4.354" },
          { label: "Visualizações", value: "4.721" },
          { label: "Curtidas", value: "130" },
          { label: "Comentários", value: "13" }
        ]
      },
      {
        title: "LinkedIn — Atom",
        items: [
          { label: "Seguidores", value: "2" },
          { label: "Quantidade de post", value: "12" },
          { label: "Visitas no perfil Kim", value: "23" },
          { label: "Seguidores novos", value: "4" },
          { label: "Impressões", value: "1.524" },
          { label: "Contas alcançadas", value: "600" },
          { label: "Visualizações", value: "948" },
          { label: "Curtidas", value: "48" },
          { label: "Comentários", value: "15" }
        ]
      }
    ],
    blog: {
      title: "Blog",
      items: [
        "21 artigos publicados - todos os dias exceto sábado e domingo",
        "Estão trabalhando temas solicitados: trading, educação, concurso, cripto, cartão benefício e etc"
      ]
    },
    feedback: [],
  },

  // ROI e Destaques: espaço preparado para receber novos dados mensais.
  roi: {
    placeholderTitle: "Aguardando dados de faturamento por agência.",
    cards: [
      { agency: "Athus", message: "Aguardando dados de faturamento por agência." },
      { agency: "Global", message: "Aguardando dados de faturamento por agência." },
      { agency: "Matheus", message: "Aguardando dados de faturamento por agência." }
    ],
    highlights: [
      "Adicione os destaques em data.js"
    ]
  },

  // Estratégia para Agosto: cronograma e frentes de ação.
  strategy: {
    title: "Cronograma de agosto — 5 frentes em paralelo",
    intro: "Organizar agosto em frentes simultâneas garante visibilidade, continuidade e foco na conversão após o evento presencial.",
    timeline: [
      {
        period: "03–13/08",
        title: "Imersão 360º",
        description: "Semana de conversa com CTA diário, escassez real e mentores em ação."
      },
      {
        period: "05/08",
        title: "Teaser Atom+",
        description: "Roda em paralelo com a Imersão: só Stories, sem CTA de compra e baixa frequência."
      },
      {
        period: "09/08",
        title: "Dia dos Pais",
        description: "Ação especial de conversão com combo pai+filho, oferta exclusiva e urgência no dia."
      },
      {
        period: "06 e 12/08",
        title: "Live KIM",
        description: "Live KIM co-promovida com funil próprio, grupo exclusivo e indicação com prêmios."
      },
      {
        period: "14–16/08",
        title: "Evento presencial",
        description: "Imersão Atom 360º em Sorocaba, com entrega presencial e reforço de autoridade."
      }
    ],
    phases: [
      {
        heading: "Imersão 360º",
        subheading: "Semana de conversa",
        bullets: [
          "Mentores em ação (03/08)",
          "Quebra de objeção (04/08)",
          "Escassez + Live Joaquim (05–06/08)",
          "Última chamada (13/08)"
        ]
      },
      {
        heading: "Teaser Atom+",
        subheading: "Paralelo · 05–16/08",
        bullets: [
          "Só Stories, baixa frequência",
          "Sem CTA de compra",
          "Roda junto com a Imersão"
        ]
      },
      {
        heading: "Dia dos Pais",
        subheading: "Ação especial · 09/08",
        bullets: [
          "Combo pai + filho",
          "Oferta válida só no dia",
          "Ângulo emocional, não institucional"
        ]
      },
      {
        heading: "Live KIM",
        subheading: "06 e 12 de agosto",
        bullets: [
          "Estratégia chamando pra imersão",
          "",
          "Adicionar ações abaixo -",
          "E-mail chamando pra comunidade vip",
          "Indicação para live dentro da comunidade"
        ]
      },
      {
        heading: "Venda Atom+",
        subheading: "A partir de 17/08",
        bullets: [
          "Só depois do evento presencial",
          "Preço cheio, sem desconto",
          "Campanha de 2 semanas"
        ]
      }
    ],
    liveHighlight: "Live 11/08 é co-promovida: Landing page própria em matriz.g4business.com — funil de captura em 2 passos, fora dos canais HubSpot/SendFlow da Atom."
  },

  cardInfo: {
    "overview-investment": "Este KPI mostra o total investido no mês por todas as agências. Ele é a soma direta dos valores de Athus, Global e Matheus e indica o orçamento total mobilizado.",
    "overview-leads": "Total de leads gerados em julho. Não há cálculo adicional aqui: é o volume consolidado entregue por todas as campanhas no período.",
    "overview-cpl": "O CPL médio geral é o custo médio por lead para o mês. Ele representa o investimento total dividido pelo total de leads gerados.",
    "overview-actions": "Total de disparos e ações registradas no mês, incluindo WhatsApp, e-mail e SMS. Ajuda a entender o nível de atividade da operação.",
    "overview-cancellations": "Cancelamentos de e-mail em julho. É um indicador de desgaste da base e mostra quantos contatos optaram por sair.",
    "overview-donut": "O gráfico de donut compara a participação do investimento de cada agência no total do mês. Mostra quanto cada time contribuiu para o orçamento geral.",
    "overview-leads-chart": "O gráfico de leads por agência exibe o volume de leads gerados por Athus, Matheus e Global, facilitando a comparação de entrega.",
    "overview-cpl-chart": "O gráfico de CPL mostra o custo por lead de cada agência, destacando eficiência de aquisição e variações de custo entre os times.",
    "funnel-table": "A tabela de funil mostra o investimento por produto. Cada linha representa o gasto de julho em um funil específico.",
    "funnel-chart": "O gráfico de funil traduz o investimento por produto em barras, ajudando a visualizar proporções entre Instituto IBFP, Imersão Presencial e Consultoria Financeira.",
    "athus-card": "Resumo da Athus no período, com investimento, leads, CPL e CTR. Inclui também o desempenho de meta e conversões no WhatsApp.",
    "global-card": "Visão do resultado da Global na Imersão Presencial, com impressões, alcance, leads e custos. O status alerta para uma pendência de landing page.",
    "matheus-instituto-card": "Dados da campanha Instituto IBPF da Matheus, incluindo impressões, alcance, leads e custos por interação.",
    "matheus-financeira-card": "Dados da campanha Consultoria Financeira da Matheus, destacando o custo por lead e outras métricas de eficiência.",
    "matheus-imersao-card": "Dados da campanha Imersão Presencial de Matheus, com volume significativo de entrega e métricas de custo.",
    "agencies-chart": "Gráfico de comparação de CPM, CPC e CTR entre as agências. Ele mostra custos e desempenho lado a lado para análise de eficiência.",
    "live-15-card": "Resumo da live de 15/07, com métricas de alcance, engajamento e custo, usado para avaliar o desempenho do evento.",
    "live-22-card": "Resumo da live de 22/07, para comparar com a transmissão anterior e avaliar tendências de audiência e custo.",
    "lives-chart": "Gráfico de visualizações da live, mostrando a diferença de entrega entre os dois eventos.",
    "crm-total-card": "Total de ações no CRM em julho, representando a intensidade do trabalho de disparo no mês.",
    "crm-whatsapp-card": "Volume de ações executadas no WhatsApp, o canal mais engajante do período.",
    "crm-email-card": "Volume de ações executadas por e-mail, indicando a força de envio do canal de leads.",
    "crm-sms-card": "Volume de ações SMS, destacando o uso de mensagens curtas para reforço de campanhas.",
    "crm-pieces-card": "Quantidade de tipos de peças usadas em WhatsApp e e-mail, mostrando diversidade criativa.",
    "crm-whatsapp-chart": "Gráfico que compara abertura e clique no WhatsApp para as principais mensagens. Mostra quais ações tiveram melhor performance.",
    "crm-email-chart": "Gráfico de abertura de e-mail que demonstra a queda na taxa conforme a base cresceu.",
    "crm-absolutes-card": "Aberturas absolutas em campanhas selecionadas, para comparar volume bruto de interação.",
    "crm-sms-detail-card": "Performance de SMS por campanha, mostrando que mensagens com benefício direto tiveram melhores cliques.",
    "what-worked-card": "O que funcionou em julho: use este card para explicar o que deve ser mantido na sequência.",
    "what-not-worked-card": "O que não funcionou em julho: pontos de alerta para ajustar a próxima fase.",
    "what-worked-whatsapp-card": "Principais aprendizados do WhatsApp, com os mecanismos que geraram mais abertura e clique.",
    "what-worked-insight-card": "Síntese das lições aprendidas para orientar o próximo mês.",
    "social-linkedin-card": "Explica a performance do LinkedIn do Kim e como o público responde a conteúdos pessoais.",
    "social-narrative-card": "Explica a linha de narrativa da Atom e como ela fortalece a estratégia de conteúdo.",
    "social-pilares-card": "Pilares estratégicos do conteúdo, para manter o foco narrativo da marca.",
    "social-feedback-global-card": "Feedback para a agência Global sobre a execução comercial e alinhamento operacional.",
    "social-feedback-matheus-card": "Feedback para a agência Matheus sobre criativos e processo comercial.",
    "agencies-reading": "Texto de leitura da campanha que explica o insight da aba Agências e as observações de performance.",
    "lives-highlight": "Texto de destaque para as lives, explicando a queda de visualizações e o foco do comparativo.",
    "crm-types-card": "Descrição dos tipos de ações usados no CRM e como elas compõem a cadência de comunicação.",
    "crm-conclusion-card": "Resumo da conclusão do CRM, explicando os principais aprendizados dos canais de WhatsApp, e-mail e SMS.",
    "social-best-worst-card": "Comparação do que mais e menos funcionou no conteúdo social, para ajustar a direção estratégica.",
    "roi-card": "Espaço reservado para ROI por agência; será preenchido quando os dados financeiros estiverem disponíveis.",
    "roi-athus-card": "Resumo do card Athus na aba ROI, mostrando o status atual de faturamento aguardado.",
    "roi-global-card": "Resumo do card Global na aba ROI, aguardando os dados de faturamento.",
    "roi-matheus-card": "Resumo do card Matheus na aba ROI, aguardando os dados de faturamento.",
    "strategy-card": "Resumo da estratégia de agosto, com foco em vídeos, bastidores e posicionamento do Atom+.",
    "strategy-linkedin-card": "Ação planejada para LinkedIn e o Kim, com foco em conteúdo e posicionamento pessoal.",
    "strategy-atom-card": "Estratégia de marca Atom para reforçar conteúdos educativos e institucional.",
    "guide-card": "Este guia explica como apresentar o dashboard e quais pontos enfatizar em cada aba."
  },

  guide: {
    title: "Como apresentar este dashboard",
    intro: "Este guia ajuda a explicar cada seção, cada gráfico e por que os números importam para o resultado do mês.",
    sections: [
      {
        title: "Visão Geral",
        text: "Apresente os KPIs principais: investimento total, leads, CPL, ações realizadas e cancelamentos de e-mail. Em seguida, mostre que o donut revela a divisão do investimento entre Athus, Global e Matheus, e que o gráfico de barras mostra como os leads estão distribuídos entre as agências. O CPL final indica o custo médio por lead para o conjunto de campanhas."
      },
      {
        title: "Investimento por Funil",
        text: "Explique que este funil agrega valores por produto em julho. O maior investimento está em Imersão Presencial, seguido por Instituto IBFP e Consultoria Financeira. Use o gráfico para reforçar a proporção do investimento por funil e mencione a observação de que a Imersão concentra a maior parte do gasto."
      },
      {
        title: "Agências",
        text: "Mostre que esta aba é a análise de performance por agência. Athus tem o maior investimento e bom volume de leads, Global traz Imersão Presencial com CPL alto, e Matheus está distribuído entre três campanhas, com destaque para o custo e a entrega. O gráfico compara CPM, CPC e CTR de cada agência para reforçar que custos mais altos podem ainda gerar CTR competitivo."
      },
      {
        title: "Lives do Kim",
        text: "Compare as duas lives e enfatize a queda de visualizações de 15/07 para 22/07. Use os cards para relatar a diferença de interação, custo e alcance, e explique que o foco aqui é entender a eficiência de cada evento ao vivo."
      },
      {
        title: "Disparos e CRM",
        text: "Explique que essa aba mostra a performance de canais diretos: WhatsApp, e-mail e SMS. Os KPIs resumem quantas ações foram feitas. O gráfico do WhatsApp revela quais formatos tiveram melhor taxa de abertura e clique, e o gráfico de e-mail mostra a queda de aberturas à medida que a base cresceu."
      },
      {
        title: "O que funcionou",
        text: "Use esta aba para contar a narrativa do que deve ser repetido e do que precisa ser ajustado. Mostre os itens que funcionaram tanto em e-mail quanto em WhatsApp, e deixe claro que o insight principal é: personalização e ação concreta funcionam melhor."
      },
      {
        title: "Redes Sociais e Conteúdo",
        text: "Apresente os aprendizados do LinkedIn e a estratégia de marca pessoal do Kim. Mostre os pilares e o feedback para as agências, destacando que o público responde melhor a conteúdo humano, prático e de bastidores, em vez de posts muito motivacionais."
      },
      {
        title: "ROI e Destaques",
        text: "Explique que esta aba está pronta para receber os dados de faturamento por agência assim que estiverem disponíveis. Ressalte que a intenção é conectar investimento ao resultado financeiro e destacar insights do mês."
      },
      {
        title: "Estratégia para Agosto",
        text: "Feche a apresentação com o plano de ação: mais vídeos, mais bastidores, mais Atom+ e mais testes de criativos. Enfatize que o objetivo é equilibrar valor, humanização e divulgação de produtos."
      }
    ],
    glossary: [
      { acronym: "CPL", definition: "Custo por Lead — quanto foi gasto, em média, para gerar cada lead." },
      { acronym: "CPC", definition: "Custo por Clique — quanto foi gasto para cada clique obtido em anúncios." },
      { acronym: "CTR", definition: "Taxa de Clique — porcentagem de pessoas que clicaram após verem a peça ou anúncio." },
      { acronym: "CPM", definition: "Custo por Mil Impressões — quanto custa atingir mil visualizações do anúncio." },
      { acronym: "ROI", definition: "Retorno sobre Investimento — relação entre o resultado financeiro e o valor investido." },
      { acronym: "SMS", definition: "Short Message Service — mensagens de texto enviadas diretamente para o celular." },
      { acronym: "CRM", definition: "Customer Relationship Management — gestão de relacionamento com os clientes e leads." }
    ]
  }
};
