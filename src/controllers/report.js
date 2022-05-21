const Report = require('../models/report');
const response = require('../helper/response');
const db = require('../config/db.config');
const {decodeToken} = require('../helper/token');


/**
 * Post Report
 */

const createReport = async(req, res) =>{
    try{
        const {property_id} = req.query.id;
        // const {reason, description} = req.body;
        // if(id=='' || reason == '' || description == ''){
        //     return response(res, false,404, 'All input are required')
        // }

        const token = req.cookies.access_token
        let decrytedToken = decodeToken(token)
        let reporter = decrytedToken.user_id

        const report = new Report(property_id, reason, description, reporter);

        Report.create(report, (err, result)=>{
            if(err){
                return
            }
            response(res, true, 201, 'Report Logged', result)
        })
    }
    catch(err){
        console.log(err)
        response(res, false, 500, 'Internal Server Error')
    }
};

module.exports = {
    createReport
}
