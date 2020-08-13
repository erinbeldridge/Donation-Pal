const _campaign_key = Symbol('key');
const _campaign_title = Symbol('title');
const _campaign_goal = Symbol('goal');
const _campaign_body = Symbol('body');

module.exports = class Campaigns {

    //constructor
    constructor(key, title, goal, body) {
        this[_campaign_key] = key;
        this[_campaign_title] = title;
        this[_campaign_goal] = goal;
        this[_campaign_body] = body;
    }

    //Getters & Setters
    get key() {return this[_campaign_key];}
    get title() {return this[_campaign_title];}
    get goal() {return this[_campaign_goal];}
    get body() {return this[_campaign_body];}

    set key(newKey){this[_campaign_key] = newKey;}
    set key(newTitle){this[_campaign_title] = newTitle;}
    set key(newGoal){this[_campaign_goal] = newGoal;}
    set key(newBody){this[_campaign_body] = newBody;}

};