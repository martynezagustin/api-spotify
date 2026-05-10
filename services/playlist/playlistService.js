const Playlist = require('../../models/playlist/playlistModel.js');
const Track = require('../../models/track/trackModel.js')
const { PlaylistValidator } = require('../../models/playlist/playlistValidator.js');
const trackService = require('../track/trackService.js');

const playlistService = {
    createPlaylist: async function (data, id) {
        try {
            const dataValidate = { ...data, ownerUser: id }
            const { error, value } = PlaylistValidator.validate(dataValidate, { abortEarly: false })
            if (error) {
                return { error: error.details[0].message, code: 400 }
            }
            const playlistExists = await Playlist.exists({ name: data.name, ownerUser: id })
            if (playlistExists) return { error: 'Ya existe una playlist con el mismo nombre.', code: 400 }

            const newPlaylist = new Playlist({ ...value, ownerUser: id })
            await newPlaylist.save()
            return newPlaylist
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error}`, code: 500 }
        }
    },
    getPlaylistPublic: async function (id) {
        try {
            const playlist = await Playlist.findOne({ _id: id })
            if (!playlist) return { error: 'No se ha encontrado la playlist.', code: 404 }
            return playlist
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error}`, code: 500 }
        }
    },
    //método para traer de un usuario que estoy visitando public
    getAllPlaylistsByUser: async function (id) {
        try {
            const allPlaylists = await Playlist.find({ ownerUser: id })
            if (!allPlaylists || allPlaylists.length === 0) return { error: 'No se han encontrado playlists del usuario', code: 404 }
            //después en el front los traes por ID de alguna manera ofuscada y que no se vea 👀
            return allPlaylists
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error}`, code: 500 }
        }
    },
    updatePlaylist: async function (id, userId, data) {
        try {
            const updatedPlaylist = await Playlist.findOneAndUpdate({ _id: id, ownerUser: userId }, { ...data }, { new: true })
            if (!updatedPlaylist) return { error: 'No se ha encontrado la playlist.', code: 404 }
            return updatedPlaylist
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error}`, code: 500 }
        }
    },
    deletePlaylist: async function (id, userId) {
        try {
            const deletedPlaylist = await Playlist.deleteOne({ _id: id, ownerUser: userId })
            if (!deletedPlaylist) return { error: 'No se ha encontrado la playlist.', code: 404 }
            return deletedPlaylist
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error}`, code: 500 }
        }
    },
    addTrackToPlaylist: async function (playlistId, userId, trackId) {
        try {
            const track = await Track.exists({ _id: trackId }).lean()
            if (!track) return { error: 'No se ha encontrado el track.', code: 404 }
            const result = await Playlist.updateOne(
                { _id: playlistId, ownerUser: userId, "tracks.track": { $ne: trackId } },
                { $push: { tracks: { track: trackId } } })
            if (result.matchedCount === 0) return { error: 'No se ha encontrado la playlist o no te pertenece.', code: 404 }
            if (result.modifiedCount === 0) return { error: 'El track ya está en la playlist.', code: 400 }
            return { message: '✅ Track agregado a tu playlist.' }
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error}`, code: 500 }
        }
    },
    deleteTrackToPlaylist: async function (playlistId, userId, trackId) {
        try {
            const result = await Playlist.updateOne({ _id: playlistId, ownerUser: userId },
                { $pull: { tracks: { trackId: trackId } } })
            if (!result) return { error: 'No se halló el track en tu playlist.', code: 404 }
            return result
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error}`, code: 500 }
        }
    }
};

module.exports = playlistService
