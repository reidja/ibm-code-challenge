import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-edit-dialog-delete-dialog',
  templateUrl: './edit-todo-delete-dialog.component.html',
})
export class EditTodoDeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<EditTodoDeleteDialogComponent>) {}
  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
