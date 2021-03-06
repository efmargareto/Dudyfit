// --------------------------------------------------------------
// Clases con propiedades: Entrenador y cliente
// --------------------------------------------------------------

class Trainer {
    constructor( name, valoration, maxClients ) {
        this.name = name
        this.valoration = valoration
        this.maxClients = maxClients
        this.clients = []
    }
    asignateClients() {
        if ( this.maxClients > 0 ) {
            DUDYFIT.clients.forEach( elem => {
                if( this.maxClients > this.clients.length ) this.clients.push(elem)
            })
            return DUDYFIT.clients.splice(0,this.maxClients);
        }
    }
}

class Client {
    constructor( name, reputacion) {
        this.name = name
        this.reputacion = reputacion
    }
}


// --------------------------------------------------------------
// Genera los objetos con las propiedades de cada Entrenador
// --------------------------------------------------------------

DUDYFIT.function.getTrainers = () => {
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

DUDYFIT.function.getClients = () => {
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
// Asignaci??n Entrenador - Cliente
// --------------------------------------------------------------

DUDYFIT.function.asignateClientsToTrainers = () => DUDYFIT.trainers.forEach( elem => elem.asignateClients())


// --------------------------------------------------------------
// Mostrar / ocultar P??ginas
// --------------------------------------------------------------

DUDYFIT.function.changePage = () => {
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

DUDYFIT.function.paintTrainers = () => {
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
// Indice Satifasci??n Conjunto
// --------------------------------------------------------------

DUDYFIT.function.calulateIndSatis = () => {
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

DUDYFIT.function.clientsNoTrainer = () => {
    if( DUDYFIT.clients.length > 0 ) {
        document.querySelector('.message-overClients').style.display = 'block'; 
        document.querySelector('.message-overClients span').innerText = DUDYFIT.clients.length
    }
}

