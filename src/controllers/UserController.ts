import { Request, Response } from "express"
import User, { IUser } from "../models/User"

type IUserPagination = {
    rows: IUser[];
    count: number;
}

class UserController {
    async getPaginator(req: Request, res: Response) {  
        const { page, size } = req.query

        let pageNumber: number = +page!
        let sizeNumber: number = +size!

        if(isNaN(pageNumber) || pageNumber < 0) pageNumber = 0;
        if(isNaN(sizeNumber) || sizeNumber < 0) sizeNumber = 10;

        try {
            const response: IUserPagination = await User.findAndCountAll({
                where: { status: true },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                limit: sizeNumber,
                offset: pageNumber * sizeNumber,
                order: [ ['name', 'ASC'] ]
            });

            if(!response) res.status(404).json({ msg: 'Lo siento no pudimos encontrar la informacion', type: 'error', data: {} })
            res.status(200).json({ msg: 'Todos los usuarios', type: 'success', data: response })
        
        } catch (error) {
            res.status(500).json({ msg: `Error de proceso: ${error}`, type: 'warning', data: {} })
        }
    }

    async getAll(_req: Request, res: Response) {
        try {
            const response: IUser[] = await User.findAll({
                where: { status: true },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                order: [ ['name', 'ASC'] ]
            });

            if(!response) res.status(404).json({ msg: 'Lo siento no pudimos encontrar la informacion', type: 'error', data: [] })
            res.status(200).json({ msg: 'Todos los usuarios', type: 'success', data: response })
        
        } catch (error) {
            res.status(500).json({ msg: `Error de proceso: ${error}`, type: 'warning', data: [] })
        }
    }

    async getById(req: Request, res: Response) {  
        const { id } = req.params
        try {
            const response: IUser | null = await User.findOne({ where: { identification_number: id, status: true } });
            if(!response) res.status(404).json({ msg: 'El usuario no existe', type: 'error', data: {} })
            res.status(200).json({ msg: 'Usuario encontrado', type: 'success', data: response })
    
        } catch (error) {
            res.status(500).json({ msg: `Error de proceso: ${error}`, type: 'warning', data: {} })
        }
    }

    async register(req: Request, res: Response) {  
        try {
            const userFound: IUser | null = await User.findOne({ where: { identification_number: req.body.identification_number }, attributes: ['identification_number'] })
            if (userFound) return res.status(200).json({ msg: "Usuario ya registrado", type: 'error', data: {} })

            const user = await User.create(req.body)
            res.status(200).json({ msg: "Usuario registrado correctamente", type: 'success', data: user })
    
        } catch (error) {
            res.status(500).json({ msg: `Error de proceso: ${error}`, type: 'warning', data: {} })
        }
    }
}

export default new UserController()