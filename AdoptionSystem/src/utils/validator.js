//Encriptar, validar... Diferentes datos

import {  compare, hash } from 'bcrypt'


export const encrypt = async(password)=>{
    try {
        return await hash(password, 10)
    } catch (erro) {
        console.error(erro)
        return erro
    }
}

export const checkPassword = async(password, hash)=>{
    try {
        return await compare(password, hash) 
    } catch (err) {
        console.error(err)
        return err
    }
}

export const checkUpdate = (data, userId)=>{
    if(userId){
        if(
            Object.entries(data).length === 0  ||
            data.password ||
            data.password == '' ||
            data.role ||
            data.role == ''
        ) return false
        return true
    }else{
        return false
    }
}

export const checkUpdateAnimal = (data, animalId)=>{
    if(animalId){
        if(
            Object.entries(data).length === 0 
        )return false
        return true
    }else{
        return false
    }
}