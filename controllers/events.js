const { response } = require('express');
const Event = require('../models/Event-Model');


const getEvents = async( req, res = response ) => {

    const events = await Event.find()
                              .populate('user', 'name');

    return res.status(201).json({
        ok: true,
        events
    });
}


const createEvent = async( req, res = response ) => {

    // Verificar que tenga el evento
    const event = new Event( req.body );

    try {

        event.user = req.uid;

        const savedEvent = await event.save();

        res.status(201).json({
            ok: true,
            msg: savedEvent
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const updatetEvent = async( req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con el ID indicado'
            })
        }


        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para editar este evento'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true} );

        return res.status(201).json({
            ok: true,
            event: updatedEvent
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const deleteEvent = async( req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con el ID indicado'
            })
        }


        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para editar este evento'
            })
        }

        const deletedEvent = await Event.findByIdAndDelete( eventId );

        return res.json({
            ok: true,
            event: deletedEvent
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


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