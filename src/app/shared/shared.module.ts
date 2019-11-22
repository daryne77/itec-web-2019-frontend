import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';
import { SnackMessageService } from '@shared/services/snack-message.service';

const matImports = [
    MatSnackBarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
];

const exportableComponents = [
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
            ],
        };
    }
}
