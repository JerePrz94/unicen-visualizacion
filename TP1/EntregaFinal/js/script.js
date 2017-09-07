//VARIABLES
var imagen = new Image();
var scr;
var ctx;


//ASINACION DE FUNCIONES
$("#imagen").on("change", fuente);
$("#grises").on("click", grises);
$("#sepia").on("click", sepia);
$("#byn").on("click", byn);
$("#brillo").on("click", brillo);
$("#negativo").on("click", negativo);
$("#contraste").on("click", contraste);
$("#blur").on("click", blur);
$("#bordes").on("click", bordes);


//FUNCIONES

//Cargar-imagen
function fuente()
{
  orig = document.getElementById("imagen").files[0],
  url=window.URL || window.webkitURL,
  src = url.createObjectURL(orig);
  cargarimagen();
}

function cargarimagen(){
  $("#doriginal").remove();
  $("#dresultado").remove();
  $("#descargar").remove();
  $("#imagen").remove();
  $("#boton").remove();
  imagen.src = src;
  imagen.onload = function(){
    width = 500;
    height = (imagen.height*width)/imagen.width;
    var original = '<canvas id="original" width="500" height="'+height+'"></canvas>';
    var resultado = '<canvas id="resultado" width="500" height="'+height+'"></canvas>';
    var descargar = '<a id="descargar" href="#"class="botonarchivo"><span class="glyphicon glyphicon-download-alt"></span>DESCARGAR IMAGEN</a>'
    var muestra = '<div class="col-xs-6 fotos" id="doriginal"><h2>Original:</h2><label for="imagen" class="botonarchivo" id="boton"><span class="glyphicon glyphicon-open"></span>SELECCIONAR IMAGEN</label><input type="file" name="" value="" id="imagen"></div><div class="col-xs-6 fotos " id="dresultado"><h2>Resultado:</h2></div>'
    $("#fotos").append(muestra);
    $("#doriginal").append(original);
    $("#dresultado").append(descargar);
    $("#dresultado").append(resultado);
    document.getElementById('imagen').addEventListener("change", fuente);
    document.getElementById('descargar').addEventListener('click', function() {
      download(this, 'resultado', 'Resultado.png');
    }, false);

    var c=document.getElementById("original");
    ctx=c.getContext("2d");
    ctx.drawImage(this, 0, 0, width, height);
    c=document.getElementById("resultado");
    editada=c.getContext("2d");
  }
}

//descargar imagen
function download(link, canvasId, filename) {
  link.href = document.getElementById(canvasId).toDataURL();
  link.download = filename;
}

//
function pintar(imageData, x, y, r, g, b){
  index = (x + y * imageData.width) * 4;
  imageData.data[index] = r;
  imageData.data[index+1] = g;
  imageData.data[index+2] = b;
}

//
function calcularLimite(valor){
  if (valor<0) {
    return 0;
  }
  else if (valor>255) {
    return 255;
  }
  else {
    return valor;
  }
}


//FILTROS

//grises
function grises(){
  imageData = ctx.getImageData(0, 0, width, height);
  for (x=0; x < width; x++){
    for (y=0; y < height; y++){
      r=imageData.data[(x+y*imageData.width) * 4];
      g=imageData.data[((x+y*imageData.width) * 4)+1];
      b= imageData.data[((x+y*imageData.width) * 4)+2];
      prom = (r+g+b)/3;
      pintar(imageData, x, y, prom, prom, prom);
    }
  }
  editada.putImageData(imageData, 0, 0);
}


//sepia
function sepia(){
  imageData = ctx.getImageData(0, 0, width, height);
  for (x=0; x < width; x++){
    for (y=0; y < height; y++){
      r=imageData.data[(x+y*imageData.width) * 4];
      g=imageData.data[((x+y*imageData.width) * 4)+1];
      b= imageData.data[((x+y*imageData.width) * 4)+2];
      rojo = (r * .393) + (g *.769) + (b * .189);
      rojo = calcularLimite(rojo);
      verde = (r * .349) + (g *.686) + (b * .168);
      verde = calcularLimite(verde);
      azul = (r * .272) + (g *.534) + (b * .131);
      azul = calcularLimite(azul);
      pintar(imageData, x, y, rojo, verde, azul);
    }
  }
  editada.putImageData(imageData, 0, 0);
}

//blanco y negro
function byn(){
  imageData = ctx.getImageData(0, 0, width, height);
  for (x=0; x < width; x++){
    for (y=0; y < height; y++){
      r=imageData.data[(x+y*imageData.width) * 4];
      g=imageData.data[((x+y*imageData.width) * 4)+1];
      b= imageData.data[((x+y*imageData.width) * 4)+2];
      prom = (r+g+b)/3;
      if (prom/2 >= 50) {
        prom = 255;
      }
      else {
        prom = 0;
      }
      pintar(imageData, x, y, prom, prom, prom);
    }
  }
  editada.putImageData(imageData, 0, 0);
}

//brillo
function brillo(){
  imageData = ctx.getImageData(0, 0, width, height);
  for (x=0; x < width; x++){
    for (y=0; y < height; y++){
      r=imageData.data[(x+y*imageData.width) * 4];
      g=imageData.data[((x+y*imageData.width) * 4)+1];
      b= imageData.data[((x+y*imageData.width) * 4)+2];
      rojo = r+50;
      rojo = calcularLimite(rojo);
      verde = g+50;
      verde = calcularLimite(verde);
      azul = b+50;
      azul = calcularLimite(azul);
      pintar(imageData, x, y, rojo, verde, azul);
    }
  }
  editada.putImageData(imageData, 0, 0);
}

//negativo
function negativo(){
  imageData = ctx.getImageData(0, 0, width, height);
  for (x=0; x < width; x++){
    for (y=0; y < height; y++){
      r=imageData.data[(x+y*imageData.width) * 4];
      g=imageData.data[((x+y*imageData.width) * 4)+1];
      b= imageData.data[((x+y*imageData.width) * 4)+2];
      rojo = 255-r;
      verde = 255-g;
      azul = 255-b;
      pintar(imageData, x, y, rojo, verde, azul);
    }
  }
  editada.putImageData(imageData, 0, 0);
}

//contraste
function contraste(){
  imageData = ctx.getImageData(0, 0, width, height);
  for (x=0; x < width; x++){
    for (y=0; y < height; y++){
      var contra = 1.5;
      index = (x + y * imageData.width) * 4;
      r=contra*(imageData.data[(x+y*imageData.width) * 4]-128)+128;
      g=contra*(imageData.data[((x+y*imageData.width) * 4)+1]-128)+128;
      b=contra*(imageData.data[((x+y*imageData.width) * 4)+2]-128)+128;
      pintar(imageData, x, y, r, g, b);
    }
  }
  editada.putImageData(imageData, 0, 0);
}

//blur
function blur(){
  imageData = ctx.getImageData(0,0,width,height);
  px = imageData.data;
  matriz = new Uint8ClampedArray(px.length);
  matriz.set(px);
  for (i=0; i<px.length; i++) {
     if (i % 4 === 3) {
       continue;
     }
     px[i] = ( matriz[i]
        + (matriz[i - 8] || matriz[i])
        + (matriz[i + 8] || matriz[i])
        + (matriz[i - 8 * width] || matriz[i])
        + (matriz[i + 8 * width] || matriz[i])
        + (matriz[i - 8 * width - 8] || matriz[i])
        + (matriz[i + 8 * width + 8] || matriz[i])
        + (matriz[i + 8 * width - 8] || matriz[i])
        + (matriz[i - 8 * width + 8] || matriz[i])
        )/9;
  }
  editada.putImageData(imageData,0,0);
}

//deteccion de bordes
function bordes(){
  imput = ctx.getImageData(0,0,width,height);
  output = ctx.getImageData(0,0,width,height);
  var imputdata = imput.data;
  var outputdata = output.data;
  for (x=1; x < width-1; x++){
    for (y=1; y < height-1; y++){
      for (c=0; c < 3; c++){
        var i = ((y * width + x)*4 + c);
        outputdata[i] = (127 +
          - imputdata[i - width*4 - 4]
          - imputdata[i - width*4]
          - imputdata[i - width*4 + 4]
          - imputdata[i - 4]
          + 8*imputdata[i]
          - imputdata[i + 4]
          - imputdata[i + width*4 - 4]
          - imputdata[i + width*4]
          - imputdata[i + width*4 + 4]
        );
      }
      outputdata[((y * width + x)*4 + 3)] = 255;
    }
  }
  editada.putImageData(output,0,0);
}
