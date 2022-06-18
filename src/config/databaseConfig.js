require('dotenv').config();

const dbClusterLink = process.env.DB_CLUSTER_LINK;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const dbConnectionLink = "mongodb+srv://" + dbUser + ":" + dbPassword + "@" + dbClusterLink + dbName;

module.exports = dbConnectionLink;