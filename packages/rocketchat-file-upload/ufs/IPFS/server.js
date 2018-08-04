import {UploadFS} from 'meteor/jalik:ufs';
import ipfsApi from 'ipfs-api';
// const ipfs = new IPFS();
// const fs = require('fs');

export class IPFSStore extends UploadFS.Store {
	constructor(options) {
		super(options);

 		const ipfs = ipfsApi({host: 'localhost', port: '5001', protocol: 'http'});
 		options.getPath = options.getPath || function(file) {
			return file._id;
		};
		this.getPath = function(file) {
			if (file.IPFS) {
				// console.log(file.IPFSStorage.path);
				// console.log(file.IPFSStore.path);
				return file.IPFS.path;
			}
		};

		this.create = function(file, callback) {
			check(file, Object);

			if (file._id == null) {
				file._id = Random.id();
			}

			file.IPFS = {
				path: this.options.getPath(file)
			};

			file.store = this.options.name; // assign store to file
			return this.getCollection().insert(file, callback);
		};
	}
}
// Add store to UFS namespace
UploadFS.store.IPFS = IPFSStore;
