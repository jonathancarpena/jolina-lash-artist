import Service from '../models/Service.js'
import moment from 'moment'

import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs'


const __dirname = path.dirname(dirname(fileURLToPath(import.meta.url)))
const imageFolder = `${__dirname}\\data\\images\\`
// post_AddService,
// get_AllServices,
// get_SingleService,
// delete_RemoveService,
// put_updateService,

// Public Access
export const post_AddService = async (req, res) => {
    console.log('POST: Add Service')

    try {
        let newBody = {
            ...req.body
        }
        newBody["book_date"] = moment(req.body.book_date).toDate()

        const services = await Service.find()
        const newService = await Service.create({ ...newBody, number: services.length })
        return res.status(200).json(newService)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Admin Access
export const get_AllServices = async (req, res) => {
    console.log('GET: All Service')
    try {
        const allServices = await Service.find()
        return res.status(200).json(allServices)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Public Access
export const get_SingleService = async (req, res) => {
    console.log('GET: Single Service')
    const { _id } = req.params
    try {
        const singleService = await Service.findById(_id)
        return res.status(200).json(singleService)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Public Access
export const get_SingleServiceByCategory = async (req, res) => {
    console.log('GET: Single Service by Category')
    const { category } = req.params
    try {
        const _ = await Service.find()
        const servicesByCategory = _.filter((item) => item.category === category)
        return res.status(200).json(servicesByCategory)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


// Admin Access
export const delete_RemoveService = async (req, res) => {
    console.log('DELETE: Delete Service')
    const { _id } = req.params
    try {
        await Service.findByIdAndDelete(_id)
        return res.status(200).json({
            message: "Successfully deleted.",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// Admin Access
export const put_updateService = async (req, res) => {
    console.log('PUT: Update Service')
    const { _id } = req.params
    const body = { ...req.body }


    try {
        let updatedService;
        const service = await Service.findById(_id)
        if (body.img) {
            let newImages = [...service.img]
            const split = body.img.split('_')[1].split('.')[0]
            const index = parseInt(split.slice(-1))
            newImages[index] = body.img
            updatedService = await Service.findByIdAndUpdate(_id, { img: [...newImages] })
        } else {
            updatedService = await Service.findByIdAndUpdate(_id, { ...req.body })
        }
        return res.status(200).json(updatedService)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}









