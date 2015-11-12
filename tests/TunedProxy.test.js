import TunedProxy from '../lib/TunedProxy';
import fs from 'fs';
import chai from 'chai';

describe('TunedProxy', () => {
	describe('register', () => {
		it('should create the log file', () => {
			//Given
			let tunedConfig = {
				file: './.tuned-logs.tmp'
			};

			let tunedProxy = new TunedProxy(tunedConfig);
			
			//When
			tunedProxy.register({ body: 'fuck this' });

			//Then
			let stats = fs.statSync(tunedConfig.file);
			chai.assert.isTrue(stats.isFile());

			fs.unlinkSync(tunedConfig.file);
		});

		it('should create the log with only reponse body if no fields is provided on config', () => {
			//Given
			let field = Date.now();
			let tunedConfig = {
				file: './.tuned-logs.tmp'
			};

			let tunedProxy = new TunedProxy(tunedConfig);
			let response = { body: 'fuck this', [field]: 'write', qqcoisa: 'qqcoisatambem' };
		
			//When
			tunedProxy.register(response);

			//Then
			let fileContent = JSON.parse(fs.readFileSync(tunedConfig.file));
			chai.expect(fileContent).to.be.deep.equal({ body: response.body });
			
			fs.unlinkSync(tunedConfig.file);
		});

		it('should create the log with the fields provided on config', () => {
			//Given
			let field = Date.now();
			let tunedConfig = {
				file: './.tuned-logs.tmp',
				fields: ['body', field]
			};

			let tunedProxy = new TunedProxy(tunedConfig);
			let response = { body: 'fuck this', [field]: 'write', qqcoisa: 'qqcoisatambem' };
		
			//When
			tunedProxy.register(response);

			//Then
			let fileContent = JSON.parse(fs.readFileSync(tunedConfig.file));
			chai.expect(fileContent).to.be.deep.equal({ body: response.body, [field]: response[field] });
			
			fs.unlinkSync(tunedConfig.file);
		});

		it('should register null for undefined field on response', () => {
			//Given
			let field = Date.now();
			let tunedConfig = {
				file: './.tuned-logs.tmp',
				fields: ['body', field]
			};

			let tunedProxy = new TunedProxy(tunedConfig);
			let response = { body: 'fuck this' };
		
			//When
			tunedProxy.register(response);

			//Then
			let fileContent = JSON.parse(fs.readFileSync(tunedConfig.file));
			chai.expect(fileContent).to.be.deep.equal({ body: response.body, [field]: null });
			
			fs.unlinkSync(tunedConfig.file);
		});
	});
});