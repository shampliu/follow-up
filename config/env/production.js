var url = process.env.MONGOLAB_URI

module.exports = {
    db : url,
    sessionSecret : 'thisisasecret'
}