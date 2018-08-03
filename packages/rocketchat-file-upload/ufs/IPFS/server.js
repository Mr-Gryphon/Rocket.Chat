import {UploadFS} from 'meteor/jalik:ufs';
import ipfsApi from 'ipfs-api';
// const ipfs = new IPFS();
const fs = require('fs');

export class IPFSStore extends UploadFS.Store {
	constructor(options) {
		super(options);

		const ipfs = ipfsApi({host: 'localhost', port: '5001', protocol: 'http'});

		options.getPath = options.getPath || function(file) {
			return file._id;
		};
		this.getPath = function(file) {
			if (file.GoogleDrive) {
				return file.GoogleDrive.path;
			}

		};
	}
}
// Add store to UFS namespace
UploadFS.store.IPFS = IPFSStore;
