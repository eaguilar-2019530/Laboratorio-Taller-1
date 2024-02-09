'use strict'

import { checkUpdateAnimal } from '../utils/validator.js'
import Animal from './animal.model.js'


export const registerAnimal = async(req,res)=>{
    try {
        let data = req.body
        console.log(data)
        let animal = new Animal(data)
        await animal.save()
        return res.send({message: 'Registered successfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error registrar Animal'})
    }
}




export const updateAni = async(req, res)=>{
    try {
        let { id } = req.params
        let data = req.body
        let updateAni = checkUpdateAnimal(data, id)
        if(!updateAni) return res.status(400).send({message: 'Have sumbmitted some data that cannot'})
        let updateAnimal = await Animal.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updateAnimal) return  res.status(401).send({message: 'Animal not fund and not update'})
        return res.send({message: 'Update animal', updateAnimal})
    } catch (err) {
        console.error(err)
        if(err.keyValue) return res.status(400).send({message: 'holi'})
        return res.status(500).send({message: 'Error updating pet'})
    }
}

export const deleteA = async(req, res)=>{
    try {
        let { id } = req.params
        let deleteAnimal = await Animal.findOneAndDelete({_id: id})
        if(!deleteAnimal) return res.status(404).send({message: 'Account not fund and not deleted'})
        return res.send({message: `Account with Animal ${deleteAnimal.petName} deleted`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting animal'})
    }
}