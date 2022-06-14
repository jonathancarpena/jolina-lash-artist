import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs'

import Services from '../models/Service.js'

const __dirname = path.dirname(dirname(fileURLToPath(import.meta.url)))
const imageFolder = `${__dirname}/data/images`


export const get_Image = async (req, res) => {
    const { imgName } = req.params

    try {
        const imgPath = `${imageFolder}/${imgName}`
        const img = fs.readFileSync(imgPath)
        if (!img) {
            throw new Error()
        }
        //response header, use set
        res.set('Content-Type', 'image/jpeg')
        res.send(img)
    } catch (e) {
        res.status(404).send(imgName)
    }
}