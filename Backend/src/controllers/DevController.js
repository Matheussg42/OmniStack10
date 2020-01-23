const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs);
    },
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOneAndDelete({github_username});

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            const {name = login, avatar_url, bio} = apiResponse.data;
            
            const techsArray = parseStringAsArray(techs);
            
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });

            const sendSocketMessageTo = findConnections(
                {latitude, longitude}, techsArray
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return response.json(dev);
    },

    async update(request, response) {
        const { name, bio, techs, latitude, longitude } = request.body;
        const _id = request.params.id;
        const techsArray = techs;
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }
        const dev = {
            name, 
            bio, 
            techsArray, 
            location
        };

        Dev.findByIdAndUpdate(_id, dev, { new: true, useFindAndModify: false }, (err, user) => {
            if (err) return response.status(500).send(err);
            return response.send(user);
        })

    },

    async findDev(request, response) {
        const _id = request.params.id;

        Dev.findById(_id, function (err, user) { 
            return response.send(user);
        });
    },

    async destroy(){
        // TODO
        // Deletar
    }
}