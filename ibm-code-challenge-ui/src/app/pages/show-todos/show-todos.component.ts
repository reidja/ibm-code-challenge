import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { enterExitAnimation } from 'src/app/animations/enter-exit';
import { Todo } from 'src/app/interfaces/todo.interface';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-show-todos',
  templateUrl: './show-todos.component.html',
  styleUrls: ['./show-todos.component.css'],
  animations: [
    enterExitAnimation
  ]
})
export class ShowTodosComponent implements OnInit {
  todos: Todo[] = [];
  loaded: boolean = false;
  
  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) {}
  
  /**
   * Toggle the completion status of a todo item
   * @param todo The todo item to toggle completion status
   */
  toggleCompletion(todo: Todo) {
    this.todoService.toggleTodo(todo).subscribe(() => this.loadTodos());
  }
  
  /**
   * Change the priority for a todo item
   * @param todoPriority
   */
  changePriority(todoPriority: [Todo, number]) {
    const [todo, priority] = todoPriority;
    this.todoService.changePriority(todo, priority).subscribe(() => this.loadTodos());
  }
  
  /**
   * Fetch the todo list
   */
  loadTodos() {
    this.loaded = false;
    // Get the list of todos on component load
    this.todoService.getTodos().subscribe(
      // Handle successful fetch of the todo list
      (todos) => {
        this.loaded = true;
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
