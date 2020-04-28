import _ from 'lodash'
import str from './a'
var a = { a: str };
var b = _.cloneDeep(a);
console.log(b);