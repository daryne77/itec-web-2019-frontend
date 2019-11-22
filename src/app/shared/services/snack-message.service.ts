import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class SnackMessageService {
    private DEFAULT_DURATION = 10 * 1000;

    constructor(private snackBar: MatSnackBar) {

    }

    public clear(): void {
        this.snackBar.dismiss();
    }

    public display(message: string, duration = this.DEFAULT_DURATION): void {
        setTimeout(() => {
            this.snackBar.open(message, 'OK', {
                duration: duration,
            });
        });
    }

    public showErrorMessage(message: string) {
        this.display(`${message}`);
    }

    public showError(response: any): void {
        try {
            let finalMessage;
            if (response.error && response. error.data && typeof response.error.data === 'string') {
                finalMessage = response.error.data;
            } else {
                finalMessage = response.error.data.map(x => x.description).join(' ');
            }
            this.showErrorMessage(finalMessage);
        } catch (error) {
            this.display('Oops! Something went wrong!');
        }
    }
}
