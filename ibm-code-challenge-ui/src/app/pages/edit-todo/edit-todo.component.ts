import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../interfaces/todo.interface';
import { TodoService } from '../../services/todo.service';
import { EditTodoDeleteDialogComponent } from './edit-todo-delete-dialog.component';
import { enterExitAnimation } from 'src/app/animations/enter-exit';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css'],
  animations: [
    enterExitAnimation,
  ]
})
export class EditTodoComponent implements OnInit {
  /** Is the data from the server loaded? */
  loaded: boolean = false;
  
  /** Form controls for editing the todo */
  /** @TODO - make common with add */
  editForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    priority: new FormControl('0', [Validators.required]),
    completed: new FormControl('', [])
  });
  
  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {}
  
  /**
   * Get an error string for the title field
   */
  getTitleError(): string {
    if(this.editForm.controls.title.hasError('required')) {
      return 'You must enter a title';
    }
    return '';
  }

  /**
   * Get an error string for the description field
   */
  getDescriptionError(): string {
    if(this.editForm.controls.description.hasError('required')) {
      return 'You must enter a description';
    }
    return '';
  }
  
  /**
   * Get an error string for the priority field
   */
  getPriorityError(): string {
    if(this.editForm.controls.priority.hasError('required')) {
      return 'You must set a priority'
    }
    return '';
  }
  
  /**
   * Called when saving a todo item
   */
  onSubmit(): void {
    // Ensure the form is valid before submitting
    if(!this.editForm.valid) {
      return;
    }
    
    /** The id of the todo item */
    const id = this.activatedRoute.snapshot.params.id;
    
    /** The todo item to update on the server */
    const todo: Todo = {
      title: this.editForm.controls.title.value,
      description: this.editForm.controls.description.value,
      completed: this.editForm.controls.completed.value,
      priority: this.editForm.controls.priority.value
    }
    
    // Update the todo item on the server
    this.todoService.updateTodo(id,  todo).subscribe(
      // Handle successful update of the todo item
      () => {
        // Open a snackbar when the todo item is updated
        this.snackBar.open('Your todo has been saved!', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000, // 3s
        });
      },
      // Handle server error
      () => {
        // Open a snackbar to indicate an error occured
        this.snackBar.open('An error occured, please try again!', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );    
  }
  
  /**
   * Called when deleting a todo item
   */
  onDelete(): void {
    /** The id of the todo item */
    const id = this.activatedRoute.snapshot.params.id;
    
    /** Ref to the dialog */
    const dialogRef = this.dialog.open(EditTodoDeleteDialogComponent);
    
    // Observe when the result returned from the closing of the dialog
    dialogRef.afterClosed().subscribe(confirmDelete => {
      if(confirmDelete) {
        // Delete the todo item from the server
        this.todoService.deleteTodo(id).subscribe(
          // Handle successful deletion of the todo item
          () => {
            // Open a snackbar when the todo item is created on the server
            this.snackBar.open('Your todo has been deleted!', 'OK', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000, // 3s
            });
            
            // Redirect the user back to the todo list
            this.router.navigate(['todos']);
          },
          // Handle server errors
          () => {
            // Open a snackbar to indicate an error has occured
            this.snackBar.open('An error occured, please try again!', 'OK', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        );    
      }
    })
  } 
  
  /**
   * Lifecycle hook called when the component is initialized
   */
  ngOnInit(): void {
    // Observe route parameter changes
    this.activatedRoute.params.subscribe(params => {
      /** The id of the todo item */
      const id = params.id;
      
      // Indicate the content is not yet loaded (used by the template to determine when to render the form)
      this.loaded = false;
      
      // Get the todo item from the server
      this.todoService.getTodo(id).subscribe(todo => {
        // Update the form values with the content returned from the server
        this.editForm.setValue({
          title: todo.title,
          description: todo.description,
          completed: todo.completed,
          priority: `${todo.priority}`
        });
        // Indicate the content is now loaded
        this.loaded = true;
      });
    });
  }
}

