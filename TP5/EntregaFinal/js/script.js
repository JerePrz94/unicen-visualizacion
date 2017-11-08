var mnoc = false


$("#nocturno").on("click", function(){
  if (mnoc == false) {
    $("body").css("background-color", "#141d26");
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
    $(".navbar").css("background-color", "#FFF");
    $("#buscar").css("background-color", "#FFF");
    $("#buscar").css("border-color", "#ccc");
    $("#buscar").css("color", "#000");
    mnoc = false;
    $("#nocturno").css("color", "#777")
    $("#nocturno").css("font-weight", "normal")
  }

})


$("#cont").append('<a href="#"><img class="imagen" src="images/paisaje.jpg" alt=" "></a>');
$("#cont").append('<a href="#"><img class="imagen" src="images/images.jpg" alt=" "></a>');


$("#imagen").on("click", function(){
  $("#imagen").addClass("escalada");
})

// var pepe = document.getElementById('cont');

// document.onload = function(){
	// for(var n=1, n < 7, n++);
	// pepe.innerHTML = '<a href="#"><img id="n" class="imagen" src="images\paisaje.jpg" alt=""></a>';



// }
