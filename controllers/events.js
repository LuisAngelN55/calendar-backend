const { response } = require('express');


const getEvents = ( req, res = response ) => {

    return res.status(201).json({
        ok: true,
        msg: 'Obtain events'
    });
}


const createEvent = ( req, res = response ) => {

    return res.status(201).json({
        ok: true,
        msg: 'Create events'
    });
}


const updatetEvent = ( req, res = response ) => {

    return res.status(201).json({
        ok: true,
        msg: 'Update events'
    });
}


const deleteEvent = ( req, res = response ) => {

    return res.status(201).json({
        ok: true,
        msg: 'Delete events'
    });
}



module.exports = {
    getEvents,
    createEvent,
    updatetEvent,
    deleteEvent
}