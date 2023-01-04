window.addEventListener("load", (e) => {

    let endpoint = document.getElementById("url");
    let metodo = document.getElementById("metodo");
    let body = document.getElementById("body");
    let formulario = document.getElementById("form");

    formulario.addEventListener('submit', event => {
        event.preventDefault();
        let texto = document.getElementById("resultado");
        if (validarEndp(endpoint.value)===true & validarBody(body.value)===true & validarMet(metodo.value)===true){
            texto.innerHTML=`<div>
                    <p>{status: 201;</p>
                    <p>ID: 20252}</p>
                </div>
                <p class="resultadoB">¡LO LOGRASTE! Usaste una API</p>`
        } else {
            texto.innerHTML=`<div>
                    <p>{status: 400;</p>
                    <p>message: error de datos}</p>
                </div>
                <p class="resultadoM">Revisá la documentación, algo escribiste mal</p>`
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