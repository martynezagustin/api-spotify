const Artist = require('../../models/artist/artistModel')
const User = require('../../models/user/userModel')
const { ArtistValidator } = require('../../models/artist/artistValidator')

const artistService = {
    createArtist: async function (data, userId) {
        try {
            const user = await User.findById(userId)
            if (!user) return { error: 'No se encuentra el usuario.', code: 404 }

            const existingArtist = await Artist.findOne({ userId: userId, name: data.name })
            if (existingArtist) return { error: 'Ya creaste tu perfil de artista.', code: 400 }

            const dataValidate = { ...data, userId: userId }

            const { error, value } = ArtistValidator.validate(dataValidate, { abortEarly: false })
            if (error) {
                return { error: error.details[0].message, code: 400 };
            }
            const newArtist = new Artist({
                ...value,
                userId: userId
            })
            await newArtist.save()
            return newArtist
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error}`, code: 500 }
        }
    },
    //habrán DOS TIPOS DE VISTAS: una para el usuario - gestionar lo mío - y otra para los usuarios que no son el artista. En el middleware lo verás mejor 😉
    getProfileArtist: async function (id) {
        try {
            const artist = await Artist.findById(id).select('-userId')
            if (!artist) return { error: 'No se ha encontrado el artista.', code: 404 }
            return artist
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error}`, code: 500 }
        }
    },
    getProfileArtistUser: async function (id, userId) {/*este servicio sí lo puede consumir el usuario para ver sus datos privados*/
        try {
            console.log('Como llegan ID y userID', id, userId)
            const artist = await Artist.findOne({ _id: id, userId: userId })
            console.log('Artist encontrado:', artist)
            if (!artist) return { error: 'No se ha encontrado tu perfil de artista.', code: 404 }
            return artist
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error}`, code: 500 }
        }
    },
    updateArtistProfile: async function (id, data, userId) {
        try {
            const updatedArtist = await Artist.findOneAndUpdate({ _id: id, userId: userId }, { ...data }, { new: true })
            if (!updatedArtist) return { error: 'No se ha encontrado el artista.', code: 404 }
            return updatedArtist
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error}`, code: 500 }
        }
    },
    deleteArtist: async function (id, userId) {
        try {
            const deletedArtist = await Artist.findOneAndDelete({ _id: id, userId: userId })
            if (!deletedArtist) return { error: 'No se ha encontrado el artista.', code: 404 }
            //también estaría bueno ELIMINAR todo lo relacionado a tu perfil de artista -> música, playlists hechas como artista, entre otras.
            return deletedArtist
        } catch (error) {
            return { error: `Ha ocurrido un error de servidor: ${error}`, code: 500 }
        }
    }
}

module.exports = artistService