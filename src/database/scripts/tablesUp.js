const { logger } = require('../../helper/logger');
const { createTablePropertys: createNewPropertyQuery } = require('../queries');

(() => {    
   require('../../config/db.config').query(createNewPropertyQuery, (err, _) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info('Table property created!');
        process.exit(0);
    });
})();
