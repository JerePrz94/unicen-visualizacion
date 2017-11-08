var mnoc = false

// Modo Nocturno
$("#nocturno").on("click", function(){
  if (mnoc == false) {
    $("body").css("background-color", "#141d26");
    $("body").css("color", "#FFF");
    $(".navbar").css("background-color", "#243447");
    $("#buscar").css("background-color", "#182430");
    $("#buscar").css("border-color", "#141d26");
    $("#buscar").css("color", "#FFF");
    mnoc = true;
    $("#nocturno").css("color", "#3A9CF2")
    $("#nocturno").css("font-weight", "bold")
  }
  else {
    $("body").css("background-color", "#e6ecf0");
    $("body").css("color", "#333");
    $(".navbar").css("background-color", "#FFF");
    $("#buscar").css("background-color", "#FFF");
    $("#buscar").css("border-color", "#ccc");
    $("#buscar").css("color", "#000");
    mnoc = false;
    $("#nocturno").css("color", "#777")
    $("#nocturno").css("font-weight", "normal")
  }
})

// $(".dimageng").hover(function(){
//   $(".dimageng"). <h3><span class="glyphicon glyphicon-heart"></span>27</h3>
// })
