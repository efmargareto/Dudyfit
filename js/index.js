// --------------------------------------------------------------
// Objeto Configuración
// --------------------------------------------------------------

DUDYFIT = {
    trainers: [],
    clients: [],
    configurationPage: document.querySelector('#configuration'),
    trainersBlock: document.querySelector('#nav-entrenadores-block'),
    indiceBlock: document.querySelector('#indice'),
    buttons: {
        resultPage: document.querySelector('#result'),
        return: document.querySelector('#back'),
        calculate: document.getElementById('calculate'),
        viewClients: document.getElementById('viewClients'),
        closeViewClients: document.getElementById('closeViewClients'),
    },
    selectTrainers: document.querySelectorAll('.trainer-block_info'),
    validaConjuntoBlock: document.getElementById("validaConjunto-block_info")
}


// --------------------------------------------------------------
// Flujo de ejecución
// --------------------------------------------------------------

DUDYFIT.buttons.calculate.addEventListener('click', () => {
    DUDYFIT.trainers = getTrainers()
    DUDYFIT.clients = getClients()
    asignateClientsToTrainers()
    changePage()
    paintTrainers()
    clientsNoTrainer()
    calulateIndSatis()
})

DUDYFIT.buttons.return.addEventListener('click', () => {
    DUDYFIT.trainers = []
    DUDYFIT.clients = []
    DUDYFIT.trainersBlock.innerHTML = ''
    DUDYFIT.validaConjuntoBlock.style.display = 'none'; 
})












