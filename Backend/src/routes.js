const { Router} = require('express');
const DevController = require('./controllers/DevController');
const CompanyController = require('./controllers/CompanyController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.get('/devs/:id', DevController.findDev);
routes.post('/devs', DevController.store);
routes.post('/devs/:id', DevController.update);
routes.delete('/devs/:id', DevController.destroy)

routes.get('/company', CompanyController.index);
routes.get('/company/:id', CompanyController.findCompany);
routes.post('/company', CompanyController.store);
routes.post('/company/:id', CompanyController.update);

routes.get('/search', SearchController.index);

module.exports = routes;