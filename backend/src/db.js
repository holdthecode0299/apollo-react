const { Prisma } = require('prisma-binding');
// This files connects to the remote prisma DB and 
// gives us the ability to query it with JS

const { noEndpointError } = require('graphql-cli');

const db = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    debug: false,
})

module.exports = db;