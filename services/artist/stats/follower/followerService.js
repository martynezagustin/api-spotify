const Follower = require('../../../../models/artist/stats/follower/followerModel')

const followerService = {
    toggleFollow: async function (artistId, userId) {
        try {
            await Follower.create({ artistId, userId })
            return { message: '🔥 Ahora sigues a este artista.' }
        } catch (error) {
            if (error.code === 11000) return { error: 'Ya sigues a este artista.', code: 400 }
            return { error: `Ha ocurrido un error de servidor: ${error.message}`, code: 500 }
        }
    },
    toggleUnfollow: async function (artistId, userId) {
        try {
            const result = await Follower.deleteOne({ artistId, userId })
            if (result.deletedCount === 0) return { error: 'No sigues a este artista.', code: 400 }
            return {message: '💔 Has dejado de seguir a este artista.'}
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error.message}`, code: 500 }
        }
    },
    countFollowers: async function(artistId, userId){
        const result = await Follower.countDocuments({artistId})
        if(result === 0) return {error: 'No hay seguidores aún.', code: 404}
        return result
    }
}

module.exports = followerService