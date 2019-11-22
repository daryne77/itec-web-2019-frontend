import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ReferencesHelperService {

    public populateReferences(obj) {
        const o = {dict: {}};
        if (obj == null || obj.populated) {
            return;
        }

        try {
            this.recFunc(obj, o.dict);
            obj.populated = true;
        } catch (exc) {
            console.log('can\'t populate?');
            console.error(exc);
        }
        delete o.dict;
    }

    protected recFunc(obj, dict) {
        if (!obj || typeof obj !== 'object') {
            return;
        }
        if (obj['$id'] && !dict[obj['$id']]) {
            dict[obj['$id']] = obj;
            this.ForEachProperty(obj, propName => {
                if (typeof obj[propName] === 'object' && obj[propName]) {
                    if (obj[propName]['$ref']) {
                        const id = obj[propName]['$ref'];
                        obj[propName] = dict[id];
                        obj[propName]['$ref'] = id;
                    } else {
                        this.recFunc(obj[propName], dict);
                    }
                }
            });
        } else if (obj.hasOwnProperty('length')) {
            this.arrayRefFunc(obj, dict);
        }
    }

    protected arrayRefFunc(arr, dict) {
        if (!arr || typeof arr !== 'object') {
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            if (typeof arr[i] === 'object' && arr[i]) {
                if (arr[i]['$ref']) {
                    const id = arr[i]['$ref'];
                    arr[i] = dict[id];
                    arr[i]['$ref'] = id;
                } else {
                    this.recFunc(arr[i], dict);
                }
            }
        }
    }

    protected ForEachProperty(obj: any, func: (propName) => void) {
        for (const pn in obj) {
            if (obj.hasOwnProperty(pn)) {
                func(pn);
            }
        }
    }

}
