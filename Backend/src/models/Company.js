const mongoose = require('mongoose');
const PointSchema = require('./util/PointSchema');

const CompanySchema = new mongoose.Schema({
    name: String,
    desc: String,
    avatar_url: String,
    jobs:[{
        title: String,
        Techs: [String],
        Desc: String,
        Link: String
    }],
    location:{
        type: PointSchema,
        index: '2dsphere'
    }
})

module.exports = mongoose.model('Company', CompanySchema);