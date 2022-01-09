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
