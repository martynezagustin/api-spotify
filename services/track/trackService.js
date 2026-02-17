const Track = require('../../models/track/trackModel')
const { TrackValidator } = require('../../models/track/trackValidator')
const User = require('../../models/user/userModel')
const Artist = require('../../models/artist/artistModel')

const trackService = {
    createTrack: async function (data, userId, otherArtistsNames) {
        try {
            const user = await User.findById(userId)
            if (!user) return { error: 'No se encontró el usuario.', code: 404 }

            const mainArtist = await Artist.findOne({ userId: userId })
            if (!mainArtist) return { error: 'No se encontró el perfil de artista.', code: 404 }

            let otherArtistsIds = []
            if (otherArtistsNames && otherArtistsNames.length > 0) {
                const foundArtists = await Artist.find({ artistName: { $in: otherArtistsNames } })
                if (foundArtists.length !== otherArtistsNames.length) return { error: 'Uno o más artistas invitados no existen.', code: 400 }
                otherArtistsIds = foundArtists.map(a => a._id)
            }

            const dataValidate = { ...data, mainArtist: mainArtist._id.toString(), featuredArtists: otherArtistsIds.map(id => id.toString()) }

            console.log('Data a validar:', dataValidate)

            const { error, value } = TrackValidator.validate(dataValidate, { abortEarly: false })
            if (error) return { error: error.details[0].message, code: 400 }

            const newTrack = new Track({ ...value })
            await newTrack.save()
            return newTrack
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error}`, code: 500 }
        }
    },
    getTrack: async function (id) {
        try {
            const track = await Track.findById(id)
            if (!track) return { error: 'No se ha encontrado el track.', code: 404 }
            return track
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error}`, code: 500 }
        }
    },
    getAllTracksForArtist: async function (id) {
        try {
            const allTracks = await Track.find({ mainArtist: id })
            if (allTracks.length === 0 || !allTracks) return { error: 'No se han encontrado pistas.', code: 404 }
            return allTracks
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error}`, code: 500 }
        }
    },
    deleteTrack: async function (id, userId) {
        try {
            //primero traemos al artista
            const artist = await Artist.findOne({ userId: userId })
            if (!artist) return { error: 'No se ha encontrado el perfil de artista.', code: 404 }
            const deletedTrack = await Track.findOneAndDelete({ _id: id, mainArtist: artist._id })
            if (!deletedTrack) return { error: 'No se ha encontrado el track.', code: 404 }
            return deletedTrack
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error}`, code: 500 }
        }
    },
    updateTrack: async function (id, data, userId) {
        try {
            const user = await User.findById(userId)
            if (!user) return { error: 'No se ha encontrado el usuario.', code: 404 }
            //es decir, mi PERFIL de artista
            const artist = await Artist.findOne({ userId: userId })
            if (!artist) return { error: 'No se ha encontrado el artista.', code: 404 }

            const updatedTrack = await Track.findOneAndUpdate({ mainArtist: artist._id }, { ...data }, { new: true })
            if (!updatedTrack) return { error: 'No se ha encontrado el track.', code: 404 }
            return updatedTrack
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error}`, code: 500 }
        }
    }
}

module.exports = trackService