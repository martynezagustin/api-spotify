const express = require('express')
const router = express.Router()
const playlistController = require('../../controllers/playlist/playlistController')
const authUser = require('../../middlewares/user/authUser')

router.post('/create-playlist', authUser, playlistController.createPlaylist)
router.get('/playlists/:playlistId', playlistController.getPlaylistPublic)
router.get('/users/:userId/playlists', playlistController.getAllPlaylistsByUser)
router.put('/playlists/:playlistId', authUser, playlistController.updatePlaylist)
router.delete('/playlists/:playlistId', authUser, playlistController.deletePlaylist)
router.post('/playlists/:playlistId/tracks/:trackId', authUser, playlistController.addTrackToPlaylist)

module.exports = router