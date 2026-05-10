const mongoose = require('mongoose')

const LogginAttemptSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //valido que el tipo de usuario
    ip: {type: String},
    userAgent: {type: String},
    username: {type :String},
    success: {type: Boolean, required: true}
}, {timestamps: true})

LogginAttemptSchema.index({createdAt: 1})

module.exports = mongoose.model('LogginAttempt', LogginAttemptSchema)