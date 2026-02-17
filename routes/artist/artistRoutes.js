const express = require('express')
const router = express.Router() 
const authUser = require('../../middlewares/user/authUser')
const artistController = require('../../controllers/artist/artistController')

router.post('/create-artist', authUser, artistController.createArtist)
router.get('/artists/:artistId', artistController.getProfileArtist)
router.get('/artists/:artistId/private', authUser, artistController.getProfileArtistByUser)
router.delete('/artists/:artistId', authUser, artistController.deleteArtist)
router.put('/artists/:artistId', authUser, artistController.updateArtist)

module.exports = router