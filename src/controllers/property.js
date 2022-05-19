const cloudinary = require('cloudinary').v2;
const Property = require("../models/property");
const response = require('../helper/response');
const {decodeToken} = require('../helper/token');
const {getAllData, dropDB} = require('../database/queries');
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

        if(file =='' || item==""|| type =="" || price=='' || address== '' || city == '' || state == '' ){
            return response(res, false, 404, 'All fields must be filled')
        }

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
            response(res, true, 201, 'Advert created', {data})
        })
    }
    catch(err){
        console.log(err)
        response(res, false, 500, 'Something Went Wrong')
    }
}

/**
 * view all property
 */

const fetchAllData = async(req, res)=>{
    try{
        // const allData = await Property.getAllData
    db.query('SELECT * FROM propertys', (err,rows) => {
        if(err) {
            throw err;
        }
        response(res, true, 200, 'Here is your data', rows)
    });
    db.end()
    }
    catch(err) {
        console.log(err)
        response(res, false, 500, 'Internal Server Error')
    }
}

/**
 * get property by Id
 * @param {id} req 
 * @param {rows} res 
 */

const getPropertyById = async(req, res)=> {
    try{
        const id = Number(req.params.id)

    db.query('SELECT * FROM propertys WHERE property_id =?', [id], (err,rows) => {
        if(err) { 
            return response(res, false, 404, `No Property with ${id} exist`)
        };
        response(res, true, 200, 'Here is your data', rows)
    })
    db.end()
    }
    catch(err){
        console.log(err)
        response(res, false, 500, 'Internal Server Error')
    }
    
}

/**
 * Update
 */
const updatePropertyDetails = async(req, res) => {
 try{
        const property_id = req.query.id
        const{ type, price, address, city, state} = req.body;
        
        let sql =  `UPDATE propertys 
                    SET type =?, price = ?, address = ?, city = ?, state= ?
                    WHERE property_id= ?`;
        
        let data = [type, price, address, city, state, property_id]

        db.query(sql, data, (err, results) => {
            if (err) {
                console.log(err.message) 
            };
            // console.log(results.affectedRows + " record(s) updated");
            response(res, true, 201, 'Property Updated Successfully', results)
        })
    }
    catch(err){
        console.log(err)
        response(res, false, 500, 'Internal Server Error')
    }
}

/**
 * updateSoldItem
 */

const updateSoldItem = async(req, res) => {
    try{
        const property_id = req.params.id
        const { status } = req.body
        console.log(property_id, status)
        let sql =  `UPDATE propertys 
                    SET status = ?
                    WHERE property_id= ?`;
        
        let data = [status, property_id]

        db.query(sql, data, (err, results) => {
            if (err) {
                console.log(err.message) 
            };
            console.log(results.affectedRows + " record(s) updated");
            response(res, true, 201, 'Property status changed')
        })
        db.end()
    }
    catch(err){
        console.log(err)
        response(res, false, 500, 'Something went wrong while Processing')
    }
};

/**
 * delete Property
 */
const deleteSingleProperty =async(req, res) => {
    try{
        const property_id = req.params.id
        console.log(property_id)
        db.query('DELETE FROM propertys WHERE property_id =?', [property_id], (err, result)=>{
            if(err){
                console.log(err)
                return response(res, false, 400, 'Something went wrong', err.message) 
            }
            // console.log(result.affectedRows)
            response(res, true, 200, `Property with ${property_id} Deleted`, result)
        })
        db.end()
    }
    catch(err){
        console.log(err)
        response(res, false, 500, 'Something went wrong while Processing')
    }
};

/**
 * queryProperty
 */
const queryProperty = async(req, res) => {
    try{
        const  type  = req.query.type
        console.log(type)
        db.query('SELECT FROM propertys WHERE type =? ', [type], (err, result)=>{
            if(err){
                console.log(err)
                return response(res, false, 400, 'Something went wrong', err.message) 
            }
            console.log(result)
            response(res, true, 200, `Here are the properties with type: ${type}`, result)
        })
    }
    catch(err){
        response(res, false, 500, 'Something went wrong while Processing') 
    }
};

module.exports= {
    createProperty,
    fetchAllData,
    getPropertyById,
    updatePropertyDetails,
    updateSoldItem,
    deleteSingleProperty,
    queryProperty
}