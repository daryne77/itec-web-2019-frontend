import { Component, Directive, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SnackMessageService } from '@shared/services/snack-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementConfig } from '@gf/model/config.interface';
import { GenericFormComponent } from '@gf/generic-form.component';
import { ProductService } from '@core/services/entity-services/product.service';

@Component({
    selector: 'app-add-product-page',
    templateUrl: './add-product-page.component.html',
    styleUrls: ['./add-product-page.component.scss'],
})
export class AddProductPageComponent {
    @ViewChild('form', { static: false })
    public form: GenericFormComponent;

    @ViewChildren('photoForm')
    public photoForms !: QueryList<GenericFormComponent>;

    public formConfig: ElementConfig[] = [];
    public photoFormConfig: ElementConfig[];
    public photosFormConfig: {config: ElementConfig[]}[] = [];

    public saving: boolean;

    constructor(private snack: SnackMessageService,
                private router: Router,
                private actr: ActivatedRoute,
                private productService: ProductService) {
        this.formConfig = this.actr.snapshot.data.data.formConfig;
        this.photoFormConfig = this.actr.snapshot.data.data.photoFormConfig;
        this.addPhotoForm();
    }

    public async submit() {
        let validPhotoForms = true;
        this.photoForms.forEach((photoForm) => {
            if (!photoForm.valid) {
                photoForm.markAsTouched();
                validPhotoForms = false;
            }
        });

        if (!this.form.valid || !validPhotoForms) {
            this.form.markAsTouched();
            this.snack.showErrorMessage('Verifică formularul!');
            return;
        }
        this.saving = true;

        let thumbnailId: string;
        const photoIds: { id: string }[] = [];
        let first = true;
        this.photoForms.forEach((photoForm) => {
            const fileId = photoForm.value.file.id;
            if (first) {
                thumbnailId = fileId;
                first = false;
            }

            photoIds.push({ id: fileId });
        });

        try {
            const product = await this.productService.create(this.form.value);
            await this.productService.setPhotos(product, thumbnailId, photoIds);
            await this.router.navigate(['my-store']);
            this.snack.display('Succes!');
        } catch (e) {
            this.snack.showError(e);
        }
        this.saving = false;
    }

    public addPhotoForm() {
        this.photosFormConfig.push({ config: this.photoFormConfig });
    }

}
