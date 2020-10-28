# HySkyData

This package is meant for those who need hypixel prices
Created by: Apollo#6000

## Setup
```js
const hyskydata = require("hyskydata");
```

## Retrieving all items
```js
const hyskydata = require("hyskydata");

hyskydata.getAll();

{
  "BROWN_MUSHROOM": {
    "id": "BROWN_MUSHROOM",
    "name": "Brown Mushroom",
    "buyPrice": 9.58452030606239,
    "sellPrice": 8.6,
    "buyVolume": 358005,
    "sellVolume": 335488,
    "tag": null,
    "price": 9.092260153031194
  },
  "INK_SACK:3": {
    "id": "INK_SACK:3",
    "name": "Cocoa Beans",
    "buyPrice": 5.4,
    "sellPrice": 3.4,
    "buyVolume": 758537,
    "sellVolume": 625530,
    "tag": null,
    "price": 4.4
  },
  "INK_SACK:4": {
    "id": "INK_SACK:4"...
```

## Retrieving specific items
```js
const hyskydata = require("hyskydata");

// Supply Item IDs
hyskydata.getSpecific(["SUPERIOR_FRAGMENT", "SUPERIOR_DRAGON_CHESTPLATE"]);

{
  BOOSTER_COOKIE: {
    id: 'BOOSTER_COOKIE',
    buyPrice: 969997.5,
    buyVolume: 2100,
    sellVolume: 5365,
    tag: null,
    price: 960498.9333333333
  },
  SUPERIOR_FRAGMENT: {
    id: 'SUPERIOR_FRAGMENT',
    name: 'Superior Dragon Fragment',
    buyPrice: 176792.5,
    sellPrice: 163000.9,
    buyVolume: 3112,
    sellVolume: 207710,
    tag: 'sup frag drag',
    price: 169896.7
}
```