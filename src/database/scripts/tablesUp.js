const { logger } = require('../../helper/logger');
const { createTableReports: createNewReportQuery } = require('../queries');

(() => {    
   require('../../config/db.config').query(createNewReportQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table report created!');
        process.exit(0);
    });
})();
