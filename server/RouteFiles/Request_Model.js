const express = require('express')
const mongoose = require('mongoose')
const app = express.Router()
const request = require('../models/Request_Schema')




app.post('/newRequest', async (req, res) => {
    const Name = req.body.name
    const Phone = req.body.Phone
    const Job = req.body.Job
    const claimable = req.body.claimable
    const Request = req.body.Request
    try {
        const data = await request.findOne({ "Phone": Phone })
        if (data) {
            res.json({ status: 'failed', message: 'There is a pending request' })
        }
        else {
            const New = new request({
                Name: Name,
                Job: Job,
                Phone: Phone,
                Claimable: claimable,
                Request: Request
            })
            try {
                await New.save()
                res.json({ status: 'ok', message: 'Request made' })
            }
            catch (err) {
                res.json({ status: 'failed', message: err })
            }
        }
    }
    catch (err) {
        res.json({ status: 'failed', message: err })
    }

})

app.get('/payDetails', async (req, res) => {
    try {
        const data = await request.find()
        res.json(data)
    }
    catch (error) {
        res.json(error)
    }
})

app.get('/Unique/:id', async (req, res) => {
    const id = req.params.id
    try {
        const data = await request.findById(id)
        res.json(data)
    }
    catch (error) {
        res.json(error)
    }
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    try {
        const data = await request.findByIdAndDelete(id)
        res.json("item deleted")
    }
    catch (error) {
        res.json(error)
    }
})
module.exports = app