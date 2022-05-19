const db = require('../config/db.config');
const { createNewREport: createNewReportQuery } = require('../database/queries');
const { logger } = require('../helper/logger');

class Report {
    constructor(property_id, reason, description, reporter) {
        this.property_id = property_id;
        this.reason = reason;
        this.description = description; 
        this.reporter = reporter
    }

    static create(newReport, cb) {
        db.query(createNewReportQuery, 
            [
                newReport.property_id, 
                newReport.reason, 
                newReport.description,
                newReport.reporter
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    report_id: res.insertId,
                    property_id: newReport.property_id,
                    reason: newReport.reason,
                    description: newReport.description,
                    reporter: newReport.reporter
                });
        });
    }

}

module.exports = Report;