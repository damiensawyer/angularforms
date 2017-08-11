//import * as _ from 'lodash';
import {each} from 'lodash';

export class functions {
    Name = 'damien';
    doStuff(names: string[]) {
        each(names, x=> {console.log(x);});
    }
}