const playlistService = require('../../services/playlist/playlistService')

const playlistController = {
    createPlaylist: async function (req, res, next) {
        try {
            const playlist = await playlistService.createPlaylist(req.body, req.user.id)
            if (playlist.error) return res.status(playlist.code).json({ message: playlist.error })
            return res.status(201).json({ message: 'Playlist creada con éxito.', playlist })
        } catch (error) {
            next(error)
        }
    },
    getPlaylistPublic: async function (req, res, next) {
        try {
            const { playlistId } = req.params
            const playlist = await playlistService.getPlaylistPublic(playlistId)
            if (playlist.error) return res.status(playlist.code).json({ message: playlist.error })
            return res.status(200).json(playlist)
        } catch (error) {
            next(error)
        }
    },
    getAllPlaylistsByUser: async function (req, res, next) {
        try {
            const { userId } = req.params
            const playlists = await playlistService.getAllPlaylistsByUser(userId)
            if (playlists.error) return res.status(playlists.code).json({ message: playlists.error })
            return res.status(200).json(playlists)
        } catch (error) {
            next(error)
        }
    },
    updatePlaylist: async function (req, res, next) {
        try {
            const { playlistId } = req.params
            //tranquilo perro, tranquilo, estas rutas se protegen con authMiddleware 😉
            const updatePlaylist = await playlistService.updatePlaylist(playlistId, req.user.id, req.body)
            if (updatePlaylist.error) return res.status(updatePlaylist.code).json({ message: updatePlaylist.error })
            return res.status(200).json({ message: 'Actualizaste tu playlist con éxito.' })
        } catch (error) {
            next(error)
        }
    },
    deletePlaylist: async function (req, res, next) {
        try {
            const { playlistId } = req.params
            //tranquilo... tranquilo... TRANQUILO DIJE. También se protegen con authMiddleware
            const deletedPlaylist = await playlistService.deletePlaylist(playlistId, req.user.id)
            if (deletedPlaylist.error) return res.status(deletedPlaylist.code).json({ message: deletedPlaylist.error })
            return res.status(200).json({ message: 'Playlist eliminada con éxito.' })
        } catch (error) {
            next(error)
        }
    },
    addTrackToPlaylist: async function (req, res, next) {
        try {
            const { playlistId, trackId } = req.params
            const result = await playlistService.addTrackToPlaylist(playlistId, req.user.id, trackId)
            if (result.error) return res.status(result.code).json({ message: result.error })
            return res.status(200).json({ message: result.message })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = playlistController