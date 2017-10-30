var arriba = 38;
var abajo = 40;
var derecha = 39;
var atacar = 65;
var empezo = false;
var facaso = new Audio('sounds/facaso.wav');
var salto = new Audio('sounds/salto.wav');
var roberd = new Audio('sounds/roberd.mp3');

/*asignar funciones a las teclas*/
$(document).keydown(function(e){
  if (e.keyCode === 39) {
    empezo = true;
    $(".capa2").addClass("capa2a");
    $(".capa3").addClass("capa3a");
    $(".capa4").addClass("capa4a");
    $(".capa5").addClass("capa5a");
    $(".personaje").removeClass("quieto");
    $(".personaje").addClass("correr");

    var enemigo = setInterval(function(){
      if (empezo) {
        var tenemigo = Math.floor(Math.random()*2);
        if (tenemigo == 0 ) {
          $(".capa4").append('<div class="roberc"><div class="robertito"></div></div>');
          $(".roberc").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
          function(e) {
            $(this).remove();
          });
        }
        else if (tenemigo == 1) {
          $(".capa4").append('<div class="cactus"></div>');
          $(".cactus").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
          function(e) {
            $(this).remove();
          });
        }
      }
    } ,5000);
  }

  else if (e.keyCode === 38 && !($(".personaje").hasClass("quieto")) && !($(".personaje").hasClass("atacar")) && !($(".personaje").hasClass("morir"))) {
    $(".personaje").removeClass("correr");
    $(".personaje").addClass("saltar");
    $(".personaje").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
    function(e) {
      salto.play();
      $(".personaje").removeClass("saltar");
      $(".personaje").addClass("correr");
    });
  }
  else if (e.keyCode === 37 && !($(".personaje").hasClass("saltar")) && !($(".personaje").hasClass("quieto")) && !($(".personaje").hasClass("morir"))) {
    $(".personaje").removeClass("correr");
    $(".personaje").addClass("atacar");
    facaso.play();
    $(".personaje").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
    function(e) {
      $(".personaje").removeClass("atacar");
      $(".personaje").addClass("correr");
    });
  }
  else if (e.keyCode === 40 && !($(".personaje").hasClass("saltar")) && !($(".personaje").hasClass("quieto")) && !($(".personaje").hasClass("morir"))) {
    $(".personaje").removeClass("correr");
    $(".personaje").addClass("deslizar");
    $(".personaje").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
    function(e) {
      $(".personaje").removeClass("deslizar");
      $(".personaje").addClass("correr");
    });
  }
})



var enemigoe = setInterval(function(){
  var cactusotes = $(".cactus");
  var robertitos = $(".roberc");
  var encuentro = (($(".personaje").offset().left)+($(".personaje").width()));
  for (var i = 0; i < cactusotes.length; i++) {
    var cactuse = $(cactusotes[i]).offset().left;
    if (cactuse <= encuentro){
      if (!($(".personaje").hasClass("saltar"))){
        $(".personaje").removeClass("correr");
        $(".personaje").addClass("morir");
        $(".personaje").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function(e) {
          $(".personaje").removeClass("morir");
          $(".personaje").addClass("correr");
        });
      }
    }
  }
  for (var i = 0; i < robertitos.length; i++) {
    var robere = $(robertitos[i]).offset().left;
    if (robere <= encuentro){
      if (!($(".personaje").hasClass("saltar"))){
        if ($(".personaje").hasClass("atacar")){
          roberd.play();
          $(".robertito").addClass("roberm");
          $(".robertito").removeClass("robertito");
        }
        if ((!($(".personaje").hasClass("atacar"))) && ($(".roberm").length == 0)){
          $(".personaje").removeClass("correr");
          $(".personaje").addClass("morir");
        }
      }
    }
  }
}, 100);














/*cargar imagenes
$(".cargador").addClass("correr");
$(".cargador").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
function(e) {
  $(".cargador").removeClass("correr");
  $(".cargador").addClass("saltar");
});
$(".cargador").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
function(e) {
  $(".cargador").removeClass("saltar");
  $(".cargador").addClass("atacar");
});
$(".cargador").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
function(e) {
  $(".cargador").removeClass("atacar");
  $(".cargador").addClass("deslizar");
});
$(".cargador").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
function(e) {
  $(".cargador").removeClass("deslizar");
  $(".cargador").addClass("morir");
});
*/
