import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-change-file-name',
    templateUrl: './change-file-name.component.html',
    styleUrls: ['./change-file-name.component.scss']
})
export class ChangeFileNameComponent {

    constructor(
        private dialog: MatDialogRef<ChangeFileNameComponent>,
        @Inject(MAT_DIALOG_DATA)
        public fileName: string
    ) {
    }

    save() {
        this.dialog.close(this.fileName);
    }

}
