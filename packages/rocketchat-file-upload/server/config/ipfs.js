/* globals FileUpload */

import _ from 'underscore';
import { FileUploadClass } from '../lib/FileUpload';
// import fs from 'fs';
import '../../ufs/IPFS/server.js';
// import http from 'http';
// import https from 'https';

const get = function(file, req, res) {
};
const copy = function(file, req, res) {
};

const IPFSUploads = new FileUploadClass({
	name: 'GoogleDrive:UserDataFiles',
	get,
	copy
	// store setted below
});
const configure = _.debounce(function() {
	const uploadFolderPath = RocketChat.settings.get('FileUpload_IPFS_Upload_Folder_Path');

	const config = {
		connection: {
			// credentials: {
			// 	server,
			// 	password
			// }
		},
		uploadFolderPath
	};

	IPFSUploads.store = FileUpload.configureUploadsStore('IPFS', IPFSUploads.name, config);
	// IPFSAvatars.store = FileUpload.configureUploadsStore('IPFS', IPFSAvatars.name, config);
	// IPFSUserDataFiles.store = FileUpload.configureUploadsStore('IPFS', IPFSUserDataFiles.name, config);
}, 500);

RocketChat.settings.get(/^FileUpload_IPFS_/, configure);
