
async function capture() {
    const capture = currentRequest()
    console.log(capture)
    if(capture) { 
        disableButton()
        const headers = new Headers({
            "Content-Type": "application/json" // importante
        })
        await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(capture)
        })
        // clearFields(capture)
        newRequest()
        return console.log('ok')
    }
    else
        return console.log('empty')
}

function disableButton() {
    document.getElementById('capture_btn').disabled = true
}

async function newTrainer(id) {
    console.log(id)
    const headers = new Headers({
        "Content-Type": "application/json"
    })
    console.log('preparing to fetch towards '+API_URL+'/'+id)
    await fetch(API_URL+id, {
        method: 'POST',
        headers: headers
    })
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
