import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../interfaces/todo.interface';
import { TodoService } from '../../services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html'
})
export class AddTodoComponent {
  addForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    priority: new FormControl('0', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });
  
  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  
  /**
   * Get an error string for the priority field
   */
   getPriorityError(): string {
    if(this.addForm.controls.priority.hasError('required')) {
      return 'You must set a priority'
    }
    return '';
  }
  
  /**
   * Get an error string for the title field
   */
  getTitleError(): string {
    if(this.addForm.controls.title.hasError('required')) {
      return 'You must enter a title';
    }
    return '';
  }
  
  /**
   * Get an error string for the description field
   */
  getDescriptionError(): string {
    if(this.addForm.controls.description.hasError('required')) {
      return 'You must enter a description';
    }
    return '';
  }
  
  onSubmit(): void {
    // Ensure the form is valid before submitting
    if(!this.addForm.valid) {
      return;
    }

    /** The todo item to send to the server */
    const todo: Todo = {
      title: this.addForm.controls.title.value,
      description: this.addForm.controls.description.value,
      completed: false,
      priority: Number(this.addForm.controls.priority.value)
    }
    
    // Create a new task on the server
    this.todoService.newTodo(todo).subscribe(
      // Handle successful creation of the todo item
      (newTodo) => {
        // Open a snackbar when the todo item is created
        this.snackBar.open('Your new item has been created!', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000, // 3s
        });
        
        // Redirect the user to the todo list
        this.router.navigate(['todos']);
      },
      // Handle server errors
      () => {
        // Open a snackbar to indicate an error occured
        this.snackBar.open('An error occured, please try again!', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }
}
