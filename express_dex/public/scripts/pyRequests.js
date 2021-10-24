
async function newRequest() {
    try {
        document.getElementById('sprite').src = "/assets/loading.png"
        const response = await fetch(PY_URL);
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

function updateFields(data) {
    for(let field in data) {
        if (field == 'sprite') {
            document.getElementById(field).src = data[field]
        } else {
            document.getElementById(field).innerHTML = data[field]
        }
    }
}
