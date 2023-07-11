import express from 'express'
import searchRoute from './search'

const router = express.Router()

router.use('/search', searchRoute)

export default router
