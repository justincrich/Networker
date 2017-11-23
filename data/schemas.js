import Realm from 'realm';
export class ContactSchema extends Realm.Object {};
ContactSchema.schema = {
    name:'Contact',
    primaryKey:'id',
    properties:{
        id:{type:'int',default:Date.now()},
        firstName:'string',
        lastName:'string',
        pictureUri:{type:'string',default:''},
        email:'string?',
        phoneNumber:'string?',
        notes:'string?',
        jobTitle:'string?',
        company:'string?',
    }
}