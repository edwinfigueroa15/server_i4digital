import { Request, Response } from "express"
import Illness, { IIllness } from "../models/Illness"
import User from "../models/User";

type IIllnessPagination = {
    rows: IIllness[];
    count: number;
}

class IllnessController {
    async getAllByUser(req: Request, res: Response) {
        const { id } = req.params
        const { page, size } = req.query

        let pageNumber: number = +page!
        let sizeNumber: number = +size!

        if(isNaN(pageNumber) || pageNumber < 0) pageNumber = 0;
        if(isNaN(sizeNumber) || sizeNumber < 0) sizeNumber = 10;

        try {
            const response: IIllnessPagination = await Illness.findAndCountAll({
                where: { id_user: id },
                attributes: { exclude: ['updatedAt'] },
                limit: sizeNumber,
                offset: pageNumber * sizeNumber,
                order: [ ['createdAt', 'DESC'] ]
            });

            if(!response) res.status(404).json({ msg: 'Lo siento no pudimos encontrar la informacion', type: 'error', data: {} })
            res.status(200).json({ msg: 'Todos los registros por usuario', type: 'success', data: response })
        
        } catch (error) {
            res.status(500).json({ msg: `Error de proceso: ${error}`, type: 'warning', data: {} })
        }
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params
        try {
            const response = await Illness.findOne({
                where: { id },
                include: { 
                    model: User,
                    attributes: { exclude: ['identification_number', 'createdAt', 'updatedAt'] }
                }
            });

            if(!response) res.status(400).json({ msg: 'Lo siento no pudimos encontrar la informacion', type: 'error', data: {} })
            res.status(200).json({ msg: 'Registro encontrado correctamente', type: 'success', data: response })
        
        } catch (error) {
            res.status(500).json({ msg: `Error de proceso: ${error}`, type: 'warning', data: {} })
        }
    }

    async register(req: Request, res: Response) {
        try {
            const illness = await Illness.create(req.body)  
            res.status(200).json({ msg: "Datos de la enfermedad registrados correctamente", type: 'success', data: illness })
    
        } catch (error) {
            res.status(500).json({ msg: `Error de proceso: ${error}`, type: 'warning', data: {} })
        }
    }
}

export default new IllnessController()