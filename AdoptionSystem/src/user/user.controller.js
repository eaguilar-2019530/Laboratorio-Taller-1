'use strict'


import User from './user.model.js' // único que puede ir en mayúscula
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'

export const test = (req, res) => {
    return res.send('Hello World')
}

export const register = async(req,res)=>{ // solo para el cliente
    try {
        //Capturar la informacion del cliente (body)
        let data = req.body
        console.log(data)
        //Encriptar la contraseña
        data.password = await encrypt(data.password)
        //Asignar el rol por defecto
        data.role = 'CLIENT' // SI VIENE CON OTRO VALOR O NO VIENE, LO ASIGNA A ROLE CLIENTE
        //Crear una instancia del modelo (schema)
        let user = new User(data)
        //Guardar la información 
        await user.save()
        // Respondo al usuario        
        return res.send({message: 'Registered successfully'})
    } catch (erro) {
        console.error(erro)
        return res.status(500).send({message: 'Error register user', erro})
    }
}

export const login = async(req, res)=>{
    try {
        // Capturar la información (body)
        let { username, password } = req.body
        // Validar que el usuario existe
        let user = await User.findOne({ username }) //username: 'jchitay
        // Verifico que la contraseña coincida
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            // Responder (dar acceso )       
            return res.send({message: `Welcome ${user.name}`, loggedUser})     
        }
        return res.status(404).send({message: 'Invalid credentials'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Failed to login'})
    }
}

export const update = async(req, res)=>{ // Usuarios logeados
    try {
        // Obtener el id del usuario a actualizar
        let { id } = req.params
        //Obtener los datos que vamos a actualizar 
        let data = req.body
        //validad si trae datos a actualizar
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have sumbmitted some data that cannot'})
        //Validar si trae permisos (obtener tokenizacion ) * hoy no lo vemos *
        //Actualizamos en la DB
        let updateUser = await User.findOneAndUpdate(
            {_id: id}, // ObjectID <- hexadecimal (Hora sys, versin mongo, llave privada...)
            data, // Datos que va a actualizar 
            {new: true} //Objeto de la base de datos actualizado 
        )
        //Validar si se actualizo
        if(!updateUser) return res.status(401).send({message:'User not found and not update'})
        //Responder con el dato actualizado
        return res.send({message: 'Update user', updateUser})
    } catch (err) {
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is already taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}

export const deleteU = async(req, res)=>{
    try {   
        // Obtener el id
        let { id } = req.params
        //Validar si esta logeado y es el mismo X Hoy no lo vemos X
        //Eliminar (deleteOne / findOneAndDelete)
        let deleteUser = await User.findOneAndDelete({_id: id})
        //verificar que se elimina
        if(!deleteUser) return res.status(404).send({message: 'Account not fund and not deleted'})
        // REspodner
        return res.send({message: `Account with username ${deleteUser.username} deleted`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}