const Campaign = require('./Campaigns');

var campaigns = [];

exports.create = async function(key, title, goal, body) {
    campaigns[key] = new Campaign(key, title, goal, body);
    return campaigns[key];
};

exports.read = async function(key) {
    return campaigns[key];
}

exports.keyList = async function () {return Object.keys(campaigns);};
exports.count = async function () {return campaigns.length; };
exports.close = async function () {};
