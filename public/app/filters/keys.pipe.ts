import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'values'})
export class KeysPipe implements PipeTransform {
  transform(value: any, args?: any[]): Object[] {

        let keyArr: any[] = Object.keys(value),
            dataArr: Array<string> = [],
            keyName = args[0];

        keyArr.forEach((key: any) => {
            value[key][keyName] = key;
            dataArr.push(value[key])
        });

        if(args[1]) {
            dataArr.sort((a: Object, b: Object): number => {
                return a[keyName] > b[keyName] ? 1 : -1;
            });
        }
        console.log("keys");
        console.log(dataArr);

        return dataArr;
    }
}


