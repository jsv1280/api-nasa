# API-NEO-NASA-GraphQL ![Status badge](https://img.shields.io/badge/status-in%20progress-yellow)
> Backend Service to deploy NEO(Nearth Earth Objects) in GraphQL based on public [NASA API Asteroids NeoWs][nasa_api]

## :loudspeaker: Requirements
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
- AWS EC2 Instance
- PM2 _(Production)_
- graphdoc _(Documentation)_

## :microscope: Documentation

1. This project start documenting the public [NASA API Asteroids NeoWs][nasa_api] to have clear all the endpoints and data expose for the NASA API. To make more clear this, I documented the API with Postman to add a more descriptive view to check how behave this API and with that check which data will be included in this API

> [Postman REST NeoWS Documentation][postman_url]

2. Next step, It was create three endpoints, one for creating new NEOS object based of the data model proposed in graphql schema, other for get all NEOS and finally delete duplicated NEOS objects 
> [REST Section Documentation API NASA][rest_api]

3. With GraphQL established a SDL(Schema Definition Language `lib/graphql/schema.graphql`) for this project and all the queries necessary to access this service
> [GraphQL Documentation API NASA][graphql_docs] 

For development remember **graphiql** will activate to check in the GUI all querys,mutations,inputs of the schema definition 

## :airplane: Deploy

- In your AWS Instance make sure you have successfully installed the previous requirements detailed in the beginning
- Install globally pm2 `npm install pm2 -g`
- Start Service `npm run start`

## :zap: Demo

To use this service make a POST request with your queries to:
- `http://ec2-54-234-62-6.compute-1.amazonaws.com:8080/api/graphql`

In `/mocks/graphql_client.js` you can find a simple example

## :books: Frontend Implementations

- **[NeoBit][abdiel_project]** By [José Abdiel Ortega Vázquez][abdiel_github] and [Juan Esteban Deossa Pertuz][juan_abdiel_github]
- **[CommetCat][rafa_hector_project]** By [Hector Reyes][hector_github] and [Rafael Alvarez Cardona][rafa_github]
- **[T-rexpace][juan_felipe_github]** By [Juan Gaybre][juan_github] and [Felipe Merchan][felipe_github]
- **[Asteroids][luis_osvaldo_github]** By [Luis Cabezas][luis_github] and [Osvaldo Arzate][osvaldo_github]

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
[jpl]: https://www.jpl.nasa.gov/
[cneos]: https://cneos.jpl.nasa.gov/
[abdiel_github]: https://github.com/abdieljortega
[abdiel_project]: https://github.com/WS-Jedp/NeoBit
[rafa_hector_project]: https://github.com/rafeldev/comeet-cat
[hector_github]: https://github.com/HectorDevx
[rafa_github]: https://github.com/rafeldev 
[juan_github]: https://github.com/Gaybre
[felipe_github]: https://github.com/FelipeMerchan
[juan_felipe_github]: https://github.com/T-rexpace
[juan_abdiel_github]: https://github.com/WS-Jedp
[luis_osvaldo_github]: https://github.com/ArzateCompany/asteroids
[luis_github]: https://github.com/cabezas29
[osvaldo_github]: https://github.com/ArzateCompany
[rest_api]: https://documenter.getpostman.com/view/12186729/T1Ds9FZZ?version=latest
[graphql_docs]: http://ec2-54-234-62-6.compute-1.amazonaws.com:8080/public/docs/