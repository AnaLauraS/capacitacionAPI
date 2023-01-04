window.addEventListener("load", () => {
//-----------Var Inits--------------
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// cx = ctx.canvas.width / 2;
// cy = ctx.canvas.height / 2;

let confetti = [];
const confettiCount = 300;
const gravity = 0.5;
const terminalVelocity = 5;
const drag = 0.075;
const colors = [
{ front: 'red', back: 'darkred' },
{ front: 'green', back: 'darkgreen' },
{ front: 'blue', back: 'darkblue' },
{ front: 'yellow', back: 'darkyellow' },
{ front: 'orange', back: 'darkorange' },
{ front: 'pink', back: 'darkpink' },
{ front: 'purple', back: 'darkpurple' },
{ front: 'turquoise', back: 'darkturquoise' }];


//-----------Functions--------------
resizeCanvas = () => {
  canvas.width = window.innerWidth*0.95;
  canvas.height = window.innerHeight*1.37;
  cx = ctx.canvas.width / 2;
  cy = ctx.canvas.height / 2;
};

randomRange = (min, max) => Math.random() * (max - min) + min;

function initConfetti ()  {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      color: colors[Math.floor(randomRange(0, colors.length))],
      dimensions: {
        x: randomRange(10, 20),
        y: randomRange(10, 30) },

      position: {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1 },

      rotation: randomRange(0, 2 * Math.PI),
      scale: {
        x: 1,
        y: 1 },

      velocity: {
        x: randomRange(-25, 25),
        y: randomRange(0, -50) } });
  }
};

//---------Render-----------
function render  ()  {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((confetto, index) => {
    let width = confetto.dimensions.x * confetto.scale.x;
    let height = confetto.dimensions.y * confetto.scale.y;

    // Move canvas to position and rotate
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);

    // Apply forces to velocity
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
    confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

    // Set position
    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;

    // Delete confetti when out of frame
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

    // Loop confetto x position
    if (confetto.position.x > canvas.width) confetto.position.x = 0;
    if (confetto.position.x < 0) confetto.position.x = canvas.width;

    // Spin confetto by scaling y
    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

    // Draw confetti
    ctx.fillRect(-width / 2, -height / 2, width, height);

    // Reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  // Fire off another round of confetti
  //if (confetti.length <= 1) initConfetti();

  window.requestAnimationFrame(render);
};

//---------Execution--------
function ejecutar() {
	initConfetti();
	resizeCanvas();
	render();
}

//----------Resize----------
window.addEventListener('resize', function () {
  resizeCanvas();
});

//------------Click------------
let endpoint = document.getElementById("url");
let metodo = document.getElementById("metodo");
let body = document.getElementById("body");
let formulario = document.getElementById("form");

formulario.addEventListener('submit', event => {
	event.preventDefault();
	if (validarEndp(endpoint.value)===true & validarBody(body.value)===true & validarMet(metodo.value)===true){
		ejecutar();
	}
});

function validarEndp (valor) {
	if (valor.toLowerCase()==="service_now/crear_ticket/sap"||valor.toLowerCase()==="service_now/crear_ticket/ec"||valor.toLowerCase()==="service_now/crear_ticket/sn"){
		return true
	} else {
		return false
	}
}

function validarMet (valor) {
	if (valor==="post"){
		return true
	} else {
		return false
	}
}

function validarBody (valor) {
	if (valor.toLowerCase().includes("autor:")&valor.toLowerCase().includes("titulo:")&valor.toLowerCase().includes("descripcion:")){
		if(valor.toLowerCase().includes("prioridad:")){
			if(valor.toLowerCase().includes("prioridad:1") | valor.toLowerCase().includes("prioridad: 1") | valor.toLowerCase().includes("prioridad:2") | valor.toLowerCase().includes("prioridad: 2") | valor.toLowerCase().includes("prioridad:3") | valor.toLowerCase().includes("prioridad: 3")) {
				return true
			} else {
				return false
			}
		} else {
			return true
		}
	} else {
		return false
	}
}

})