const express= require('express')
const router = express.Router()
const trackController = require('../../controllers/track/trackController')
const authUser= require('../../middlewares/user/authUser')

router.post('/create-track', authUser, trackController.createTrack)
router.get('/tracks/:trackId', trackController.getTrack)
router.get('/artist/:artistId/tracks', trackController.getAllTracksForArtist)
router.delete('/tracks/:trackId', authUser, trackController.deleteTrack)
router.put('/tracks/:trackId', authUser, trackController.updateTrack)
router.post('/tracks/:trackId/like', authUser, trackController)

module.exports = router
