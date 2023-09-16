import { Router } from 'express'
import { loadDocs } from '../../controller/loader.js'

const dashboardRouter = Router()

dashboardRouter.post('/load-data', async (req, res) => {
  try {
    await loadDocs()
    return res
      .json({
        message: 'Data loaded Successfully',
      })
      .status(200)
  } catch (e) {
    console.log(e)
    return res
      .json({
        message: 'Some Problem Occured while loading data',
      })
      .status(400)
  }
})

export default dashboardRouter
