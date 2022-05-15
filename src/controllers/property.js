const cloudinary = require('cloudinary').v2;
const Property = require("../models/property");
const response = require('../helper/response');
const {decodeToken} = require('../helper/token');
require('dotenv').config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET 
  });
  

/**
 * Post Property -upload Property
 */

const createProperty = async(req, res) => {
    try{
        const file = req.files;
        const{ item, type, price, address, city, state} = req.body;
        
        let image_url;
        // upload file to cloudinary
        if(file){
            cloudinary.uploader.upload(file.path, (err, result)=> {
                if(err) {
                    return err
                }
                image_url = result.url
            });
        }
        const property = new Property(item, type,price, address, city, state, image_url, user_id);
       
        Property.create(property, (err, data) => {
            if (err){
                return
            }
            return response(res, true, 201, 'Advert created', {data})
        })
    }
    catch(err){
        console.log(err)
    }

}

/**
 * get property by user
 */

module.exports= {
    createProperty
}