# API-NEO-NASA-GraphQL ![Status badge](https://img.shields.io/badge/status-in%20progress-yellow)
> Backend Service to deploy NEO(Nearth Earth Objects) in GraphQL based on public [NASA API Asteroids NeoWs][nasa_api]

## :loudspeaker: Pre requirements
- Node JS 12.18.1 _(Recommended)_
- Mongo DB 4.2.8 _(Recommended)_

## :hammer: Installation
1. Clone Project `git clone git@github.com:jsv1280/api-nasa.git`
2. Install dependencies in the root project `npm install`
3. In your terminal _(root project)_ execute `npm run start`
4. For development enviroment execute `npm run dev`

## :wrench: Built with
- Express (cors,express-graphql,helmet)
- GraphQL (graphql, graphql-tools)
- MongoDB (NodeJS Mongo DB Driver)
- Dotenv
- Standard,Nodemon _(Development)_

## :microscope: Documentation

This project start documenting the public [NASA API Asteroids NeoWs][nasa_api] to have clear all the endpoints and data expose for the NASA API. To make more clear this, I documented the API with Postman to add a more descriptive view to check how behave this API and with that check which data will be included in this API

> [Postman Documentation REST API NASA][postman_url]

GraphQL is self-documented so you can check SDL(Schema Definition Language) of this project in `lib/graphql/schema.graphql`

> For development remember **graphiql** will activate to check in the GUI all querys,mutations,inputs of the schema definition 


## :black_nib: Author
-  [Jairo Salazar][github_url] Backend Developer (Platzi Master Student)

## :bookmark_tabs: License
This project is under license MIT

## :heart: Acknowledgment
- Cesar Joshua Pedraza Cruz _(Coach Platzi Master)_
- Team Cohort3-Cesar
- Platzi

## :telescope: References
- [Official REST API NASA NEOWS Documentation][neowsapp]
- [Jet Propulsion Laboratory][jpl]
- [Center for Nearth Earth Object Studies][cneos]	


[nasa_api]: https://api.nasa.gov/
[github_url]: https://github.com/jsv1280
[postman_url]: https://documenter.getpostman.com/view/3487826/SzzgAek7?version=latest#c624438b-50ed-459e-8377-e0b2922fb922
[neowsapp]: https://neowsapp.com/
[jpl] : https://www.jpl.nasa.gov/
[cneos] : https://cneos.jpl.nasa.gov/

