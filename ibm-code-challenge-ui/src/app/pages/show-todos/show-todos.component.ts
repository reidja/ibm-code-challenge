import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from 'src/app/interfaces/todo.interface';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-show-todos',
  templateUrl: './show-todos.component.html',
  styleUrls: ['./show-todos.component.css']
})
export class ShowTodosComponent implements OnInit {
  todos: Todo[] = [];
  
  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) {}
  
  /**
   * Toggle the completion status of a todo item
   * @param todo The todo item to toggle completion status
   */
  toggleCompletion(todo: Todo) {
    this.todoService.toggleTodo((todo as any)._id, todo).subscribe(() => this.loadTodos());
  }
  
  /**
   * Fetch the todo list
   */
  loadTodos() {
    // Get the list of todos on component load
    this.todoService.getTodos().subscribe(
      // Handle successful fetch of the todo list
      (todos) => {
        this.todos = todos
      },
      // Handle server error
      () => {
        // Open a snackbar to indicate an error occured
        this.snackBar.open('An error occured trying to fetch the todo list, please refresh the app.', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }
  
  ngOnInit() {
    // Get the list of todos on component load
    this.loadTodos();
  }
}
