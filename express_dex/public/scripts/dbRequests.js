current = {
    name: ''
}


// envia uma requisição à API Node, que comunica com o Banco de Dados
async function capture() {
    const capture = currentRequest()
    console.log(capture)
    if(capture) { 
        // Desativa o botão para evitar capturar duas vezes o mesmo monstro
        disableButton()
        const headers = new Headers({
            // importante para a interpretação da requisição
            "Content-Type": "application/json" 
        })
        await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(capture)
        })
        newRequest()
        userThrowsLeft = subCapture(current.name)
        return userThrowsLeft
    }
    else
        return console.log('empty')
}

function disableButton() {
    document.getElementById('capture_btn').disabled = true
}

// envia uma requisição de registro de treinador ao banco de dados
// e ao mesmo tempo uma requisição ao Python, para controlar o limite
// de tentativas que o usuário pode fazer (WIP)
async function newTrainer(id) {
    console.log(id)
    current.name = id
    const headers = new Headers({
        "Content-Type": "application/json"
    })
    console.log('preparing to fetch towards '+API_URL+id)
    await fetch(API_URL+id, {
        method: 'POST',
        headers: headers
    })
    newPyTrainer(id)
    return console.log('end of :id post method for '+id);
}

function clearFields(capture) {
    document.getElementById('sprite').src = "/assets/pokeball.gif"
    for(field in capture)
        document.getElementById(field).innerHTML = ''
        currentRequest('')
}

function currentRequest(req) {
    if(arguments.length === 0) {
        return currentRequest.Data
    }
    else {
        currentRequest.Data = req
    }
}
