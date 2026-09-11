/* =========================================================
   DIÁRIO DE CAMPO — RENDIMENTO DE REAÇÃO
   Lógica de estado, navegação, avaliação diagnóstica e CSV
   ========================================================= */

const CHAVE_STORAGE = 'pibid_rendimento_reacao_v3';

const PERSONAGENS = {
  1: {
    nome: 'Dandara',
    cargo: 'Síntese Industrial & Novos Materiais',
    bio: 'Graduanda em Química Tecnológica, estuda como transformar resíduos industriais em novos materiais úteis e sustentáveis.',
    img: 'personagens/personagem1.png',
    iniciais: 'DA',
    cientistaNome: 'Profa. Dra. Joana D’Arc Félix de Sousa',
    cientistaImg: 'inspiracoes/inspiracao1.jpg',
    falaInspiracao: 'Minha maior referência na ciência é a Profa. Dra. Joana D’Arc Félix de Sousa, química premiada pelo desenvolvimento de biomateriais a partir de resíduos do couro. Ela me ensinou que olhar para o que a indústria descarta e enxergar inovação ecológica é a verdadeira missão da química.'
  },
  2: {
    nome: 'Moara',
    cargo: 'Fitoquímica & Sociobiodiversidade',
    bio: 'Pesquisadora dedicada aos recursos naturais, investigando métodos limpos de extração e respeito aos ciclos das florestas.',
    img: 'personagens/personagem2.png',
    iniciais: 'MO',
    cientistaNome: 'Vandria Borari',
    cientistaImg: 'inspiracoes/inspiracao2.jpg',
    falaInspiracao: 'Minha referência direta é a ativista e jurista indígena Vandria Borari, do povo Borari de Alter do Chão (PA), atuante na defesa da Amazônia. Com ela, aprendo que o estudo dos recursos naturais deve caminhar lado a lado com o respeito aos povos originários e à preservação dos biomas.'
  },
  3: {
    nome: 'Alex',
    cargo: 'Estequiometria & Modelagem Teórica',
    bio: 'Pesquisador focado em equações complexas, balanços de massa e raciocínio lógico em sistemas de reação.',
    img: 'personagens/personagem3.png',
    iniciais: 'AL',
    cientistaNome: 'Dra. Vivian Miranda',
    cientistaImg: 'inspiracoes/inspiracao3.jpg',
    falaInspiracao: 'Minha grande inspiração é a Dra. Vivian Miranda, astrofísica brasileira e mulher trans que atuou no Jet Propulsion Laboratory da NASA desenvolvendo telescópios espaciais. O trabalho dela me mostra que a precisão matemática e a diversidade abrem caminhos para desvendar os maiores mistérios da ciência.'
  },
  4: {
    nome: 'Samuel',
    cargo: 'Química Medicinal & Farmácia Pública',
    bio: 'Focado no cotidiano laboratorial, síntese de princípios ativos e ampliação do acesso a medicamentos para a saúde pública.',
    img: 'personagens/personagem4.png',
    iniciais: 'SA',
    cientistaNome: 'Dr. Carlos Chagas',
    cientistaImg: 'inspiracoes/inspiracao4.jpg',
    falaInspiracao: 'Minha inspiração histórica é o médico e cientista Dr. Carlos Chagas, pioneiro que descreveu integralmente o ciclo de uma doença infecciosa e dedicou sua vida à saúde pública no Brasil. A trajetória dele me lembra que calcular rendimento na síntese de remédios é trabalhar para que o tratamento chegue a quem precisa com menor custo.'
  }
};

// -------- Fichas do Desafio dos 10 Fatores (Tela 3) --------
const FICHAS = [
  { id: 'd3', titulo: 'Conservação da massa e temperatura', texto: 'Se a temperatura da reação subir bastante, parte da matéria se destrói e "some" do sistema, reduzindo o rendimento.', correta: false },
  { id: 'f2', titulo: 'Perdas operacionais em vidrarias e filtros', texto: 'Frações de material são inevitavelmente perdidas ao ficarem grudadas em béqueres, retidas em papel de filtro ou ao evaporarem durante a manipulação.', correta: true },
  { id: 'd5', titulo: 'Uso de agitador magnético', texto: 'A agitação mecânica contínua consome uma pequena parte da massa dos reagentes por atrito molecular entre as partículas em movimento.', correta: false },
  { id: 'f4', titulo: 'Tempo insuficiente de reação', texto: 'Interromper o processo antes da hora impede que reações mais lentas terminem de converter todo o reagente limitante em produto.', correta: true },
  { id: 'd1', titulo: 'Massa molar e perda de prótons', texto: 'Durante a reação, alguns átomos perdem prótons de seus núcleos, o que reduziria a massa molar e, portanto, a massa final do produto.', correta: false },
  { id: 'f5', titulo: 'Equilíbrio químico dinâmico', texto: 'Em reações reversíveis, o sistema atinge um limite dinâmico em que produtos voltam a se transformar em reagentes, impedindo a conversão total.', correta: true },
  { id: 'd2', titulo: 'Cor e estado físico dos reagentes', texto: 'Reagentes incolores ou transparentes tendem a render menos, pois absorvem menos luz do ambiente para fornecer energia à reação.', correta: false },
  { id: 'f1', titulo: 'Pureza dos reagentes', texto: 'Reagentes impuros contêm materiais inertes que não participam da reação, reduzindo a quantidade real de matéria disponível para formar produto.', correta: true },
  { id: 'd4', titulo: 'Volume do frasco de coleta', texto: 'Usar um frasco de coleta maior "dilui" o produto formado, fazendo com que a quantidade em gramas recolhida pareça menor do que realmente é.', correta: false },
  { id: 'f3', titulo: 'Reações paralelas e concorrentes', texto: 'Os reagentes tomam caminhos químicos alternativos ao mesmo tempo, formando subprodutos indesejados em vez do composto principal esperado.', correta: true }
];

// -------- Questões 1 a 5 (Telas 5 a 9) com 2 Perguntas Temáticas cada --------
const QUESTOES = [
  {
    id: 1,
    titulo: 'Questão 1 — Montando a reação e enfrentando a perda',
    enunciado: 'Contem as peças dos potes de Reagente A e Reagente B e montem a reação seguindo a proporção 1 A : 2 B, unindo os pares até não ser mais possível formar produto. Registrem quantas peças de produto foram formadas (rendimento teórico). Em seguida, o professor vai recolher aleatoriamente algumas peças do produto montado, simulando uma perda. Contem novamente o que restou (rendimento real). Assim como na receita de biscoitos da atividade diagnóstica, o produto "sumiu" ou existe uma explicação física e operacional para essa redução? Justifiquem sem recorrer a reações químicas inexistentes.',
    personagem: 1,
    fala: 'Anotações feitas! Agora vamos sair da bancada e investigar o rendimento na produção de queijo e derivados de leite.',
    quiz1: {
      pergunta: 'Na produção tradicional de queijo coalho, são necessários cerca de 10 litros de leite cru para produzir aproximadamente 1 kg de queijo pronto. Por que o volume de queijo obtido não corresponde à massa inicial do leite?',
      opcoes: [
        'A maior parte do volume do leite é composta por água e soro líquido, que são drenados na prensagem da coalhada.',
        'As bactérias do queijo destroem matéria orgânica para transformá-la em gás inexistente.',
        'O cálcio do leite evapora espontaneamente na temperatura ambiente da queijaria.',
        'O calor da pasteurização destrói os átomos das proteínas do leite.'
      ],
      correta: 0
    },
    quiz2: {
      pergunta: 'Comparando o queijo Minas frescal (úmido) e o queijo parmesão curado (seco), o rendimento em massa por litro de leite é consideravelmente menor no queijo curado. Qual fator prático explica essa diferença?',
      opcoes: [
        'No queijo curado ocorrem perdas contínuas de água por evaporação durante os meses de maturação na câmara.',
        'O sal utilizado no queijo curado dissolve e consome as gorduras da peça.',
        'O queijo curado passa a ter massa atômica menor do que o queijo fresco.',
        'A peça curada encolhe porque o oxigênio da sala remove os átomos da casca.'
      ],
      correta: 0
    }
  },
  {
    id: 2,
    titulo: 'Questão 2 — Rendimento na Síntese de Laboratório',
    enunciado: 'Em uma aula prática de síntese de sulfato de cobre pentahidratado (CuSO₄·5H₂O), o professor informou que a quantidade teórica esperada a partir dos reagentes pesados era de 25,0 g de cristais azuis. Após filtração, lavagem e secagem completa em estufa, a equipe recolheu 18,5 g de produto seco puro.\n\na) Calculem o rendimento percentual obtido pelo grupo.\nb) Apontem ao menos duas causas operacionais que explicam por que o grupo não obteve os 25,0 g integrais, sem violar a lei da conservação das massas.',
    personagem: 3,
    fala: 'Excelente registro analítico! Pensem agora comigo em outro universo onde as massas e a umidade são essenciais: a panificação artesanal.',
    quiz1: {
      pergunta: 'Ao preparar pães franceses, o padeiro mistura farinha, água e sal, totalizando 10 kg de massa úmida moldada. Após o forneamento, a fornada pesou 8,4 kg de pães prontos. O que causou essa perda de massa?',
      opcoes: [
        'Evaporação intensa de água da massa e liberação de gás carbônico durante o cozimento no forno quente.',
        'O fermento biológico consome e faz sumir a massa do glúten sem gerar nenhum composto.',
        'A casca do pão queima e transforma os átomos da farinha em calor puro.',
        'A balança da padaria registra menos peso automaticamente quando o alimento está quente.'
      ],
      correta: 0
    },
    quiz2: {
      pergunta: 'Se o padeiro adicionar sementes secas de gergelim sobre os pães antes de assar, ele nota que a massa final cai proporcionalmente menos durante o forno. Do ponto de vista de rendimento, por que isso ocorre?',
      opcoes: [
        'As sementes contêm pouca água livre em sua estrutura, sofrendo quase nenhuma perda por evaporação se comparadas à massa crua.',
        'O gergelim retém calor e faz a massa produzir água espontaneamente no forno.',
        'As sementes multiplicam a quantidade de carboidratos do miolo do pão.',
        'O gergelim impede quimicamente que a água do pão atinja a temperatura de fervura.'
      ],
      correta: 0
    }
  },
  {
    id: 3,
    titulo: 'Questão 3 — Reagente limitante',
    enunciado: 'Se o pote de Reagente B tivesse a metade da quantidade de peças que ele tem agora, o que aconteceria com a quantidade máxima de produto que poderia ser formada? Nessa nova situação, qual reagente seria o "reagente limitante"? Expliquem usando a contagem das peças.',
    personagem: 3,
    fala: 'O raciocínio de proporção está perfeito! Vamos aplicar a ideia de reagente limitante na queima de combustíveis em motores de carros.',
    quiz1: {
      pergunta: 'Em um motor flex abastecido com etanol, a queima completa exige uma proporção estequiométrica precisa entre o oxigênio do ar e o combustível. Se o filtro de ar estiver entupido, restringindo o fluxo de oxigênio, o que ocorre?',
      opcoes: [
        'O oxigênio passa a ser o reagente limitante, impedindo a queima total do etanol injetado.',
        'O etanol passa a queimar mais rápido para compensar a falta de ar.',
        'O motor aumenta seu rendimento energético por não precisar de ar.',
        'A proporção estequiométrica se ajusta sozinha sem alterar os produtos da queima.'
      ],
      correta: 0
    },
    quiz2: {
      pergunta: 'Quando há combustível em excesso em relação ao oxigênio (a chamada "mistura rica"), o motor não aproveita todo o combustível para gerar trabalho mecânico. Qual é a consequência química observável?',
      opcoes: [
        'Formação de fuligem (carbono não queimado) e monóxido de carbono, expelidos pelo escapamento como resíduos.',
        'Destruição espontânea do etanol excedente no interior do cilindro.',
        'Conversão do combustível que sobra em água pura líquida.',
        'Diminuição imediata da temperatura interna do escapamento a zero grau.'
      ],
      correta: 0
    }
  },
  {
    id: 4,
    titulo: 'Questão 4 — Rendimento no dia a dia',
    enunciado: 'Ao espremer laranjas para o café da manhã, estimou-se que a polpa e o líquido total das frutas deveriam fornecer teoricamente 500 mL de suco. Porém, ao coar e despejar o líquido na jarra, o volume real medido foi de 425 mL. Calcule o rendimento percentual da extração desse suco. O que causou essa diferença entre o volume esperado e o que realmente foi para a jarra? Aponte fatores práticos que justificam essa perda.',
    personagem: 2,
    fala: 'Muito bom! Vamos agora sair do suco de laranja e analisar a agroindústria da cana-de-açúcar e da produção de bioetanol.',
    quiz1: {
      pergunta: 'Nas usinas sucroalcooleiras, as moendas esmagam a cana para extrair o caldo açucarado. Por que nenhuma usina obtém 100% de rendimento na extração desse caldo?',
      opcoes: [
        'Parte do líquido e dos açúcares permanece inevitavelmente retida na estrutura fibrosa do bagaço residual.',
        'Os rolos de ferro da moenda destroem quimicamente as moléculas de sacarose.',
        'O caldo evapora integralmente nos segundos em que a cana passa pela moenda.',
        'As fibras da cana absorvem oxigênio atmosférico e duplicam de tamanho.'
      ],
      correta: 0
    },
    quiz2: {
      pergunta: 'Para melhorar a eficiência global do processo, as usinas queimam esse bagaço residual em caldeiras para gerar vapor e eletricidade para a própria fábrica. Como essa prática se relaciona ao conceito de rendimento sustentável?',
      opcoes: [
        'Aproveita a energia contida no subproduto que não virou caldo, aumentando o rendimento energético total da agroindústria.',
        'Garante que 100% da matéria da cana vire etanol líquido no final.',
        'Faz com que o bagaço se transforme espontaneamente em mais caldo nas caldeiras.',
        'Elimina a necessidade de estequiometria na fermentação do caldo.'
      ],
      correta: 0
    }
  },
  {
    id: 5,
    titulo: 'Questão 5 — Do laboratório ao dia a dia',
    enunciado: 'Imaginem que o produto montado com o Material Dourado representasse um medicamento sendo produzido em um laboratório farmacêutico, como o Ácido Acetilsalicílico (AAS) da atividade diagnóstica. Se o rendimento da reação for baixo, quais são as consequências práticas para produzir a mesma quantidade final de medicamento? Como isso pode impactar o preço do produto vendido ao consumidor?',
    personagem: 4,
    fala: 'Chegamos à última análise! Para fechar, vamos entender a manipulação de pomadas e medicamentos em uma farmácia magistral.',
    quiz1: {
      pergunta: 'Em uma farmácia de manipulação, ao produzir 100 g de uma pomada dermatológica em um gral de porcelana, o farmacêutico nota que só conseguiu envasar 92 g na bisnaga final. O que explica essa redução operacional?',
      opcoes: [
        'Frações da base gordurosa ficam obrigatoriamente retidas nas paredes do gral de porcelana, no pistilo e nas espátulas.',
        'A pomada perde massa porque os princípios ativos são destruídos ao contato com o ar.',
        'O recipiente de plástico da bisnaga absorve parte da massa da pomada para sua estrutura interna.',
        'A luz ambiente da bancada consome as moléculas do creme manipulado.'
      ],
      correta: 0
    },
    quiz2: {
      pergunta: 'Se a receita fosse para um frasco muito pequeno (ex: apenas 10 g de pomada), a mesma perda de 8 g em espátulas e vidrarias representaria quase 80% de perda do lote. Qual é a estratégia farmacotécnica adotada para contornar isso?',
      opcoes: [
        'Calcular uma margem de excesso de matéria-prima no lote para garantir a entrega da massa exata prescrita na embalagem.',
        'Adicionar água pura na embalagem até atingir o peso sem alterar o rótulo.',
        'Aquecer as espátulas ao fogo até que o creme se transforme em vapor e entre na bisnaga.',
        'Proibir a manipulação de medicamentos em quantidades inferiores a 500 gramas.'
      ],
      correta: 0
    }
  }
];

const TOTAL_ETAPAS = 10;

// ========================= ESTADO =========================
let estado = carregarEstado() || {
  etapaAtual: 0,
  alunos: [],
  respostas: {},            // qId -> texto
  registrado: {},          // qId -> bool
  fichasSelecionadas: [],  // array de ids
  fichasRegistrada: false, // apenas indica se concluiu a tela 3
  quizRespostas: {}        // qId -> { q1Texto, q1Correta, q2Texto, q2Correta }
};

estado.quizRespostas = estado.quizRespostas || {};

function salvarEstado() {
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(estado));
  } catch (e) {
    console.warn('Não foi possível salvar no localStorage:', e);
  }
}

function carregarEstado() {
  try {
    const bruto = localStorage.getItem(CHAVE_STORAGE);
    return bruto ? JSON.parse(bruto) : null;
  } catch (e) {
    return null;
  }
}

// ========================= NAVEGAÇÃO =========================
function irParaEtapa(indice) {
  estado.etapaAtual = Math.max(0, Math.min(indice, TOTAL_ETAPAS - 1));
  salvarEstado();
  renderizarTela();
}

function avancarEtapa() {
  irParaEtapa(estado.etapaAtual + 1);
}

function atualizarTopo() {
  const topo = document.getElementById('topoDiario');
  if (estado.etapaAtual === 0) {
    topo.hidden = true;
    return;
  }
  topo.hidden = false;
  const pct = (estado.etapaAtual / (TOTAL_ETAPAS - 1)) * 100;
  document.getElementById('barraProgresso').style.width = pct + '%';
  document.getElementById('progressoTexto').textContent = `Etapa ${estado.etapaAtual + 1} de ${TOTAL_ETAPAS}`;
}

function iniciaisDoPersonagem(idPersonagem) {
  return PERSONAGENS[idPersonagem] ? PERSONAGENS[idPersonagem].iniciais : '??';
}

function marcarIniciaisFallback(container) {
  container.querySelectorAll('[data-personagem]').forEach((balao) => {
    const idp = balao.getAttribute('data-personagem');
    balao.setAttribute('data-iniciais', iniciaisDoPersonagem(idp));
  });
}

// ========================= RENDERIZAÇÃO PRINCIPAL =========================
function renderizarTela() {
  const palco = document.getElementById('palco');
  palco.innerHTML = '';
  atualizarTopo();

  const idx = estado.etapaAtual;
  let secao;

  if (idx === 0) secao = renderCapa();
  else if (idx === 1) secao = renderContexto();
  else if (idx === 2) secao = renderFatores();
  else if (idx === 3) secao = renderProtocolo();
  else if (idx >= 4 && idx <= 8) secao = renderQuestao(idx - 4);
  else secao = renderEncerramento();

  palco.appendChild(secao);
  marcarIniciaisFallback(secao);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================= TELA 1: CAPA =========================
function renderCapa() {
  const tpl = document.getElementById('tpl-capa');
  const nó = tpl.content.cloneNode(true);
  const secao = nó.querySelector('.tela-capa');

  const input = secao.querySelector('#inputAluno');
  const btnAdd = secao.querySelector('#btnAddAluno');
  const tags = secao.querySelector('#tagsAlunos');
  const dica = secao.querySelector('#dicaCadastro');
  const btnIniciar = secao.querySelector('#btnIniciarExpedicao');

  function renderTags() {
    tags.innerHTML = '';
    estado.alunos.forEach((nome, i) => {
      const tag = document.createElement('span');
      tag.className = 'tag-aluno';
      tag.innerHTML = `<span>${escapeHTML(nome)}</span>`;
      const btnRemover = document.createElement('button');
      btnRemover.type = 'button';
      btnRemover.setAttribute('aria-label', `Remover ${nome}`);
      btnRemover.textContent = '×';
      btnRemover.addEventListener('click', () => {
        estado.alunos.splice(i, 1);
        salvarEstado();
        renderTags();
      });
      tag.appendChild(btnRemover);
      tags.appendChild(tag);
    });
    const habilitado = estado.alunos.length > 0;
    btnIniciar.disabled = !habilitado;
    dica.textContent = habilitado
      ? `${estado.alunos.length} integrante(s) pronto(s) para a expedição.`
      : 'Adicione ao menos um(a) integrante para liberar a expedição.';
    salvarEstado();
  }

  function adicionarAluno() {
    const nome = input.value.trim();
    if (!nome) return;
    estado.alunos.push(nome);
    input.value = '';
    renderTags();
    input.focus();
  }

  btnAdd.addEventListener('click', adicionarAluno);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      adicionarAluno();
    }
  });

  btnIniciar.addEventListener('click', () => {
    if (estado.alunos.length > 0) avancarEtapa();
  });

  renderTags();
  return secao;
}

// ========================= TELA 2: CONTEXTO =========================
function renderContexto() {
  const tpl = document.getElementById('tpl-contexto');
  const nó = tpl.content.cloneNode(true);
  const secao = nó.querySelector('.tela-contexto');
  secao.querySelector('[data-acao="avancar"]').addEventListener('click', avancarEtapa);
  return secao;
}

// ========================= TELA 3: FATORES (SEM SPOILERS, AVANÇO LIVRE) =========================
function renderFatores() {
  const tpl = document.getElementById('tpl-desafio-fatores');
  const nó = tpl.content.cloneNode(true);
  const secao = nó.querySelector('.tela-fatores');

  const grade = secao.querySelector('#gradeFichas');
  const feedback = secao.querySelector('#feedbackFichas');
  const btnValidar = secao.querySelector('#btnValidarFichas');
  const btnAvancar = secao.querySelector('#btnAvancarFichas');

  function renderFichas() {
    grade.innerHTML = '';
    FICHAS.forEach((f) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ficha';
      btn.innerHTML = `<strong>${escapeHTML(f.titulo)}</strong><span>${escapeHTML(f.texto)}</span>`;
      
      if (estado.fichasSelecionadas.includes(f.id)) {
        btn.classList.add('selecionada');
      }

      if (estado.fichasRegistrada) {
        btn.disabled = true;
      } else {
        btn.addEventListener('click', () => {
          const pos = estado.fichasSelecionadas.indexOf(f.id);
          if (pos >= 0) estado.fichasSelecionadas.splice(pos, 1);
          else estado.fichasSelecionadas.push(f.id);
          salvarEstado();
          renderFichas();
        });
      }
      grade.appendChild(btn);
    });
  }

  function aplicarConclusao() {
    btnValidar.classList.add('oculto');
    btnAvancar.classList.remove('oculto');
    feedback.textContent = 'Seleção registrada com sucesso no diário de campo.';
    feedback.style.color = '#1B3B6F';
  }

  btnValidar.addEventListener('click', () => {
    if (estado.fichasSelecionadas.length === 0) {
      feedback.textContent = 'Por favor, selecionem ao menos uma opção antes de registrar.';
      feedback.style.color = '#B3261E';
      return;
    }
    estado.fichasRegistrada = true;
    salvarEstado();
    renderFichas();
    aplicarConclusao();
  });

  btnAvancar.addEventListener('click', avancarEtapa);

  renderFichas();
  if (estado.fichasRegistrada) {
    aplicarConclusao();
  }

  return secao;
}

// ========================= TELA 4: PROTOCOLO =========================
function renderProtocolo() {
  const tpl = document.getElementById('tpl-protocolo');
  const nó = tpl.content.cloneNode(true);
  const secao = nó.querySelector('.tela-protocolo');
  secao.querySelector('[data-acao="avancar"]').addEventListener('click', avancarEtapa);
  return secao;
}

// ========================= TELAS 5–9: QUESTÕES =========================
function renderQuestao(indiceQuestao) {
  const q = QUESTOES[indiceQuestao];
  const tpl = document.getElementById('tpl-questao');
  const nó = tpl.content.cloneNode(true);
  const secao = nó.querySelector('.tela-questao');

  secao.querySelector('#qTitulo').textContent = q.titulo;
  secao.querySelector('#qEnunciado').textContent = q.enunciado;

  const caixa = secao.querySelector('#qCaixaResposta');
  const btnRegistrar = secao.querySelector('#btnRegistrar');
  const carimbo = secao.querySelector('#carimboRegistrado');
  const areaQuiz = secao.querySelector('#areaPersonagemQuiz');
  const btnAvancarQuestao = secao.querySelector('#btnAvancarQuestao');

  caixa.value = estado.respostas[q.id] || '';
  caixa.addEventListener('input', () => {
    estado.respostas[q.id] = caixa.value;
    salvarEstado();
  });

  function jaRegistrado() {
    return !!estado.registrado[q.id];
  }

  function aplicarEstadoRegistrado() {
    caixa.setAttribute('readonly', 'true');
    carimbo.classList.remove('oculto');
    btnRegistrar.classList.add('oculto');
  }

  btnRegistrar.addEventListener('click', () => {
    if (!caixa.value.trim()) {
      caixa.focus();
      return;
    }
    estado.registrado[q.id] = true;
    salvarEstado();
    aplicarEstadoRegistrado();
    mostrarQuizzes();
  });

  function mostrarQuizzes() {
    areaQuiz.classList.remove('oculto');
    const balaoEl = areaQuiz.querySelector('#balaoQuiz');
    const avatarEl = areaQuiz.querySelector('#avatarQuiz');
    balaoEl.classList.remove('avatar-erro');
    avatarEl.setAttribute('alt', PERSONAGENS[q.personagem].nome);
    avatarEl.setAttribute('src', PERSONAGENS[q.personagem].img);
    balaoEl.setAttribute('data-personagem', q.personagem);
    balaoEl.setAttribute('data-iniciais', iniciaisDoPersonagem(q.personagem));
    areaQuiz.querySelector('#nomeQuiz').textContent = PERSONAGENS[q.personagem].nome;
    areaQuiz.querySelector('#falaQuiz').textContent = q.fala;

    renderPergunta1();
  }

  function renderPergunta1() {
    const p1El = secao.querySelector('#perguntaQuiz1');
    const op1El = secao.querySelector('#opcoesQuiz1');
    const fb1El = secao.querySelector('#feedbackQuiz1');
    p1El.textContent = q.quiz1.pergunta;
    op1El.innerHTML = '';
    fb1El.textContent = '';

    const dadosSalvos = estado.quizRespostas[q.id];

    q.quiz1.opcoes.forEach((opcaoTexto, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'opcao-quiz';
      btn.textContent = opcaoTexto;
      op1El.appendChild(btn);

      if (dadosSalvos && dadosSalvos.q1Texto) {
        btn.disabled = true;
        if (opcaoTexto === dadosSalvos.q1Texto) {
          btn.classList.add('carimbada');
        }
      } else {
        btn.addEventListener('click', () => {
          estado.quizRespostas[q.id] = estado.quizRespostas[q.id] || {};
          estado.quizRespostas[q.id].q1Texto = opcaoTexto;
          estado.quizRespostas[q.id].q1Correta = (idx === q.quiz1.correta);
          salvarEstado();
          renderPergunta1();
          renderPergunta2();
        });
      }
    });

    if (dadosSalvos && dadosSalvos.q1Texto) {
      fb1El.textContent = 'Registro 1 arquivado.';
      fb1El.style.color = '#1B3B6F';
      renderPergunta2();
    }
  }

  function renderPergunta2() {
    const cartao2 = secao.querySelector('#cartaoQuiz2');
    cartao2.classList.remove('oculto');
    const p2El = secao.querySelector('#perguntaQuiz2');
    const op2El = secao.querySelector('#opcoesQuiz2');
    const fb2El = secao.querySelector('#feedbackQuiz2');
    p2El.textContent = q.quiz2.pergunta;
    op2El.innerHTML = '';
    fb2El.textContent = '';

    const dadosSalvos = estado.quizRespostas[q.id];

    q.quiz2.opcoes.forEach((opcaoTexto, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'opcao-quiz';
      btn.textContent = opcaoTexto;
      op2El.appendChild(btn);

      if (dadosSalvos && dadosSalvos.q2Texto) {
        btn.disabled = true;
        if (opcaoTexto === dadosSalvos.q2Texto) {
          btn.classList.add('carimbada');
        }
      } else {
        btn.addEventListener('click', () => {
          estado.quizRespostas[q.id] = estado.quizRespostas[q.id] || {};
          estado.quizRespostas[q.id].q2Texto = opcaoTexto;
          estado.quizRespostas[q.id].q2Correta = (idx === q.quiz2.correta);
          salvarEstado();
          renderPergunta2();
          btnAvancarQuestao.classList.remove('oculto');
        });
      }
    });

    if (dadosSalvos && dadosSalvos.q2Texto) {
      fb2El.textContent = 'Registro 2 arquivado. Etapa concluída!';
      fb2El.style.color = '#1B3B6F';
      btnAvancarQuestao.classList.remove('oculto');
    }
  }

  btnAvancarQuestao.addEventListener('click', avancarEtapa);

  if (jaRegistrado()) {
    aplicarEstadoRegistrado();
    mostrarQuizzes();
  }

  return secao;
}

// ========================= TELA 10: ENCERRAMENTO & CARROSSEL =========================
let carrosselIntervalo = null;
let slideAtual = 0;

function renderEncerramento() {
  const tpl = document.getElementById('tpl-encerramento');
  const nó = tpl.content.cloneNode(true);
  const secao = nó.querySelector('.tela-encerramento');

  const slidesContainer = secao.querySelector('#carrosselSlides');
  const indicadoresContainer = secao.querySelector('#carrosselIndicadores');
  const btnArquivar = secao.querySelector('#btnArquivarCSV');
  const confirmacao = secao.querySelector('#confirmacaoCSV');
  const btnReiniciar = secao.querySelector('#btnReiniciar');

  // Montar slides dos personagens e cientistas reais
  const ids = [1, 2, 3, 4];
  slidesContainer.innerHTML = '';
  indicadoresContainer.innerHTML = '';

  ids.forEach((id, idx) => {
    const p = PERSONAGENS[id];

    const slide = document.createElement('article');
    slide.className = 'slide-item' + (idx === 0 ? ' ativo' : '');
    slide.id = `slide-${idx}`;
    slide.innerHTML = `
      <div class="coluna-personagem">
        <img class="foto-personagem-grande" src="${p.img}" alt="${p.nome}" onerror="this.src='logo.png'">
        <div class="info-personagem">
          <h3>${p.nome}</h3>
          <span class="cargo-personagem">${p.cargo}</span>
          <p class="bio-personagem">${p.bio}</p>
        </div>
      </div>
      <div class="coluna-inspiracao">
        <div class="topo-inspiracao">
          <img class="foto-cientista" src="${p.cientistaImg}" alt="${p.cientistaNome}" onerror="this.src='logo.png'">
          <div>
            <span class="rotulo-inspiracao">Inspiração Científica Real</span>
            <h4 class="nome-cientista">${p.cientistaNome}</h4>
          </div>
        </div>
        <p class="texto-fala-inspiracao">"${p.falaInspiracao}"</p>
      </div>
    `;
    slidesContainer.appendChild(slide);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'ponto-indicador' + (idx === 0 ? ' ativo' : '');
    dot.setAttribute('aria-label', `Slide ${idx + 1}: ${p.nome}`);
    dot.addEventListener('click', () => {
      mudarSlide(idx);
      reiniciarTimer();
    });
    indicadoresContainer.appendChild(dot);
  });

  function mudarSlide(novoIdx) {
    const slides = slidesContainer.querySelectorAll('.slide-item');
    const dots = indicadoresContainer.querySelectorAll('.ponto-indicador');
    if (slides.length === 0) return;

    slides[slideAtual].classList.remove('ativo');
    dots[slideAtual].classList.remove('ativo');

    slideAtual = (novoIdx + slides.length) % slides.length;

    slides[slideAtual].classList.add('ativo');
    dots[slideAtual].classList.add('ativo');
  }

  function iniciarTimer() {
    pararTimer();
    carrosselIntervalo = setInterval(() => {
      mudarSlide(slideAtual + 1);
    }, 7000); // transição a cada 7 segundos
  }

  function pararTimer() {
    if (carrosselIntervalo) {
      clearInterval(carrosselIntervalo);
      carrosselIntervalo = null;
    }
  }

  function reiniciarTimer() {
    iniciarTimer();
  }

  // Pausar carrossel ao passar o mouse para permitir leitura confortável
  slidesContainer.addEventListener('mouseenter', pararTimer);
  slidesContainer.addEventListener('mouseleave', iniciarTimer);

  iniciarTimer();

  btnArquivar.addEventListener('click', () => {
    exportarCSV();
    confirmacao.classList.remove('oculto');
  });

  btnReiniciar.addEventListener('click', () => {
    if (confirm('Isso vai apagar todos os dados salvos desta expedição e recomeçar do zero. Confirmar?')) {
      pararTimer();
      localStorage.removeItem(CHAVE_STORAGE);
      estado = {
        etapaAtual: 0,
        alunos: [],
        respostas: {},
        registrado: {},
        fichasSelecionadas: [],
        fichasRegistrada: false,
        quizRespostas: {}
      };
      renderizarTela();
    }
  });

  return secao;
}

// ========================= EXPORTAÇÃO CSV COMPLETA =========================
function escapeCSV(valor) {
  if (valor === undefined || valor === null) return '';
  const texto = String(valor).replace(/"/g, '""').replace(/\r?\n/g, ' ');
  return `"${texto}"`;
}

function escapeHTML(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

function dataAtualFormatada() {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, '0');
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const ano = hoje.getFullYear();
  return `${dia}-${mes}-${ano}`;
}

function horaAtualFormatada() {
  const hoje = new Date();
  const h = String(hoje.getHours()).padStart(2, '0');
  const m = String(hoje.getMinutes()).padStart(2, '0');
  const s = String(hoje.getSeconds()).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function sanitizarNomeArquivo(texto) {
  return texto
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function exportarCSV() {
  const linhas = [];
  linhas.push([
    'Alunos',
    'Data',
    'Hora',
    'Etapa/Questão',
    'Resposta Dissertativa',
    'Desafio Temático 1 (Resposta | Avaliação)',
    'Desafio Temático 2 (Resposta | Avaliação)',
    'Desempenho Geral dos Quizzes'
  ].map(escapeCSV).join(';'));

  const nomesAlunos = estado.alunos.join(', ');
  const data = dataAtualFormatada();
  const hora = horaAtualFormatada();

  // 1. Auditoria dos 10 Fatores de Rendimento
  const selecionadas = estado.fichasSelecionadas || [];
  let acertosFatores = 0;
  const titulosMarcados = [];

  FICHAS.forEach((f) => {
    if (selecionadas.includes(f.id)) {
      titulosMarcados.push(f.titulo);
      if (f.correta) acertosFatores += 1;
    }
  });

  linhas.push([
    nomesAlunos,
    data,
    hora,
    'Desafio dos 10 Fatores de Rendimento',
    `Fatores selecionados pelo grupo: ${titulosMarcados.join(' | ') || 'Nenhum'}`,
    `Resultado do Grupo: acertou ${acertosFatores} de 5 fatores reais`,
    '',
    ''
  ].map(escapeCSV).join(';'));

  // 2. Auditoria das Questões 1 a 5 e seus respectivos quizzes
  let totalAcertosQuizzes = 0;
  const totalPerguntas = QUESTOES.length * 2; // 10 perguntas no total

  QUESTOES.forEach((q) => {
    const respostaDissertativa = estado.respostas[q.id] || '(Sem resposta escrita)';
    const resp = estado.quizRespostas[q.id] || {};

    let colunaQuiz1 = 'Não respondido';
    if (resp.q1Texto) {
      if (resp.q1Correta) totalAcertosQuizzes += 1;
      colunaQuiz1 = `${resp.q1Texto} | [${resp.q1Correta ? 'CORRETA' : 'INCORRETA'}]`;
    }

    let colunaQuiz2 = 'Não respondido';
    if (resp.q2Texto) {
      if (resp.q2Correta) totalAcertosQuizzes += 1;
      colunaQuiz2 = `${resp.q2Texto} | [${resp.q2Correta ? 'CORRETA' : 'INCORRETA'}]`;
    }

    linhas.push([
      nomesAlunos,
      data,
      hora,
      q.titulo,
      respostaDissertativa,
      colunaQuiz1,
      colunaQuiz2,
      ''
    ].map(escapeCSV).join(';'));
  });

  // Linha resumo de pontuação diagnóstica
  linhas.push([
    nomesAlunos,
    data,
    hora,
    'Resumo Diagnóstico Geral',
    `Fatores de Rendimento: ${acertosFatores}/5`,
    `Desafios Conceituais: ${totalAcertosQuizzes}/${totalPerguntas} acertos`,
    '',
    `Aproveitamento: ${((totalAcertosQuizzes / totalPerguntas) * 100).toFixed(1)}%`
  ].map(escapeCSV).join(';'));

  const conteudoCSV = '\uFEFF' + linhas.join('\r\n');
  const blob = new Blob([conteudoCSV], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const nomesSanitizados = estado.alunos.map(sanitizarNomeArquivo).join('_') || 'Grupo';
  const nomeArquivo = `Rendimento_${nomesSanitizados}_${data}.csv`;

  const link = document.createElement('a');
  link.href = url;
  link.download = nomeArquivo;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ========================= INICIALIZAÇÃO =========================
document.addEventListener('DOMContentLoaded', () => {
  renderizarTela();
});