const db = require('../config/db.config');
const { createNewProperty: createNewPropertyQuery, findUserBystatus: findUserBystatusQuery } = require('../database/queries');
const { logger } = require('../helper/logger');

class Property {
    constructor(item, type, status, price, address, city, state, image_url, user_id) {
        this.item = item;
        this.type = type;
        this.status = status;
        this.price = price;
        this.address = address;
        this.city = city;
        this.state = state;
        this.image_url =image_url;
        this.user_id = user_id;
    }

    static create(newProperty, cb) {
        db.query(createNewPropertyQuery, 
            [
                newProperty.item, 
                newProperty.type, 
                newProperty.status, 
                newProperty.price,
                newProperty.address,
                newProperty.city,
                newProperty.state,
                newProperty.image_url,
                newProperty.user_id
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    property_id: res.insertId,
                    item: newProperty.item,
                    type: newProperty.type,
                    status: newProperty.status,
                    price: newProperty.price,
                    address: newProperty.address,
                    city: newProperty.city,
                    state: newProperty.state,
                    image_url: newProperty.image_url,
                    id: res.insertId
                });
        });
    }

    static findBystatus(status, cb) {
        db.query(findUserBystatusQuery, status, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
}

module.exports = Property;