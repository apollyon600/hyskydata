// Delcaring Packages
const fetch = require('node-fetch');

module.exports = async function(params) {

    if (!params.needed) throw new Error(`They key "needed" is null or undefined.`);
    else if (!Array.isArray(params.needed)) throw new Error(`The key "needed" needs to be an array.`);
    else if (Array.isArray(params.needed) == "object" && params.needed.length != 0) throw new Error(`The key "needed" needs have values in it.`);

    const neu = await fetch("https://moulberry.github.io/files/auc_avg_jsons/average_3day.json").then(res => res.json());
    const slm = await fetch("https://sky.lea.moe/api/v2/bazaar").then(res => res.json());

    let binsAvg = {};

    for (let i = 0; i < 50; i++) {
        const page = await fetch(`https://api.hypixel.net/skyblock/auctions?page=${i}`).then(res => res.json());
        const bins = page.auctions.filter(x=>x.bin);

        if (bins) bins.forEach(bin => {
            let displayName = bin.item_name;
            let id = bin.item_name.replace(/ +/g, "_").toUpperCase();
            if (binsAvg[displayName] || binsAvg[id]) {
                let { inputs, price } = binsAvg[displayName] || binsAvg[id];
                inputs.push(bin.starting_bid);
                price = Array.min(inputs); 
            } else {
                let stars = (id.match(/✪/g) || []).length;
                id = id.replace(/_/g, " ").replace(/✪/g, "").replace(/◆/g, "").trim().replace(/ +/g, "_");
                binsAvg[displayName.startsWith("[Lvl") || (displayName.match(/'/g) || []).length != 0 || displayName.includes("Tier") ? displayName.replace(/✪/g, "").trim() : id] = {
                    inputs: [bin.starting_bid], 
                    price: bin.starting_bid,
                    stars,
                    name: displayName
                }
            }
        });
    }

    let queue = params.needed;
    let output = {};

    for (const q in queue) {
        if (neu.bazaar[queue[q]]) {

            let data = neu.bazaar[queue[q]];
            let object = {
                _id: queue[q],
                _name: queue[q].replace(/_/g, " ").titleCase(),
                bazaar: {
                    averageBuy: Math.round(data.avg_buy) || 0,
                    averageSell: Math.round(data.avg_sell) || 0,
                    currentBuy: Math.round(data.curr_buy) || 0,
                    currentSell: Math.round(data.curr_sell) || 0
                },
                price: Math.round(data.avg_buy) || 0
            };

            output[queue[q]] = object;
        } else if (neu.item_data[queue[q]]) {

            let data = neu.item_data[queue[q]];
            let object = {
                _id: queue[q],
                _name: queue[q].replace(/_/g, " ").titleCase(),
                stats: {
                    perPrice: Math.round(data.count) || 0,
                    totalSales: Math.round(data.sales) || 0
                },
                cleanPrice: Math.round(data.clean_price) || 0,
                price: Math.round(data.price) || 0
            };

            output[queue[q]] = object;
        } else if (slm[queue[q]]) {

            let data = slm[queue[q]];
            let object = {
                _id: queue[q],
                _name: data.name,
                bazaar: {
                    averageBuy: Math.round(data.buyPrice) || 0,
                    averageSell: Math.round(data.sellPrice) || 0,
                    currentBuy: Math.round(data.buyVolume) || 0,
                    currentSell: Math.round(data.sellVolume) || 0
                },
                price: Math.round(data.price) || 0
            };

            output[queue[q]] = object;
        } else if (binsAvg[queue[q]]) {

            let data = binsAvg[queue[q]];
            let object = {
                _id: queue[q],
                _name: data.name,
                stats: {
                    stars: data.stars
                },
                price: Math.round(data.price) || 0
            };

            output[queue[q]] = object;

        }
    }

    console.log(output);
    return output;
}

Array.min = function( array ){
    return Math.min.apply( Math, array );
};