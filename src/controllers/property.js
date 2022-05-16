const cloudinary = require('cloudinary').v2;
const Property = require("../models/property");
const response = require('../helper/response');
const {decodeToken} = require('../helper/token');
const {getAllData} = require('../database/queries');
require('dotenv').config();
const db = require('../config/db.config')

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
        let image = file[0].path
        const{ item, type, price, address, city, state} = req.body;
        let image_url;
        // upload file to cloudinary
        if(file){
            await cloudinary.uploader.upload(image, (err, result)=> {
                if(err) {
                    return err
                }
                image_url = result.url
            });
        }

        const token = req.cookies.access_token
        let decrytedToken = decodeToken(token)
        let id = decrytedToken.user_id
        const property = new Property(item, type,price, address, city, state, image_url, id);
        // console.log(property)
       
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
 * view all property
 */

const fetchAllData = async(req, res)=>{
    // const allData = await Property.getAllData
    db.query('SELECT * FROM propertys', (err,rows) => {
        if(err) throw err;
        
        response(res, true, 200, 'Here is your data', rows)

        // console.log('Data received from Db:');
        // console.log(rows);
    });
    db.end()
}


module.exports= {
    createProperty,
    fetchAllData
}