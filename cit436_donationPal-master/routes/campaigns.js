var express = require('express');
var router = express.Router();
const donation = require('../models/campaigns-memory');

/* GET listing of all campaigns. */
router.get('/', async function(req, res, next) {
    
console.log("test");
    let keyList = await donation.keyList()
    let keyPromises = keyList.map(key => {
        return donation.read(key);
    });

    let campaignlist = await Promise.all(keyPromises);

    res.render('Campaigns/index', {title: "My Campaigns", campaignlist: campaignlist });
});

/* GET view a single campaign. */
router.get('/view', async function(req, res, next) {
    console.log("Made it to view router"); //Unsuccessful 
    var campaigns =  await donation.read(req.query.key)
    res.render('Campaigns/view', {title: campaigns.title, key: campaigns.key, goal: campaigns.goal, body: campaigns.body });
});

/*GET to the add campaign*/
router.get('/add', function(req, res, next) {
    res.render('Campaigns/edit', {title: "Add a Campaign"});
});


/* POST to add a new campaign */
router.post('/save', async (req, res, next) => {
    var campaigns;
    campaigns = await donation.create(req.body.campaignkey, req.body.title, req.body.goal, req.body.body);
    res.redirect ('/Campaigns/view?key=' + req.body.campaignkey);
    console.log("Made it through POST function"); //Success!
    //res.send("Adding a new campaign");
})

module.exports = router;
