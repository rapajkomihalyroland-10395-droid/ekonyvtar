import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export const getAllCategory = async (req , res) => {

    try {
    const getCategory = await prisma.kategoria.findMany({
    })
        
    } catch (error) {
        res.status(404).json({message: error.message})
    }

}