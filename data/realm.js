import Realm from 'realm';

class ContactSchema extends Realm.Object {};
ContactSchema.schema = {
    name:'Contact',
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

export default new Realm({schema:[ContactSchema]})