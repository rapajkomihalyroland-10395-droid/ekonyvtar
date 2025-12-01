import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt, { compare } from "bcrypt";

const prisma = new PrismaClient();
const jwt_secret = process.env.JWT_SECRET;
const salt = process.env.SALT;



export const Login = async (req, res) => {

/**
 * Kell egy email mező is mert ezzel lesz UNIQUE
 * és így kell előtte a jelszót
 */

    try {

        const {nev, password} = req.body

        const result = await prisma.felhasznalo.findFirst({
            where : {nev : nev} 
        })
        if (result) return res.status(401).json({message: "Már van ilyen felhasználó"})
            

        const password_hash = bcrypt.hash(password,salt)
        const password_hash_check = bcrypt.compare(password_hash, result.password_hash)

        if (!password_hash_check) return res.status(401).json({message: "Helytelen felhasználónév vagy jelszó!"})

        const token_exp_date = await prisma.felhasznalo.findFirst({
            where : {felhasznalo_id : id}
        })
    } catch (error) {
        
    }
}