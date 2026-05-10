const User = require('../../../../models/user/userModel')
const Like = require('../../../../models/track/stats/like/likeModel')
const Track = require('../../../../models/track/trackModel')

const likeService = {
    //functs más privadas, requieren autenticación y autorización -- ponele
    likeTrack: async function (trackId, userId) {
        try {
            const user = await User.exists({ _id: userId })
            if (!user) return { error: 'No se ha encontrado el usuario.', code: 404 }
            const track = await Track.exists({ _id: trackId })
            if (!track) return { error: 'No se ha encontrado el track.', code: 404 }
            const newLike = new Like({ trackId: track._id, userId: userId })
            return await newLike.save()
        } catch (error) {
            if (error.code = 11000) {
                return { error: 'Ya le has dado like a este track.', code: 400 }
            }
            return { error: `Ha ocurrido un error de servidor: ${error.message}`, code: 500 }
        }
    },
    //functs más privadas, requieren autenticación y autorización -- ponele    
    unlikeTrack: async function (trackId, userId) {
        try {
            const result = await Like.deleteOne({ userId: userId, trackId: trackId })
            if (result.deletedCount === 0) {
                return { error: 'No habías dado like a este track.', code: 404 }
            }
            return { message: '💔 Like eliminado correctamente.' }
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error.message}.`, code: 500 }
        }
    },
    countLikes: async function (trackId) {
        try {
            const result = await Like.countDocuments({ trackId })
            if (result === 0) return { error: 'No hay likes aún.', code: 404 }
            return result
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error.message}.`, code: 500 }
        }
    }
}

module.exports = likeService