const express = require('express')
const router = express.Router()
const authUser = require('../../../../middlewares/user/authUser')
const likeController = require('../../../../controllers/track/stats/like/likeController')

router.post('/tracks/:trackId/like', authUser, likeController.addLike)
router.delete('/tracks/:trackId/unlike', authUser, likeController.unlike)
router.get('/likes/tracks/:trackId', likeController.countLikes)

module.exports = router