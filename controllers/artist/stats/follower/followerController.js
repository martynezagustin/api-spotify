const followerService = require('../../../../services/artist/stats/follower/followerService')

const followerController = {
    toggleFollow: async function (req, res, next) {
        try {
            const { artistId } = req.params
            const follow = await followerService.toggleFollow(artistId, req.user.id)
            if (follow.error) return res.status(follow.code).json({ message: follow.error })
            return res.status(200).json({ message: follow.message })
        } catch (error) {
            next(error)
        }
    },
    toggleUnfollow: async function (req, res, next) {
        try {
            const { artistId } = req.params
            const follow = await followerService.toggleUnfollow(artistId, req.user.id)
            if (follow.error) return res.status(follow.code).json({ message: follow.error })
            return res.status(200).json({ message: follow.message })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = followerController