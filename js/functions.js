// --------------------------------------------------------------
// Genera los objetos con las propiedades de cada Entrenador
// --------------------------------------------------------------

const getTrainers = () => {
    let allTrainers = []
    DUDYFIT.selectTrainers.forEach( elem => {
        let name = elem.querySelector('input[name="name"]').value
        let valoration = Number(elem.querySelector('input[name="valoration"]').value)
        let maxClients = Number(elem.querySelector('input[name="maxClients"]').value)
        maxClients > 0 ? allTrainers.push( new Trainer( name, valoration, maxClients )) : false
    })

    allTrainers.sort( ( a, b ) => b.valoration - a.valoration )

    return allTrainers
}


// --------------------------------------------------------------
// Genera los objetos con las propiedades de cada Cliente
// --------------------------------------------------------------

const getClients = () => {
    const selectClients =  document.querySelectorAll('.client')
    let allClients = []
    selectClients.forEach( elem => {
        let name = elem.querySelector('.client-name').innerText
        let reputacion = Number(elem.querySelector('.client-reputacion').innerText)
        allClients.push( new Client( name, reputacion ) )
    })

    DUDYFIT.totalClients = allClients.length
    allClients.sort( ( a, b ) => b.reputacion - a.reputacion )

    return allClients
}


// --------------------------------------------------------------
// Asignación Entrenador - Cliente
// --------------------------------------------------------------

const asignateClientsToTrainers = () => DUDYFIT.trainers.forEach( elem => elem.asignateClients())


// --------------------------------------------------------------
// Mostrar / ocultar Páginas
// --------------------------------------------------------------

const changePage = () => {
    DUDYFIT.configurationPage.classList.toggle('activeBlock')
    DUDYFIT.buttons.resultPage.classList.toggle('activeBlock')
    DUDYFIT.buttons.return.addEventListener('click', e => {
        DUDYFIT.buttons.resultPage.classList.remove('activeBlock')
        DUDYFIT.configurationPage.classList.add('activeBlock')
    })
}


// --------------------------------------------------------------
// Pinta Entrenadores con Clientes Asignados
// --------------------------------------------------------------

const paintTrainers = () => {
    let sum = 1
    DUDYFIT.trainers.forEach( trainer => {
        let allClients = ''
        trainer.clients.forEach( client => {
            allClients += '\
                <li class="card-text">'+ client.name +'</li>\
            ';
        })
        
        const trainerHTML = `\
            <div class="card text-center">\
            <div class="card-header d-flex justify-content-between">\
                <span>Entrenador ${sum}</span>\
                <span id="card-header_info${sum}" class="card-header_info">\
                    <div class="card-header_info_${sum++}">\
                        <p><span class='bold'>Valoracion</span>: <span>${trainer.valoration}</span></p>\
                        <p><span class='bold'>Max Clientes</span>: <span>${trainer.maxClients}</span></p>\                    
                    </div>\
                </span>\
            </div>\
            <div class="card-body">\
                <div class="card-body_block d-flex">\
                    <img src="./img/entrenador.jpeg" alt="">\
                    <div class="card-body_block_info text-left">\
                        <h5 id="trainer-name" class="card-title pt-2">${trainer.name}</h5>\
                        <p>Clientes asignados</p>\
                        <ul id="paintClients">${allClients}</ul>\
                    </div>\
                </div>\
            </div>\
            <div class="card-footer text-muted text-left">${trainer.clients.length} clientes asignados</div>\
        </div>`;  

        return trainer.clients.length > 0 ? DUDYFIT.trainersBlock.innerHTML += trainerHTML : false
    })
}


// --------------------------------------------------------------
// Indice Satifasción Conjunto
// --------------------------------------------------------------

const calulateIndSatis = () => {
    let satisfied = 0
    let result;
    DUDYFIT.trainers.forEach( trainer => {
        trainer.clients.forEach( client => trainer.valoration >= ( client.reputacion / 2 ) ? satisfied++ : false)
    });

    result = (100 * satisfied) / DUDYFIT.totalClients
    DUDYFIT.indiceBlock.innerText = `${result}%`

    return result
}

DUDYFIT.buttons.viewClients.addEventListener('click', () => DUDYFIT.configurationPage.classList.add('removeZindex'))
DUDYFIT.buttons.closeViewClients.addEventListener('click', () => DUDYFIT.configurationPage.classList.remove('removeZindex'))


// --------------------------------------------------------------
// Mesaje Clientes sin entrenador 
// --------------------------------------------------------------
const clientsNoTrainer = () => {
    if( DUDYFIT.clients.length > 0 ) {
        DUDYFIT.validaConjuntoBlock.style.display = 'block'; 
        document.querySelector('.message-overClients span').innerText = DUDYFIT.clients.length
    }
}

