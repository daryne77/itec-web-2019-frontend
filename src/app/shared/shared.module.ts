import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';
import { SnackMessageService } from '@shared/services/snack-message.service';
import { FormConfigService } from '@shared/services/form-config.service';
import { PageHeadingComponent } from '@shared/components/page-heading/page-heading.component';

const matImports = [
    MatSnackBarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
];

const exportableComponents = [
    PageHeadingComponent,
];

@NgModule({
    declarations: [
        ...exportableComponents,
    ],
    imports: [
        CommonModule,
        ...matImports,
    ],
    exports: [
        ...exportableComponents,
    ],
})
export class SharedModule {
    public static forRoot() {
        return {
            ngModule: SharedModule,
            providers: [
                SnackMessageService,
                FormConfigService,
            ],
        };
    }
}
