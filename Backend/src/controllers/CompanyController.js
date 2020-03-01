const axios = require('axios');
const Company = require('../models/Company');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(request, response){
        const company = await Company.find();
        return response.json(company);
    },
    async store(request, response) {
        const { name, desc, avatar_url, jobs, latitude, longitude } = request.body;

        let company = await Company.findOneAndDelete({name});

        if(!company){
            // const techsArray = parseStringAsArray(techs);
            
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            
            company = await Company.create({
                name,
                desc,
                avatar_url,
                jobs,
                location
            });

        }

        return response.json(company);
    },

    async update(request, response) {
        let {  name, desc, avatar_url, jobs, latitude, longitude } = request.body;
        const _id = request.params.id;
        const location = {
            type: 'Point',
            coordinates: [Number(longitude), Number(latitude)],
        }
        
        
        const company = {
            _id,
            name,
            desc,
            avatar_url,
            jobs,
            location
        };

        Company.findByIdAndUpdate(_id, company, { new: true, useFindAndModify: false }, (err, comp) => {
            if (err) return response.status(500).send(err);
            return response.send(comp);
        })

    },

    async findCompany(request, response) {
        const _id = request.params.id;

        Company.findById(_id, function (err, comp) { 
            return response.send(comp);
        });
    },
    
    async findJobs(request, response) {
        const _id = request.params.id;
        
        Company.findById(_id, function (err, comp) { 
            return response.send(comp);
        });
    },
    
    async addJobs(request, response) {
        const _id = request.params.id;

        const company = Company.findById(_id, function (err, comp) { 
            return response.send(comp);
        });
    },

    async destroy(request, response){
        const _id = request.params.id;

        Company.findByIdAndDelete(_id, function (err, comp) { 
            return response.send(comp);
        });
    }
}