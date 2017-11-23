import Realm from 'realm';
import {ContactSchema} from './schemas';

export default new Realm({schema:[ContactSchema]})