import {UploadFS} from 'meteor/jalik:ufs';

export class IPFSStore extends UploadFS.Store {}

// Add store to UFS namespace
UploadFS.store.IPFS = IPFSStore;
