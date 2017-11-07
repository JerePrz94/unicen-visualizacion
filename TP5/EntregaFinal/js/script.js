var mnoc = false


$("#nocturno").on("click", function(){
  if (mnoc == false) {
    $("body").css("background-color", "#141d26");
    $(".navbar").css("background-color", "#243447");
    $("#buscar").css("background-color", "#182430");
    $("#buscar").css("border-color", "#141d26");
    $("#buscar").css("color", "#FFF");
    mnoc = true;
  }
  else {
    $("body").css("background-color", "#e6ecf0");
    $(".navbar").css("background-color", "#FFF");
    $("#buscar").css("background-color", "#FFF");
    $("#buscar").css("border-color", "#ccc");
    $("#buscar").css("color", "#000");
    mnoc = false;
  }

})


document.getElementsByClassName("imagen").addEventListener("oclick", function(e){
	e.src.value = "";
});