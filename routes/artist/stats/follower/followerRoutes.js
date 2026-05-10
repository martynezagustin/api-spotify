const express = require('express')
const router = express.Router()
const followerController = require('../../../../controllers/artist/stats/follower/followerController')
const authUser = require('../../../../middlewares/user/authUser')

router.post('/artists/:artistId/followers', authUser, followerController.toggleFollow)
router.delete('/artists/:artistId/followers', authUser, followerController.toggleUnfollow)

module.exports = router