module.exports = {
    secret: process.env.SECRET,
    database: process.env.MONGODB,
    domainkey: process.env.DOMAINKEY,
    // fbcallbackurl: process.env.fbcallbackurl,
    // googlecallbackurl: process.env.googlecallbackurl,
    // githubcallbackurl: process.env.githubcallbackurl,
    // twittercallbackurl: process.env.twittercallbackurl,
    // linkedincallbackurl : process.env.linkedincallbackurl,
    fbclientid: process.env.fbclientid,
    fbclientsecret: process.env.fbclientsecret,
    googleclientid: process.env.googleclientid,
    googleclientsecret: process.env.googleclientsecret,
    githubclientid: process.env.githubclientid,
    githubclientsecret: process.env.githubclientsecret,
    twitterclientid: process.env.twitterclientid,
    twitterclientsecret: process.env.twitterclientsecret,    
    linkedinclientid: process.env.linkedinclientid,
    linkedinclientsecret: process.env.linkedinclientsecret

    // sendemailurl:'http://api.' + process.env.DOMAINKEY + '/vmailmicro/sendPassword'
};
