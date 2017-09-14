var clock;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var ex = (canvas.width / 8);
var ey = (canvas.height / 6);
var ladogeneral = ex * 0.5;
var dificultad = 4;
var formas = [];
var lugares = [];
var original = {x:0,y:0,pieza: null};
var solucion = [];

for (var i = 0; i < dificultad; i++) {
  solucion[i]=false;
}

$(".jugar").on("click", function(){
  $(".dificultad").slideDown();
})

$(".facil").on("click", function(){
  dificultad=4;
  cargar();
  $(".empezar").slideUp();
  $(".termino").slideUp();
})

$(".medio").on("click", function(){
  dificultad=5;
  cargar();
  $(".empezar").slideUp();
  $(".termino").slideUp();
})

$(".dificil").on("click", function(){
  dificultad=6;
  cargar();
  $(".empezar").slideUp();
  $(".termino").slideUp();
})





//
$(".cronometro").css("display","none");
$("#canvas").css("display","none");



function cargar(){
  tablero();
  cronometro();
  llenartablero();
  llenarpiezas();
  $(".dificultad").slideUp();
}




function actualizar(){
  tablero();
  for (var i = 0; i < lugares.length; i++) {
    lugares[i].dibujar();
  }
  for (var i = 0; i < formas.length; i++) {
    formas[i].dibujar();
  }
}

function finalizar(){
  clock.stop();
  $("#tiempo").html("Tiempo de Resolucion: " + clock.time.time +" segundos" );
  $(".cronometro").slideUp()
  $(".termino").css("display", "block");
}




//------------------------------------------------CARGA
function llenartablero(){
  for (var i = 0; i < dificultad; i++) {
    if (i === 0) {
      var forma = new cuadrado(ex, ey*5, ladogeneral, 'black')
    }
    else if (i === 1) {
      var forma = new rectangulo(ex*3, ey*3, ladogeneral, 'black')
    }
    else if (i === 2) {
      var forma = new circulo(ex*3, ey*5, ladogeneral, 'black')
    }
    else if (i === 3) {
      var forma = new triangulo(ex, ey, ladogeneral, 'black')
    }
    else if (i === 4) {
      var forma = new rombo (ex*3, ey, ladogeneral, 'black')
    }
    else {
      var forma = new trapezoide(ex, ey*3, ladogeneral, 'black')
    }
    lugares.push(forma);
    lugares[i].dibujar();
  }
}

function llenarpiezas() {
  var a = canvas.width / 2;
  for (var i = 0; i < dificultad; i++) {
    if (i === 0) {
      var forma = new cuadrado(a + ex, ey, ladogeneral, 'white')
    }
    else if (i === 1) {
      var forma = new rectangulo(a + (ex*3), ey, ladogeneral, 'white')
    }
    else if (i === 2) {
      var forma = new circulo(a + ex, ey*3, ladogeneral, 'white')
    }
    else if (i === 3) {
      var forma = new triangulo(a + (ex*3), ey*3, ladogeneral, 'white')
    }
    else if (i === 4) {
      var forma = new rombo(a + ex, ey*5, ladogeneral, 'white')
    }
    else {
      var forma = new trapezoide(a + (ex*3), ey*5, ladogeneral, 'white')
    }
    formas.push(forma);
    formas[i].dibujar();
  }
}


//------------------------------------------------CLASES

function cuadrado(x, y, rad, col){
  this.forma = 'cuadrado';
  this.posx = x;
  this.posy = y;
  this.radio = rad;
  this.color = col;
}

function rectangulo(x, y, rad, col){
  this.forma = 'rectangulo';
  this.posx = x;
  this.posy = y;
  this.radio = rad;
  this.color = col;
}

function circulo(x, y, rad, col){
  this.forma = 'circulo';
  this.posx = x;
  this.posy = y;
  this.radio = rad;
  this.color = col;
}

function triangulo(x, y, base, col){
  this.forma = 'triangulo';
  this.posx = x;
  this.posy = y;
  this.radio = base;
  this.color = col;
}

function rombo(x, y, base, col){
  this.forma = 'rombo';
  this.posx = x;
  this.posy = y;
  this.radio = base;
  this.color = col;
}

function trapezoide(x, y, base, col){
  this.forma = 'trapezoide';
  this.posx = x;
  this.posy = y;
  this.radio = base;
  this.color = col;
}



//------------------------------------------------DIBUJAR
cuadrado.prototype.dibujar = function () {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.posx - this.radio, this.posy - this.radio, this.radio*2, this.radio*2);
};

rectangulo.prototype.dibujar = function () {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.posx - this.radio, this.posy - (this.radio*0.8), this.radio*2, this.radio*1.6);
};

circulo.prototype.dibujar = function () {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.posx, this.posy, this.radio, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
};

triangulo.prototype.dibujar = function () {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(this.posx - (this.radio),this.posy + (this.radio));
  ctx.lineTo(this.posx + (this.radio), this.posy + (this.radio));
  ctx.lineTo(this.posx,this.posy - (this.radio));
  ctx.fill();
  ctx.closePath();
};

rombo.prototype.dibujar = function () {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(this.posx - (this.radio),this.posy);
  ctx.lineTo(this.posx, this.posy + (this.radio));
  ctx.lineTo(this.posx + (this.radio), this.posy);
  ctx.lineTo(this.posx,this.posy - (this.radio));
  ctx.fill();
  ctx.closePath();
};

trapezoide.prototype.dibujar = function () {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(this.posx - (this.radio),this.posy + this.radio);
  ctx.lineTo(this.posx + this.radio, this.posy + (this.radio));
  ctx.lineTo((this.posx + this.radio) + 20, this.posy - this.radio);
  ctx.lineTo((this.posx - this.radio) + 20,this.posy - (this.radio));
  ctx.lineTo(this.posx - (this.radio),this.posy + this.radio);
  ctx.fill();
  ctx.closePath();
};

function tablero(){
  var mitad = 0.5*canvas.width;
  ctx.fillStyle = 'yellow';
  ctx.fillRect(0,0,mitad,canvas.height);
  ctx.fillStyle = 'orange';
  ctx.fillRect(mitad,0,mitad,canvas.height);
}

function cronometro(){
  clock = $('.clock').FlipClock();
  $(".cronometro").slideDown()
  $("#canvas").slideDown()
}



//------------------------------------------------FUNCIONALIDAD

$("canvas").on( "mousedown", function( event ) {
  var mX= event.pageX - canvas.offsetLeft;
  var mY= event.pageY - canvas.offsetTop;
  for (var i = 0; i < formas.length; i++) {
    if ((mX > (formas[i].posx-formas[i].radio))&&(mX < (formas[i].posx+formas[i].radio))&&(mY > (formas[i].posy-formas[i].radio))&&(mY < (formas[i].posy+formas[i].radio))) {
        original.x = formas[i].posx;
        original.y = formas[i].posy;
        original.pieza = i;

    }
  }
});



$("canvas").on( "mousemove", function( event ) {
  var mX = event.pageX - canvas.offsetLeft;
  var mY = event.pageY - canvas.offsetTop;
  if (formas[original.pieza] != null) {
  formas[original.pieza].posx = mX;
    formas[original.pieza].posy = mY;
  }
  actualizar();
});


$("canvas").on( "mouseup", function( event ) {
  var mX = event.pageX - canvas.offsetLeft;
  var mY = event.pageY - canvas.offsetTop;
  for (var i = 0; i < lugares.length; i++) {
    if ((mX > (lugares[i].posx-lugares[i].radio))&&(mX < (lugares[i].posx+lugares[i].radio))&&(mY > (lugares[i].posy-lugares[i].radio))&&(mY < (lugares[i].posy+lugares[i].radio)))
      if (lugares[i].forma == formas[original.pieza].forma) {
        solucion[original.pieza]=true;
        formas[original.pieza].posx=lugares[i].posx;
        formas[original.pieza].posy=lugares[i].posy;
        original.pieza=null;
        var termino=true;
        for (var i = 0; i < solucion.length; i++) {
          if (solucion[i]==false) {
            termino=false;
          }
        }
        if (termino) {
          finalizar();
        }
        actualizar();
        return;
      }
    }
  formas[original.pieza].posx=original.x;
  formas[original.pieza].posy=original.y;
  original.pieza=null;
  actualizar();
});
