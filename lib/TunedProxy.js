import fs from 'fs';

export default class TunedProxy {
    
    constructor(config) {
        this.config = config;
        this.config.fields = this.config.fields || ['body']; 
    }

    register(response) {
        let logFile = this.config.file;
        let logContent = this.getLogContent(response);
        
        fs.writeFileSync(logFile, JSON.stringify(logContent));
    }

    // private

    getLogContent(response) {

        return this.config.fields.reduce(function(logContent, field) {
            logContent[field] = response[field] || null;
            return logContent;
        }, {});
        
    }

}