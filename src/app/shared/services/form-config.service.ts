import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElementConfig } from '@gf/model/config.interface';
import { ConstantsService } from '@core/services/constants.service';
import { Observable, Observer, of } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import FieldConfig from '@gf/model/field-config.interface';
import { Validators } from '@angular/forms';
import { GenericFormConfigBuildHelperService } from '@gf/services/generic-form-config-build-helper.service';

@Injectable()
export class FormConfigService {

    private swaggerDoc: any;

    private docRequestObservable: Observable<any>;
    private loadingDoc: boolean;

    constructor(private http: HttpClient,
                private constants: ConstantsService,
                private gfFormBuilderHelper: GenericFormConfigBuildHelperService) {
        const docUrl = constants.apiUrl + 'ModelMetadata/GetTranslatedSwaggerJson';

        const observers: Observer<any>[] = [];
        this.docRequestObservable = new Observable(observer => {
            observers.push(observer);

            if (!this.loadingDoc) {
                this.http.get(docUrl).subscribe((result: { data: any }) => {
                    this.swaggerDoc = result.data;
                    for (const observer2 of observers) {
                        observer2.next(result);
                        observer2.complete();
                    }
                });
                this.loadingDoc = true;
            }

        });

    }

    public getConfig(defName: string, refModel?: any): Observable<ElementConfig[]> {
        if (!this.swaggerDoc) {
            return this.docRequestObservable.pipe(map(result => {
                return this.processDefinition(defName, refModel);
            }));
        }

        return of(this.processDefinition(defName, refModel));
    }

    private setCategories(config: ElementConfig[]) {
        const categories = new Set(config.map((x: any) => x.category));

        // Add delimiters
        categories.forEach(category => {
            if (!category) {
                return;
            }
            // Find first item with that category
            const index = config.findIndex((x: any) => x.category === category);

            config.splice(index, 0, this.gfFormBuilderHelper.makeViewElement('delimiter'));
            config.splice(index, 0, this.gfFormBuilderHelper.makeViewElement('text', category));
        });
    }

    private processDefinition(defName: string, refModel?: any): ElementConfig[] {
        const definition = this.swaggerDoc.definitions[defName];
        if (!definition) {
            throw new Error('No definition for ' + defName + ' in Swagger Document!');
        }

        const config = this.mapDefinitionToConfig(definition, refModel);

        this.setCategories(config);

        return config;
    }

    private mapDefinitionToConfig(definition: any, refModel?: any): ElementConfig[] {
        const config = [];
        const props = definition.properties;
        for (const definitionKey in props) {
            if (!props.hasOwnProperty(definitionKey)) {
                continue;
            }
            const prop = props[definitionKey];
            if (!prop.usedInGenericForm) {
                continue;
            }
            const element = this.mapPropToElement(prop, definitionKey);
            if (refModel) {
                element.finalModel = refModel;
            }
            config.push(element);
        }
        return config;
    }

    private mapPropToElement(property: any, name: string): FieldConfig {
        const element = Object.assign({}, property, {
            name: name,
            type: property.customFormat || property.format || 'input',
            validation: [],
            errorMessages: {},
            value: property.default,
        });

        this.buildValidators(property, element);

        return element;
    }

    private buildValidators(property: any, element: any) {
        const validators: { name: string, args: any, message: string }[] = property.validators;

        for (const validator of validators) {
            if (Validators.hasOwnProperty(validator.name)) {
                let fValidator = Validators[validator.name];
                if (typeof validator.args !== 'undefined') {
                    fValidator = fValidator(validator.args);
                }
                element.validation.push(fValidator);
                element.errorMessages[validator.name.toLowerCase()] = validator.message || 'still no';
            }
        }
    }
}
