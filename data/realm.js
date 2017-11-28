import Realm from 'realm';
import {ContactSchema,InteractionSchema} from './schemas';
let schemaVersion = 1;

export default new Realm({
    schema:[ContactSchema, InteractionSchema],
    schemaVersion:schemaVersion,
});