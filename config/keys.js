dbPassword = 'mongodb+srv://(Username):'+ encodeURIComponent('Password') + '@(Cluster name).mongodb.net/test?retryWrites=true';

module.exports = {
    mongoURI: dbPassword
};
