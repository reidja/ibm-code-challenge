import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { enterExitAnimation } from 'src/app/animations/enter-exit';
import { Todo } from 'src/app/interfaces/todo.interface';
import { TodoService } from '../../services/todo.service';
import { GitBitsDunDialogComponent } from './git-bits-dun-dialog.component';

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
    private snackBar: MatSnackBar,
    private dialog: MatDialog
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
   * Should the Git Bits Dun button be shown?
   * @param todos List of the todos
   * @returns Are there at least 5 uncompleted todos?
   */
  showGitBitsDun(todos: Todo[]) {
    return this.getIncompleteTodos(todos).length >= 5;
  }
  
  /**
   * Get the list of incomplete todos
   * @param todos The full list of todos
   * @returns List of incomplete todos
   */
  getIncompleteTodos(todos: Todo[]) {
    return todos.filter((todo: Todo) => !todo.completed)
  }
  
  /**
   * Called when Gits Bin Dun is selected. Will randomly select an incomplete todo and allow 30 minutes
   * to complete it
   */
  onGitBitsDun(): void {
    const todos = this.getIncompleteTodos(this.todos);
    const randomTodo = todos[Math.floor(Math.random() * todos.length)];
    
    /** Ref to the dialog */
    const dialogRef = this.dialog.open(GitBitsDunDialogComponent, {
      disableClose: true,
      width: '100%',
      data: {
        todo: randomTodo
      }
    });
    
    // Observe when the result is returned from the closing of the dialog
    dialogRef.afterClosed().subscribe(finishedTask => {
      // If the user indicated they finished the task then mark it as complete
      if(finishedTask) {
        this.toggleCompletion(randomTodo);
      }
    })
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
