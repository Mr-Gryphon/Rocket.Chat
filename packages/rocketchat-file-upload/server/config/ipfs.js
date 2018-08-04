import _ from 'underscore';
import { FileUploadClass } from '../lib/FileUpload';
import '../../ufs/IPFS/server.js';

const get = function(file, req, res) {
};
const copy = function(file, req, res) {
};

const IPFSUploads = new FileUploadClass({
	name: 'IPFSStore:Uploads',
	get,
	copy
	// store setted below
});

const IPFSAvatars = new FileUploadClass({
	name: 'IPFSStore:Avatars',
	get,
	copy
	// store setted below
});
const IPFSUserDataFiles = new FileUploadClass({
	name: 'IPFSStore:UserDataFiles',
	get,
	copy
	// store setted below
});

const configure = _.debounce(function() {
	const uploadFolderPath = RocketChat.settings.get('FileUpload_IPFS_Upload_Folder_Path');
	const server = RocketChat.settings.get('FileUpload_IPFS_Provider');
	// const username = RocketChat.settings.get('FileUpload_IPFS_Username');
	const password = RocketChat.settings.get('FileUpload_IPFS_Password');
	console.log(password);
	if (!server || !password) {
		return;
	}

	const config = {
		connection: {
			credentials: {
				server,
				password
			}
		},
		uploadFolderPath
	};

	IPFSUploads.store = FileUpload.configureUploadsStore('IPFSStore', IPFSUploads.name, config);
	IPFSAvatars.store = FileUpload.configureUploadsStore('IPFSStore', IPFSAvatars.name, config);
	IPFSUserDataFiles.store = FileUpload.configureUploadsStore('IPFSStore', IPFSUserDataFiles.name, config);
}, 500);

RocketChat.settings.get(/^FileUpload_IPFSStorage_/, configure);
