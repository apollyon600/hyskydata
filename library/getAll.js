// Delcaring Packages
const fetch = require('node-fetch');

module.exports = async function() {

    const ssm = await fetch("https://sky.shiiyu.moe/api/v2/bazaar").then(res => res.json());
    let binsAvg = {};

    for (let i = 0; i < 20; i++) {
        const page = await fetch(`https://api.hypixel.net/skyblock/auctions?page=${i}`).then(res => res.json());
        const bins = page.auctions.filter(x=>x.bin);

        if (bins) bins.forEach(bin => {
            let displayName = bin.item_name;
            let id = bin.item_name.replace(/[^0-9a-z-\[\]_ ]/gi, '').trim().replace(/ +/g, "_").toUpperCase();
            if (binsAvg[displayName] || binsAvg[id]) {
                let { bids, price } = binsAvg[displayName] || binsAvg[id];
                bids.push(bin.starting_bid);
                price = Array.min(bids); 
            } else {
                binsAvg[displayName.startsWith("[Lvl") || (displayName.match(/'/g) || []).length != 0 || displayName.includes("Tier") ? displayName.replace(/✪/g, "").trim() : id] = {
                    information: {
                        stars: (id.match(/✪/g) || []).length,
                        start: bin.start || null,
                        ends: bin.end || null,
                        lore: bin.item_lore.replace(/§[0-9a-zA-Z]/g, "") || null,
                    },
                    auctioneer: {
                        uuid: bin.auctioneer || null,
                        profile_id: bin.profile_id || null,
                        coop: bin.coop || null
                    },
                    rarity: bin.tier || null,
                    category: bin.category || null,
                    bids: [bin.starting_bid || 0], 
                    price: bin.starting_bid || 0,
                    name: displayName || null
                }
            }
        });
    }

    let output = {
        ...ssm,
        ...binsAvg
    };

    // console.log(JSON.stringify(output, null, "  ").substring(0, 500));

    return output;
}

Array.min = function( array ){
    return Math.min.apply( Math, array );
};