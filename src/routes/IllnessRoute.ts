import { Router, Request, Response } from 'express'

const router = Router()

// USAR ANTES /api/illness
// http://localhost:4000/api/illness

router.get('/', (_req: Request, res: Response) => {
    res.status(200).json({ msg: "Funciona la ruta" })
})

export default router