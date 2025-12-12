import { PrismaClient } from "@prisma/client";

const app = new PrismaClient()


export const MostPopularBooks = async (req, res) => {
    try {
        
        const books = prisma.berles.findMany({
            select:{
                konyv: {
                    select: {
                        cim: true,
                        kep: true,
                        leiras:true,
                    }
                },
                szerzo: {nev: true},
                kiado: {nev: true},
                kategoria: {nev: true}
            }
        })


        return res.status(200).json(books)


    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}