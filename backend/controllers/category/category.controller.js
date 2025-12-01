import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export const getAllCategory = async (req , res) => {

    try {
    const getCategory = await prisma.kategoria.findMany({
    })
    res.status(201).json({getCategory})


    } catch (error) {
        res.status(404).json({message: error.message})
    }

}


export const getCategoryById = async (req , res) => {

    const {id} = req.body


    try {
    const getCategory = await prisma.kategoria.findUnique({
        where : {id: id}
    })
    res.status(201).json({getCategory})
    
    
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

/* export const newCategory = async (req , res) => {

    const {id, nev, konyv} = req.body


    try {
    const getCategory = await prisma.kategoria.create({
        data : {
            id : id,
            nev: nev,
            konyv : konyv
        }
    })
    res.status(201).json({newCategory})
    
    
    } catch (error) {
        res.status(404).json({message: error.message})
    } 
}
*/
export const patchCategory = async (req , res) => {

    const {id, nev, konyv} = req.body


    try {
    const patchCategory = await prisma.kategoria.update({
        data : {
            id : id,
            nev: nev,
            konyv : konyv
        }
    })
    res.status(201).json({patchCategory})
    
    
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


export const deleteCategory = async (req , res) => {

    const {id} = req.body

//a konyv táblához kell majd egy státusz mező 
    try {
    const patchCategory = await prisma.kategoria.pat({
        data : {
            id : id,
            nev: nev,
            konyv : konyv
        }
    })
    res.status(201).json({patchCategory})
    
    
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}