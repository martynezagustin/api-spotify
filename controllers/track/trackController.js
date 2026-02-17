const trackService = require('../../services/track/trackService')

const trackController = {
    createTrack: async function (req, res, next) {
        try {
            const track = await trackService.createTrack(req.body, req.user.id, req.body.otherArtistsNames)
            if (track.error) return res.status(track.code).json({ message: track.error })
            return res.status(201).json({ message: 'Track creado con éxito.', track })
        } catch (error) {
            next(error)
        }
    },
    getTrack: async function (req, res, next) {
        try {
            const { trackId } = req.params
            const track = await trackService.getTrack(trackId)
            if (track.error) return res.status(track.code).json({ message: track.error })
            return res.status(200).json(track)
        } catch (error) {
            next(error)
        }
    },
    getAllTracksForArtist: async function (req, res, next) {
        const { artistId } = req.params
        try {
            const tracks = await trackService.getAllTracksForArtist(artistId)
            if (tracks.error) return res.status(tracks.code).json({ message: tracks.error })
            return res.status(200).json(tracks)
        } catch (error) {
            next(error)
        }
    },
    deleteTrack: async function (req, res, next) {
        try {
            const { trackId } = req.params
            const deletedTrack = await trackService.deleteTrack(trackId, req.user.id)
            if (deletedTrack.error) return res.status(deletedTrack.code).json({ message: deletedTrack.error })
            return res.status(200).json({ message: 'Track eliminado con éxito.' })
        } catch (error) {
            next(error)
        }
    },
    updateTrack: async function (req, res, next) {
        try {
            const { trackId } = req.params
            const updatedTrack = await trackService.updateTrack(trackId, req.body, req.user.id)
            if (updatedTrack.error) return res.status(updatedTrack.code).json({ message: updatedTrack.error })
            return res.status(200).json({ message: 'Track actualizado con éxito.', updatedTrack })
        } catch (error) {
            next(error)
        }
    },
    likeTrack: async function(req,res,next){
        try {
            
        } catch (error) {
            
        }
    }
}

module.exports = trackController