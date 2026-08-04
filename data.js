window.dashboardData = {
  // Seção principal: dados gerais do mês e resumo da campanha.
  title: "Marketing - Ações Julho",
  subtitle: "Relatório de Performance · 01/07 a 03/08 de 2026",
  totalInvested: "R$ 54.322,18",
  totalInvestedLabel: "Total investido consolidado",

  tabs: [
    { id: "overview", label: "Visão Geral" },
    { id: "funnel", label: "Investimento por Funil" },
    { id: "agencies", label: "Agências" },
    { id: "highlights", label: "Ajustes e melhorias" },
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
      { label: "Investimento total", value: "R$ 54.322,18", caption: "Athus + Global + Matheus" },
      { label: "Total de leads", value: "4.414", caption: "Volume consolidado" },
      { label: "CPL médio geral", value: "R$ 12,31", caption: "Custo por lead" },
      { label: "Total de disparos/ações", value: "435", caption: "Ações registradas" },
      { label: "Cancelamentos de e-mail", value: "12.353", caption: "No período" }
    ],
    donut: {
      labels: ["Athus", "Global", "Matheus"],
      values: [29756, 12749.14, 11817.04],
      currency: ["R$ 29.756", "R$ 12.749,14", "R$ 11.817,04"]
    },
    leads: {
      labels: ["Athus", "Matheus", "Global"],
      values: [3370, 816, 228]
    },
    cpl: {
      labels: ["Athus", "Matheus", "Global"],
      values: [8.83, 14.48, 55.92],
      currency: ["R$ 8,83", "R$ 14,48", "R$ 55,92"]
    }
  },

  // Investimento por Funil: ajuste os valores para alterar a tabela e o gráfico.
  funnel: {
    rows: [
      { name: "Instituto IBFP", value: "R$ 1.611,60" },
      { name: "Imersão Presencial", value: "R$ 19.930,95" },
      { name: "Consultoria Financeira", value: "R$ 3.023,63" },
      { name: "Total", value: "R$ 24.566,18", total: true }
    ],
    observation: "A Imersão Presencial concentra o maior investimento por funil no período.",
    chart: {
      labels: ["Instituto IBFP", "Imersão Presencial", "Consultoria Financeira"],
      values: [1611.6, 19930.95, 3023.63]
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
      period: "Período 01/07–03/08",
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
      period: "Período 01/07–03/08",
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
          gasto: "R$ 1.611,60"
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
          gasto: "R$ 3.023,63"
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
          gasto: "R$ 7.181,81"
        }
      ],
      total: "R$ 11.817,04"
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

  // Ajustes e melhorias: feedback por agência. Adicione um grupo para incluir outra.
  highlights: {
    groups: [
      {
        agency: "Global",
        items: [
          "Preencher planilha - Agilizar otimizações nas campanhas",
          "Melhorar comunicação entre marketing e comercial",
          "Acompanhar dados para tomada de decisão"
        ]
      },
      {
        agency: "Matheus",
        items: [
          "Acelerar produção de criativos",
          "Escalar campanhas com mais rapidez",
          "Mapear leads interessados que não compraram",
          "Identificar objeções de compra",
          "Levantar oportunidades de melhoria na conversão"
        ]
      }
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
          { label: "Visualizações", value: "650" },
          { label: "CPC", value: "R$ 1,13" },
          { label: "CTR", value: "0,50%" },
          { label: "CPM", value: "R$ 5,63" },
          { label: "Valor gasto", value: "R$ 113,66" }
        ]
      }
    ],
    // O gráfico lê esta métrica de cada card acima: toda live que tiver o campo
    // entra automaticamente na comparação.
    chartMetric: "Visualizações",
    highlight: "Queda contínua nas visualizações: 42% de 15/07 para 22/07 e mais 65% de 22/07 para 27/07. A terceira live teve 80% menos audiência que a primeira.",
    highlightTone: "alert"
  },

  // Disparos e CRM: dados por canal e desempenho das peças.
  crm: {
    summary: {
      total: 435,
      whatsapp: 250,
      email: 160,
      sms: 25
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
      // Os três arrays são paralelos: para reordenar, mova os três juntos.
      best: {
        labels: ["Palpite premiado 05/07", "Live ao vivo 15/07", "Conteúdo orgânico 18/07", "Live ao vivo 22/07"],
        open: [41.98, 39.1, 53.67, 41],
        clicks: [39.15, 28, 19.1, 22.25]
      },
      topViewRate: [
        { date: "24/07", base: "Comunidade VIP", message: "Muita gente acabou ficando de fora da última live com o Kim", views: "628", rate: 54 },
        { date: "25/07", base: "Comunidade VIP", message: "A última live com o Kim foi só o começo", views: "622", rate: 54 },
        { date: "26/07", base: "Comunidade VIP", message: "É amanhã!", views: "558", rate: 48 },
        { date: "31/07", base: "Comunidade de Alunos", message: "Amanhã pode não ter mais como garantir", views: "2.121", rate: 47 },
        { date: "29/07", base: "Comunidade VIP", message: "Você teria vontade de participar de uma imersão presencial com Kim Paiffer?", views: "523", rate: 46 },
        { date: "31/07", base: "Comunidade de Alunos", message: "As vagas da Imersão 360° estão acabando de verdade", views: "2.079", rate: 46 }
      ],
      topClickRate: [
        { base: "Comunidade VIP", message: "Enquete: você participaria de uma Imersão com Kim?", rate: 26.77 },
        { base: "Comunidade VIP", message: "Kim aqui. AO VIVO AGORA!", rate: 22.25 },
        { base: "Comunidade VIP", message: "Falta pouco para a aula ao vivo", rate: 19 },
        { base: "Comunidade VIP", message: "Começou.", rate: 17.5 },
        { base: "Comunidade VIP", message: "O que vem depois de uma live que bateu recorde?", rate: 14 }
      ],
      topViews: [
        { date: "29/07", base: "01 Caio", action: "Enquete sobre Imersão presencial", value: "6.513", rate: "11%" },
        { date: "29/07", base: "05 Caio", action: "Enquete sobre Imersão presencial", value: "5.454", rate: "24%" },
        { date: "29/07", base: "04 Caio", action: "Enquete sobre Imersão presencial", value: "5.422", rate: "10%" },
        { date: "27/07", base: "05 Caio", action: "Começou.", value: "3.683", rate: "16%" },
        { date: "31/07", base: "Comunidade de Alunos", action: "Amanhã pode não ter mais como garantir", value: "2.121", rate: "47%" }
      ],
      topClicks: [
        { date: "29/07", base: "05 Caio", action: "Enquete sobre Imersão presencial", value: "276", rate: "5,06%" },
        { date: "29/07", base: "04 Caio", action: "Enquete sobre Imersão presencial", value: "202", rate: "3,73%" },
        { date: "29/07", base: "01 Caio", action: "Enquete sobre Imersão presencial", value: "187", rate: "2,87%" },
        { date: "29/07", base: "02 Caio", action: "Enquete sobre Imersão presencial", value: "174", rate: "9,45%" },
        { date: "29/07", base: "Comunidade VIP", action: "Enquete sobre Imersão presencial", value: "140", rate: "26,77%" }
      ]
    },
    email: {
      points: [
        { date: "01/07", base: "~41.000", opening: "3,82% a 6,55%" },
        { date: "Depois", base: "~472.000 a 483.000", opening: "0,40% a 1,10%" }
      ],
      topClicks: [
        { date: "22/07", action: "Ação Kim — “Oi. Sou eu de novo.”", value: "588" },
        { date: "25/07", action: "Aviso Live — “Isso não foi coincidência”", value: "404" },
        { date: "28/07", action: "Ação Kim — “Desculpa insistir”", value: "386" },
        { date: "29/07", action: "Ação Kim — “Só preciso de 5 minutos seus”", value: "373" },
        { date: "26/07", action: "Aviso Live — “Segunda-feira, 19h. Anota.”", value: "358" }
      ],
      topOpens: [
        { date: "22/07", action: "Oi. Sou eu de novo.", value: "3.736", rate: "0,80%" },
        { date: "22/07", action: "Você chegou a ver minha mensagem?", value: "3.667", rate: "0,79%" },
        { date: "22/07", action: "Já tentei 2 vezes hoje.", value: "3.492", rate: "0,75%" },
        { date: "22/07", action: "Faltam poucas horas!", value: "3.392", rate: "0,73%" },
        { date: "22/07", action: "Começa daqui a pouco!", value: "3.341", rate: "0,72%" }
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
          { label: "Seguidores", value: "12.313" },
          { label: "Quantidade de post", value: "12" },
          { label: "Visitas no perfil Kim", value: "23" },
          { label: "Seguidores novos (30 dias)", value: "72" },
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
        "Estão sendo trabalhados temas solicitados: trading, educação, concurso, cripto, cartão benefício e etc"
      ]
    },
    feedback: [],
  },

  // ROI e Destaques: espaço preparado para receber novos dados mensais.
  // ROI: `total` é o total pago por agência. `lines` abre esse total por funil
  // quando houver quebra; sem `total`, o card mostra só a `message`.
  roi: {
    cards: [
      {
        agency: "Athus",
        message: "Aguardando dados de faturamento."
      },
      {
        agency: "Global",
        total: "R$ 13.000,00"
      },
      {
        agency: "Matheus",
        total: "R$ 10.436,00",
        lines: [
          { label: "Imersão", value: "R$ 10.436,00" },
          { label: "Consultoria", value: "R$ 0,00" },
          { label: "Instituto IBFP", value: "R$ 0,00" }
        ]
      }
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
        period: "05/09",
        title: "Dia dos Pais",
        description: "Ação especial de conversão com combo pai+filho, oferta exclusiva e urgência no dia."
      },
      {
        period: "06 e 11/08",
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
        subheading: "Ação especial · 05/09",
        bullets: [
          "Combo pai + filho",
          "Oferta válida só no dia",
          "Ângulo emocional, não institucional"
        ]
      },
      {
        heading: "Live KIM",
        subheading: "06 e 11 de agosto",
        bullets: [
          "Estratégia chamando pra imersão"
        ]
      },
      {
        heading: "Live KIM",
        subheading: "E-mail chamando pra comunidade VIP",
        bullets: []
      },
      {
        heading: "Live KIM",
        subheading: "Indicação para live dentro da comunidade",
        bullets: []
      },
      {
        heading: "Venda Atom+",
        subheading: "A partir de 17/08",
        bullets: [
          "Só depois do evento presencial",
          "Preço cheio, sem desconto",
          "Campanha de 2 semanas"
        ]
      },
      {
        heading: "Novos funis",
        subheading: "Entrada em agosto",
        bullets: [
          "IBFP — Global",
          "Entrada do funil do Atom+",
          "Funis que o Lucas pediu pra entrar"
        ]
      }
    ],
    liveHighlight: ""
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
    "live-27-card": "Resumo da live de 27/07, a terceira do mês, para fechar a leitura de audiência e custo das transmissões de julho.",
    "lives-chart": "Gráfico de visualizações da live, mostrando a diferença de entrega entre os dois eventos.",
    "crm-total-card": "Total de ações no CRM em julho, representando a intensidade do trabalho de disparo no mês.",
    "crm-whatsapp-card": "Volume de ações executadas no WhatsApp, o canal mais engajante do período.",
    "crm-email-card": "Volume de ações executadas por e-mail, indicando a força de envio do canal de leads.",
    "crm-sms-card": "Volume de ações SMS, destacando o uso de mensagens curtas para reforço de campanhas.",
    "crm-whatsapp-chart": "Gráfico que compara abertura e clique no WhatsApp para as principais mensagens. Mostra quais ações tiveram melhor performance.",
    "crm-view-rate-card": "As mensagens com maior taxa de visualização. A barra vai de 0 a 100%, então dá para comparar direto com o card de cliques ao lado. Repare que as taxas mais altas vêm da Comunidade VIP, que é a base menor.",
    "crm-click-rate-card": "As mensagens que mais geraram clique proporcionalmente. As barras são visivelmente menores que as de visualização: abrir é fácil, clicar exige uma ação concreta.",
    "crm-top-views-card": "Os disparos com maior volume de visualizações em números absolutos. Aqui as listas grandes (Caio) dominam, mesmo com taxa baixa — é o contrário do ranking por taxa.",
    "crm-top-clicks-card": "Os disparos com maior volume de cliques em números absolutos. Compare a última linha com a primeira: a Comunidade VIP converte cinco vezes melhor em taxa, mas entrega metade dos cliques.",
    "crm-email-chart-card": "Os cinco melhores disparos de e-mail em cliques e em aberturas. Os dois painéis têm escalas próprias porque as ordens de grandeza são diferentes — centenas de cliques contra milhares de aberturas. As barras de abertura são quase iguais entre si: os assuntos do topo performam todos parecido.",
    "crm-email-clicks-card": "Os e-mails que mais geraram cliques no período. As linhas de topo são todas de abordagem pessoal e insistente em primeira pessoa — o mesmo padrão que aparece na aba O que funcionou.",
    "crm-email-opens-card": "Os e-mails com mais aberturas em números absolutos. Repare que o volume é alto e a taxa é baixíssima: a base cresceu muito, então até um bom assunto abre menos de 1%.",
    "crm-email-chart": "Gráfico de abertura de e-mail que demonstra a queda na taxa conforme a base cresceu.",
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
    "crm-types-card": "As narrativas trabalhadas no CRM durante o período: os ângulos de mensagem usados nos disparos e como eles compõem a cadência de comunicação.",
    "crm-conclusion-card": "Resumo da conclusão do CRM, explicando os principais aprendizados dos canais de WhatsApp, e-mail e SMS.",
    "social-best-worst-card": "Comparação do que mais e menos funcionou no conteúdo social, para ajustar a direção estratégica.",
    "roi-card": "Espaço reservado para ROI por agência; será preenchido quando os dados financeiros estiverem disponíveis.",
    "roi-athus-card": "Card da Athus na aba ROI. O investido está informado, o total pago ainda não.",
    "roi-global-card": "Total pago à Global no período, ao lado do que foi investido em mídia. Os dois valores são praticamente iguais.",
    "roi-matheus-card": "Total pago à Matheus, aberto por funil, ao lado do investido em mídia. Só a Imersão teve valor: Consultoria e Instituto IBFP ficaram zeradas.",
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
