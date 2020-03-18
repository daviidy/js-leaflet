
var signature = 0;
var recup = function(element){
  return document.getElementById(element);
}
var canvasDiv = recup('canvasDiv'); 
canvas = document.createElement('canvas'); 
canvas.setAttribute('width', '500px'); 
canvas.setAttribute('height', '250px'); 
canvas.setAttribute('id', 'canvas'); 
canvasDiv.appendChild(canvas); 
if(typeof G_vmlCanvasManager != 'undefined') { 
	canvas = G_vmlCanvasManager.initElement(canvas); 
} 
context = canvas.getContext("2d");

$ ('#canvas').mousedown(function(e) { 
    var mouseX = e.pageX - this.offsetLeft; 
    var mouseY = e.pageY - this.offsetTop; 
          
    paint = true; 
    addClick(e.pageX - this.offsetLeft , e.pageY - this.offsetTop); 
    redraw(); 
});

$('#canvas').mousemove(function(e){ 
    if(paint) { 
      addClick (e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true); 
      redraw(); 
    } 
});

$ ('#canvas').mouseup(function(e){ 
    paint = false; 
});

$('#canvas').mouseleave(function(e){ 
    paint = false; 
});

var clickX = new Array (); 
var clickY = new Array (); 
var clickDrag = new Array (); 
var paint; 

function addClick (x, y, dragging) 
{ 
  clickX.push (x); 
  clickY.push (y); 
  clickDrag.push (dragging); 
}
function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // effacer le canvas
  
  context.strokeStyle = "#000";
  context.lineJoin = "round";
  context.lineWidth = 3;
  
  for(var i=0; i < clickX.length; i++) {		
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
    }else{
      context.moveTo(clickX[i]-1, clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.stroke();
  }
  signature = 1;
}
var Name = recup('Name');
var Surname = recup('Surname');
var Reserved = recup('Reserved');
var confirm = recup('confirm');
var canvas = recup('canvas');

confirm.addEventListener('click', function(e){
  e.preventDefault();
  if(signature == 1){
    recup('legend').style.color = '#FFF';
    canvas.style.borderColor = '#333';
    recup('timerContent').innerHTML = "Réservation de " + sessionStorage.getItem('surname') + ' ' + sessionStorage.getItem('name') + ' ' 
     + ' à la station ' + sessionStorage.getItem('adresse') + '<br>';
    recup('timer').style.display = 'block';
    recup('sign').style.display = 'none';
    signature = 0;
    timer();
  }else{
    canvas.style.borderColor = 'red';
    recup('legend').style.color = 'red';
  }
})
Reserved.addEventListener('click', function(e){
  if(Name.value ==="" || Surname.value ==="" || document.getElementById('adresseVelo').innerHTML==="" || document.getElementById('nombreVelos').innerHTML ==0){
    e.preventDefault();
  }
  else{
    /* INSERTION DANS L'API SESSION STORAGE */
    sessionStorage.setItem('name', Name.value);
    sessionStorage.setItem('surname', Surname.value);
    sessionStorage.setItem('adresse', document.getElementById('adresseVelo').innerHTML);
    
    Name.setAttribute('onFocus', 'this.blur()')
    Surname.setAttribute('onFocus','this.blur()')
    Reserved.style.display = 'none';
    $('#confirm').css('display','block');
  }
})

totalTimes = 1200;

var timer = function() {

  var minute = Math.floor(totalTimes / 60);
  var seconde = Math.floor(totalTimes % 60);

  recup('min').innerHTML = minute + ' Minute' + (minute > 1 ? 's' : '') 
  recup('sec').innerHTML = seconde + ' Seconde' + (seconde > 1 ? 's' : '') 
  if (totalTimes !== 0) {
      totalTimes -= 1;
      setTimeout(timer, 1000);
  }else{
    recup('timer').innerHTML = "Votre réservation a expiré ";
  }
}

