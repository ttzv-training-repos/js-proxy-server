const axios = require('axios');
const { merge } = require('../app');
const fs = require('fs');

const options = JSON.parse(fs.readFileSync('./secrets/request_config.json'));

exports.investment = function(req, res) {
    let investmentIds = ['416','808']; //'217','649','659','811','349','653','219','419','809','501','422'
    getInvestments().then(investments => {
        let thtgIds = mapIds(investmentIds, investments);
        let productsRequestPromises = thtgIds.map(id => getFilteredProducts(id.externalId));
        Promise.allSettled(productsRequestPromises)
        .then(data => res.send(data))
        .catch(console.log)
    });
};

exports.product = function(req, res) {
    console.log(options);
};

async function getInvestments(){
    let apiUrl = 'https://preview.atal.thtg.pl/api/v1/private/investment';
    let response = await axios.get(apiUrl, options);
    return response.data.data;
}

async function getFilteredProducts(investmentId) {
    let apiUrl = 'https://preview.atal.thtg.pl/api/v1/private/product';
    let filter = generateFilter(investmentId);
    let getUrl = `${apiUrl}${filter}`;
    console.log(getUrl);
    let response = await axios.get(getUrl, options);
    return response.data.data;
}

function mapIds(internalIds, data){
    return data.map(inv => {
        let investmentId = inv.additionalInfo.investmentId;
        if( internalIds.includes(investmentId)){
            return {internalId: investmentId, externalId: inv.id}
        }
    }).filter(Boolean);
}

function generateFilter(id){
    return `?filter=[{"type":"eq","field":"investment","value":${id}}]`;
}

function generateXML(){

}