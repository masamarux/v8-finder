## Description

This project is a simple API in Nest.js that stores Vehicle Makes and Vehicle Types and makes available to get this information in a endpoint with Graphql.

It has a CronJob that run every day at midnight to fill any changes on Vehicle Makes or any new Vehicle Types of vehicles produced by the Vehicle Makes.

Even having a CronJob, its a slow job and to garantee that any new requisition to any Vehicle Make ill have all information possible it will try to reach the feeder API just one time to make sure to get any info.


## Setup Environment Variables
Create a .env file in the root directory of the project for the dev environment and a .env.docker for the docker file and add the following environment variables:
```bash
MONGO_URI=
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Build the application with docker
Just run:
```bash
docker-compose up --build -d
```

## Author
Marcelo Alves
- <img src="https://user-images.githubusercontent.com/45273884/192056758-d7c1995b-4459-4acf-bb20-c4e19ee5daf3.svg" alt="twitter-logo" style="width: 20px; height: 20px;"> [@masamarux](https://twitter.com/masamarux)
- <img src="https://user-images.githubusercontent.com/45273884/192056770-fa5b48e0-a216-4f55-86fc-83cc6dd3590a.svg" alt="linkedin-logo" style="width: 20px; height: 20px;"> [Marcelo Alves](https://www.linkedin.com/in/marceloalves-/)
