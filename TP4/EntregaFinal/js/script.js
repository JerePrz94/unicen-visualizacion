var empezo = false;
var jugando = false;
var facaso = new Audio('sounds/facaso.wav');
var salto = new Audio('sounds/salto.wav');
var roberd = new Audio('sounds/roberd.mp3');
var vidas = 3;
var enemigo;
var enemigoe;
var puntos = 0;
var mjuego = false;






/*asignar funciones a las teclas*/
$(document).keydown(function(e){
  if (mjuego) {
    if ((e.keyCode === 39) && (empezo == false)) {
      jugar();
    }
    else if (e.keyCode === 38 && !($(".personaje").hasClass("quieto")) && !($(".personaje").hasClass("atacar")) && !($(".personaje").hasClass("morir")) && (jugando == true)) {
      $(".personaje").removeClass("correr");
      $(".personaje").addClass("saltar");
      $(".personaje").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
      function(e) {
        if (vidas > 0) {
          salto.play()
          $(".personaje").removeClass("saltar");
          $(".personaje").addClass("correr");
        }
      });
    }
    else if (e.keyCode === 37 && !($(".personaje").hasClass("saltar")) && !($(".personaje").hasClass("quieto")) && !($(".personaje").hasClass("morir")) && (jugando == true)) {
      $(".personaje").removeClass("correr");
      $(".personaje").addClass("atacar");
      facaso.play();
      $(".personaje").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
      function(e) {
        if (vidas > 0) {
          $(".personaje").removeClass("atacar");
          $(".personaje").addClass("correr");
        }
      });
    }
    else if (e.keyCode === 40 && !($(".personaje").hasClass("saltar")) && !($(".personaje").hasClass("quieto")) && !($(".personaje").hasClass("morir")) && (jugando == true)) {
      $(".personaje").removeClass("correr");
      $(".personaje").addClass("deslizar");
      $(".personaje").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
      function(e) {
        if (vidas > 0) {
          $(".personaje").removeClass("deslizar");
          $(".personaje").addClass("correr");
        }
      });
    }
  }
})


function jugar(){
  empezo = true;
  jugando = true;
  $(".capa2").addClass("capa2a");
  $(".capa3").addClass("capa3a");
  $(".capa4").addClass("capa4a");
  $(".capa5").addClass("capa5a");
  $(".personaje").removeClass("quieto");
  $(".personaje").addClass("correr");

  enemigo = setInterval(function(){
    if (empezo) {
      var tenemigo = Math.floor(Math.random()*2);
      if (tenemigo == 0 ) {
        $(".capa4").append('<div class="roberc"><div class="robertito marc"></div></div>');
        $(".roberc").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function(e) {
          $(this).remove();
        });
      }
      else if (tenemigo == 1) {
        $(".capa4").append('<div class="cactus marc"></div>');
        $(".cactus").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function(e) {
          $(this).remove();
        });
      }
    }
  } ,2000);

  enemigoe = setInterval(function(){
    var cactusotes = $(".cactus");
    var robertitos = $(".robertito");
    var encuentro = (($(".personaje").offset().left)+($(".personaje").width()));
    for (var i = 0; i < cactusotes.length; i++) {
      var cactuse = $(cactusotes[i]).offset().left;
      if (cactuse <= encuentro){
        if (($(".personaje").hasClass("correr")) || ($(".personaje").hasClass("atacar"))) {
          morir();
        }
        else if ($(".personaje").hasClass("saltar")) {
          if ($(cactusotes[i]).hasClass("marc")) {
            puntos = puntos + 50;
            mostrarpuntos();
            $(cactusotes[i]).removeClass("marc");
          }
        }
      }
    }
    for (var i = 0; i < robertitos.length; i++) {
      var robera = robertitos[i];
      var robere = $(robertitos[i]).offset().left;
      if (robere <= encuentro){
        if (!($(".personaje").hasClass("saltar"))){
          if ($(".personaje").hasClass("atacar")){
            roberd.play();
            $(robera).addClass("roberm");
            $(robera).removeClass("robertito");
            if ($(robertitos[i]).hasClass("marc")) {
              puntos = puntos + 100;
              mostrarpuntos();
              $(robertitos[i]).removeClass("marc");
            }
          }
          if ((!($(".personaje").hasClass("atacar"))) && ($(".roberm").length == 0)){
            morir();
          }
        }
        else if ($(".personaje").hasClass("saltar")) {
          if ($(robertitos[i]).hasClass("marc")) {
            puntos = puntos + 50;
            mostrarpuntos();
            $(robertitos[i]).removeClass("marc");
          }
        }
      }
    }
  }, 100);
}


function terminar (){
  $(".personaje").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
  function(e) {
    jugando = false;
    $(".personaje").removeClass("morir");
    $(".personaje").css({  "background": "url('sprites/Dead (10).png')",
    "left": "0px",
    "background-size": "100% auto" });
  });
  $(".capa2").removeClass("capa2a");
  $(".capa3").removeClass("capa3a");
  $(".capa4").removeClass("capa4a");
  $(".capa5").removeClass("capa5a");
  $("#puntos").html("Puntaje: " + puntos +" puntos" );
  $(".termino").css("display", "block");
}

function empezar(){
  $(".personaje").addClass("quieto");
  empezo = false;
  puntos = 0;
  vidas = 3;
}

function morir(){
  $(".personaje").removeClass("correr");
  $(".personaje").removeClass("atacar");
  $(".personaje").addClass("morir");
  clearInterval(enemigoe);
  clearInterval(enemigo);
  vidas --;
  mostrarvidas();
  if (vidas == 0) {
    terminar();
  }
  else if (vidas > 0) {
    $(".personaje").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
    function(e) {
      $(".personaje").removeClass("morir");
      $(".personaje").addClass("correr");
      jugar();
    });
  }
}

function reiniciar(){
  $(".personaje").removeClass("morir");
  $(".personaje").removeClass("correr");
  $(".personaje").removeClass("saltar");
  $(".personaje").removeClass("deslizar");
  $(".personaje").removeClass("atacar");
  $(".personaje").addClass("quieto");
  $(".termino").css("display", "none");
  empezar();
  mostrarvidas();
  mostrarpuntos()
}

function mostrarpuntos(){
  $(".puntaje").html("Puntos= " + puntos);
}

function mostrarvidas(){
  $(".vidas").html("Vidas= " + vidas);
}

$("#controles").on("click", function(){
  $(".controles").slideDown();
})

$("#cerrar").on("click", function(){
  $(".controles").slideUp();
})

$("#jugar").on("click", function(){
  $(".juego").slideDown();
  $(".presentacion").slideUp();
  mjuego = true;
})

$("#reiniciar").on("click", function(){
  reiniciar();
})

$("#principal").on("click", function(){
  reiniciar();
  mjuego = false;
  $(".presentacion").slideDown();
  $(".juego").slideUp();
})
