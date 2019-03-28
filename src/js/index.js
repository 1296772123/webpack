/*
* 入口文件
* */

import {add,sub} from './module1';
import {mul} from './module2';
import data from '../json/data.json';
import '../less/demo.less';

console.log(add(4,4));
console.log(sub(4,3));
console.log(mul(4,3));
console.log(data,typeof data);

setTimeout(()=>{

},200);