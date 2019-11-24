import { Component, ViewChild } from '@angular/core';
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

    public formConfig: ElementConfig[] = [];

    public saving: boolean;

    constructor(private snack: SnackMessageService,
                private router: Router,
                private actr: ActivatedRoute,
                private productService: ProductService) {
        this.formConfig = this.actr.snapshot.data.data.formConfig;
    }

    public async submit() {
        if (!this.form.valid) {
            this.form.markAsTouched();
            this.snack.showErrorMessage('Verifică formularul!');
            return;
        }
        this.saving = true;
        try {
            await this.productService.create(this.form.value);
            await this.router.navigate(['my-store']);
            this.snack.display('Succes!');
        } catch (e) {
            this.snack.showError(e);
        }
        this.saving = false;
    }

}
