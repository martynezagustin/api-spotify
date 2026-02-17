const artistService = require('../../services/artist/artistService')

const artistController = {
    createArtist: async function (req, res, next) {
        try {
            const newArtist = await artistService.createArtist(req.body, req.user.id)
            if (newArtist.error) return res.status(newArtist.code).json({ message: newArtist.error })
            return res.status(201).json({ message: 'Artista creado con éxito.', artist: newArtist })
        } catch (error) {
            next(error)
        }
    },
    //recordá: este es el general que cualquiera podría ver
    getProfileArtist: async function (req, res, next) {
        try {
            const { artistId } = req.params
            const artist = await artistService.getProfileArtist(artistId)
            if (artist.error) return res.status(artist.code).json({ message: artist.error })
            return res.status(200).json(artist)
        } catch (error) {
            next(error)
        }
    },
    getProfileArtistByUser: async function (req, res, next) {
        try {
            const { artistId } = req.params
            const artist = await artistService.getProfileArtistUser(artistId, req.user.id)
            if (artist.error) return res.status(artist.code).json({ message: artist.error })
            return res.status(200).json(artist)
        } catch (error) {
            next(error)
        }
    },
    deleteArtist: async function (req, res, next) {
        try {
            const { artistId } = req.params
            const deletedArtist = await artistService.deleteArtist(artistId, req.user.id)
            if (deletedArtist.error) return res.status(deletedArtist.code).json({ message: deletedArtist.error })
            return res.status(200).json({ message: 'Has eliminado tu perfil de artista con éxito.' })
        } catch (error) {
            next(error)
        }
    },
    updateArtist: async function (req, res, next) {
        try {
            const { artistId } = req.params
            const updatedArtist = await artistService.updateArtistProfile(artistId, req.body, req.user.id)
            if (updatedArtist.error) return res.status(updatedArtist.code).json({ message: updatedArtist.error })
            return res.status(200).json({message: 'Perfil de artista actualizado con éxito.', updatedArtist})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = artistController