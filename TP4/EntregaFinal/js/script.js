var arriba = 38;
var abajo = 40;
var derecha = 39;
var atacar = 65;

/*asignar funciones a las teclas*/
$(document).keydown(function(e){
  if (e.keyCode === 39) {
    $(".capa2").addClass("capa2a");
    $(".capa3").addClass("capa3a");
    $(".capa4").addClass("capa4a");
    $(".capa5").addClass("capa5a");
    $(".personaje").removeClass("quieto");
    $(".personaje").addClass("correr");
  }
  else if (e.keyCode === 38 && !($(".personaje").hasClass("quieto")) && !($(".personaje").hasClass("atacar")) && !($(".personaje").hasClass("morir"))) {
    $(".personaje").removeClass("correr");
    $(".personaje").addClass("saltar");
    $(".personaje").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
    function(e) {
      $(".personaje").removeClass("saltar");
      $(".personaje").addClass("correr");
    });
  }
  else if (e.keyCode === 65 && !($(".personaje").hasClass("saltar")) && !($(".personaje").hasClass("quieto")) && !($(".personaje").hasClass("morir"))) {
    $(".personaje").removeClass("correr");
    $(".personaje").addClass("atacar");
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
