const newReq = "/api/random_encounter"
const newTrn = "/api/trainer"
const newCnf = "/api/config"
const newCpt = "/api/subtract"


// obtém um novo Pokemon vindo do python, chama as funções
// necessarias para mostrar as informações no html
async function newRequest() {
    try {
        document.getElementById('sprite').src = "/assets/loading.png"
        const response = await fetch(PY_URL+newReq);
        const data = await response.json();
        currentRequest(data);
        updateFields(data);
        enableButton()
    } catch (err) {
        return alert(err + ' :(');
    }
}

function enableButton() {
    document.getElementById('capture_btn').disabled = false
}

// registra o treinador no Python, válido durante a seção
function newPyTrainer(name) {
    const headers = new Headers({
        "Content-Type": "application/json"
    })
    fetch(PY_URL+newTrn, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ name })
    })
    return 'ok newtrainer'
}

// subtrai um do máximo de capturas possíveis
function subCapture(name) {
    const headers = new Headers({
        "Content-Type": "application/json"
    })
    const response = fetch(PY_URL+newCpt, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ name })
    })
    return response
}

// altera o limite de tentaivas dos jogadores da seção (WIP)
function newConfig(data) {
    const headers = new Headers ({
        "Content-Type": "application/json"
    })
    fetch(PY_URL+newCnf, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ data })
    })
    return 'ok config'
}

// preenche os campos do html com os dados do monstro vindo do Python
function updateFields(data) {
    for(let field in data) {
        if (field == 'sprite') {
            document.getElementById(field).src = data[field]
        } else {
            document.getElementById(field).innerHTML = data[field]
        }
    }
    if ((document.getElementById('Shiny').innerHTML)=='true')
        document.getElementById('Shiny').innerHTML = 'Shiny'
    else
        document.getElementById('Shiny').innerHTML = ''
    if ((document.getElementById('Legendary').innerHTML)=='true')
        document.getElementById('Legendary').innerHTML = 'Lendário'
    else
        document.getElementById('Legendary').innerHTML = ''
}
