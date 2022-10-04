//variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

let raqueteComprimento = 10;
let raqueteAltura = 90;

//velocidades da Bolinha
let velocidadeXbolinha = 6;
let velocidadeYbolinha = 6;

//variáveis da minha raquete
let xRaquete1 = 5;
let yRaquete1 = 150;

//variáveis da raquete oponente
let xRaquete2 = 585;
let yRaquete2 = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBordas();
  mostraRaquete(xRaquete1, yRaquete1);
  movimentaRaquete1();
  //verificaColisaoRaquete1();
  verificaColisaoRaquete(xRaquete1, yRaquete1);
  mostraRaquete(xRaquete2, yRaquete2);
  movimentaRaquete2();
  verificaColisaoRaquete(xRaquete2, yRaquete2);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeYbolinha;
}

function verificaColisaoBordas() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXbolinha *= -1;
  }

  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYbolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaRaquete1() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete1 -= 10;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yRaquete1 += 10;
  }
}

function verificaColisaoRaquete1() {
  if (
    xBolinha - raio < xRaquete1 + raqueteComprimento &&
    yBolinha - raio < yRaquete1 + raqueteAltura &&
    yBolinha + raio > yRaquete1
  ) {
    velocidadeXbolinha *= -1;
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    raqueteComprimento,
    raqueteAltura,
    xBolinha,
    yBolinha,
    raio
  );
  if (colidiu) {
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaquete2() {
  velocidadeYOponente = yBolinha - yRaquete2 - raqueteComprimento / 2 - 30;
  yRaquete2 += velocidadeYOponente;
}

//jogar com oponente real
//if (keyIsDown(87)) {
//yRaquete2 -= 10;}

//if (keyIsDown(83)) {
//yRaquete2 += 10;
//}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(260, 10, 40, 20);
  fill(255);
  text(meusPontos, 280, 26);
  fill(color(255, 140, 0));
  rect(330, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 350, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa() {
  if (xBolinha - raio < 0) {
    xBolinha = 23;
  }
  if (xBolinha + raio > 600) {
    xBolinha = 580;
  }
}
