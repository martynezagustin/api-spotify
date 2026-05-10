const likeService = require('../../../../services/track/stats/like/likeService')

const likeController = {
    addLike: async function (req, res, next) {
        try {
            const { trackId } = req.params
            const like = await likeService.likeTrack(trackId, req.user.id)
            if (like.error) return res.status(like.code).json({ message: like.error })
            return res.status(200).json({ message: 'Añadido a tus me gusta.', like })
        } catch (error) {
            next(error)
        }
    },
    unlike: async function (req, res, next) {
        try {
            const { trackId } = req.params
            const unlike = await likeService.unlikeTrack(trackId, req.user.id)
            if (unlike.error) return res.status(unlike.code).json({ message: unlike.error })
            return res.status(200).json({ message: unlike.message })
        } catch (error) {
            next(error)
        }
    },
    countLikes: async function(req,res,next){
        try {
            const {trackId} = req.params
            const result = await likeService.countLikes(trackId)
            if(result.error) return res.status(result.code).json({message: result.error})
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = likeController