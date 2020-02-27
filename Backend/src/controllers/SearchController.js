const Dev = require('../models/Dev');
const Company = require('../models/Company');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
        const { latitude, longitude, techs } = request.query;
        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in:techsArray
            },
            location:{
                $near:{
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance:10000
                }
            }
        });
        
        const companies = await Company.find({
            'jobs.Techs': {$in: techsArray},
            location:{
                $near:{
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance:10000
                }
            }
        });

        return response.json({ devs, companies })
    }
}