const vistaGrilla = 1;
var mnoc = false;
var modVista = vistaGrilla;
var imagenes = [];

// ---- API ----
var cb = new Codebird;
cb.setConsumerKey("4CJBqbebmf9IVwWBPG10qQD1q", "WL3dxEK9CEwqAeLzqfrI6L22rVCwBLKJahUnMocBVY2qStym25");
cb.setToken("133798046-DvVwEcndjz3fKvEbnsIl2drgWxT2HX9mIhb2Kt11", "BOTqVdG18y5ZLjNc9DRI9dgmN1K7f6Ew2ZHC4r3a2zyCf");
// cb.setProxy("https://cb-proxy.herokuapp.com/");

var params = {
    q: "#Tandil",
    result_type: "mixed",
    count: 100
};
cb.__call(
    "search_tweets",
    params,
    function (reply) {
      console.log(reply.httpstatus);
      var tweets = reply.statuses;
      console.log(tweets);
      for (var i = 0; i < tweets.length; i++) {
        if (tweets[i].extended_entities){
          if (tweets[i].extended_entities.media.length > 1) {
            for (var n = 0; n < tweets[i].extended_entities.media.length; n++) {
              if (tweets[i].extended_entities.media[n].type == "photo") {
                var imagen = {
                  url: tweets[i].extended_entities.media[n].media_url,
                  likes: tweets[i].favorite_count,
                  user: tweets[i].user.name,
                  text: tweets[i].text
                };
                imagenes.push(imagen);
              }
            }
          }else if (tweets[i].extended_entities.media[0].type == "photo") {
            var imagen = {
              url: tweets[i].extended_entities.media[0].media_url,
              likes: tweets[i].favorite_count,
              user: tweets[i].user.name,
              text: tweets[i].text
            };
            imagenes.push(imagen);
          }
        }
      }
      console.log(imagenes);
      cargarImagenesGrilla();
      cargarImagenes();
    },
    true // this parameter required
);

// ---- Carga las imagenes en la pag ----
var lista = document.getElementById('lista');
var carrousel = document.getElementById('carrousel');
function cargarImagenes(){
  for (var i = 0; i < imagenes.length; i++) {
    var imgList = document.createElement('img');
    imgList.src = imagenes[i].url;
    imgList.id = i;
    imgList.className = (i == 0) ? "imagen-f imgSelect" : "imagen-f";
    var a = document.createElement('a');
    a.appendChild(imgList);
    lista.appendChild(a);
    var figure = document.createElement('figure');
    figure.className = (i == 0) ? "figureCar select" : "figureCar posterior";
    var divCar = document.createElement('div');
    divCar.className = "divCar";
    var imgCar = document.createElement('img');
    imgCar.src = imagenes[i].url;
    imgCar.className = "imgCar";
    var pCar = document.createElement('p');
    pCar.className = "likeCar";
    pCar.innerHTML = imagenes[i].likes;
    var spanCar = document.createElement('span');
    spanCar.className = "glyphicon glyphicon-heart";
    pCar.appendChild(spanCar);
    divCar.appendChild(imgCar);
    divCar.appendChild(pCar);
    figure.appendChild(divCar);
    carrousel.appendChild(figure);
  }
  console.log(carrousel);
}


var grilla =document.getElementById('cont');
function cargarImagenesGrilla(){
  for (var i = 0; i < imagenes.length; i++) {
    var div = document.createElement('div');
    div.className = "dimageng";
    var a = document.createElement('a');
    var img = document.createElement('img');
    img.src = imagenes[i].url;
    img.className = "imageng desvanecer";
    var h3 = document.createElement('h3');
    h3.innerHTML = imagenes[i].likes;
    var span = document.createElement('span');
    span.className = "glyphicon glyphicon-heart";
    a.appendChild(img);
    h3.appendChild(span);
    div.appendChild(a);
    div.appendChild(h3);
    grilla.appendChild(div);
  }
}

// ---- Modo Nocturno ----
$("#nocturno").on("click", function(){
  if (mnoc == false) {
    $("body").css("background-color", "#141d26");
    $("body").css("color", "#FFF");
    $(".navbar").css("background-color", "#243447");
    $("#buscar").css("background-color", "#182430");
    $("#buscar").css("border-color", "#141d26");
    $("#buscar").css("color", "#FFF");
    mnoc = true;
    $("#nocturno").css("color", "#3A9CF2");
    $("#nocturno").css("font-weight", "bold");
    $(".like-f").css("background-color", "#243447");
  }
  else {
    $("body").css("background-color", "#e6ecf0");
    $("body").css("color", "#333");
    $(".navbar").css("background-color", "#FFF");
    $("#buscar").css("background-color", "#FFF");
    $("#buscar").css("border-color", "#ccc");
    $("#buscar").css("color", "#000");
    mnoc = false;
    $("#nocturno").css("color", "#777");
    $("#nocturno").css("font-weight", "normal");
    $(".like-f").css("background-color", "#FFF");
  }
})

// ---- Cambio de Vista ----
$("#vista").on("click", function(){
  if (modVista == vistaGrilla){
    modVista = 2;
    $("#cont").addClass("desactivar");
    $("#vist2").removeClass("desactivar");
    $("#vista").addClass("glyphicon-th");
    $("#vista").removeClass("glyphicon-blackboard");
  }else if (modVista != vistaGrilla){
    modVista = vistaGrilla;
    $("#cont").removeClass("desactivar");
    $("#vist2").addClass("desactivar");
    $("#vista").addClass("glyphicon-blackboard");
    $("#vista").removeClass("glyphicon-th");
  }
});

// ---- Carousel Movimiento ----
var pos = 1;
const flechaIzq = 37;
const flechaDer = 39;
// document.addEventListener("keydown", function(e){
//   if (modVista != vistaGrilla) {
//     if (e.keyCode === flechaDer) {
//       if (carrousel.childElementCount > pos) {
//         carrousel.childNodes[pos].classList.remove('select');
//         carrousel.childNodes[pos].classList.add('anterior');
//         document.getElementById(pos-1).classList.remove('imgSelect');
//         pos ++;
//         carrousel.childNodes[pos].classList.remove('posterior');
//         carrousel.childNodes[pos].classList.add('select');
//         document.getElementById(pos-1).classList.add('imgSelect');
//       }
//     }else if (e.keyCode === flechaIzq) {
//       if (pos > 1) {
//         carrousel.childNodes[pos].classList.remove('select');
//         carrousel.childNodes[pos].classList.add('posterior');
//         document.getElementById(pos-1).classList.remove('imgSelect');
//         pos --;
//         carrousel.childNodes[pos].classList.remove('anterior');
//         carrousel.childNodes[pos].classList.add('select');
//         document.getElementById(pos-1).classList.add('imgSelect');
//       }
//     }
//   }
// });

$(document).keydown(function(e){
    if (e.keyCode === 13) {
      $(".presentacion").css("display", "none");
      $(".dentro").css("display", "block");
    }
});

// Animacion 2
document.addEventListener("keydown", function(e){
  if (modVista != vistaGrilla) {
    if (e.keyCode === flechaDer) {
      if (carrousel.childElementCount > pos) {
        carrousel.childNodes[pos].classList.remove('girarAdelante');
        carrousel.childNodes[pos].classList.add('girarAtras');
        document.getElementById(pos-1).classList.remove('imgSelect');
        pos ++;
        carrousel.childNodes[pos-1].addEventListener("transitionend", function(){
          carrousel.childNodes[pos].classList.remove('girarAtras');
          carrousel.childNodes[pos].classList.add('girarAdelante');
        });
        document.getElementById(pos-1).classList.add('imgSelect');
      }
    }else if (e.keyCode === flechaIzq) {
      if (pos > 1) {
        carrousel.childNodes[pos].classList.remove('girarAdelante');
        carrousel.childNodes[pos].classList.add('girarAtras');
        document.getElementById(pos-1).classList.remove('imgSelect');
        pos --;
        carrousel.childNodes[pos+1].addEventListener("transitionend", function(){
          carrousel.childNodes[pos].classList.remove('girarAtras');
          carrousel.childNodes[pos].classList.add('girarAdelante');
        });
        document.getElementById(pos-1).classList.add('imgSelect');
      }
    }
  }
});
