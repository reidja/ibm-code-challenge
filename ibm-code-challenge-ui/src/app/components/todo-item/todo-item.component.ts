import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from '../../interfaces/todo.interface';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() completionToggle: EventEmitter<Todo> = new EventEmitter()
  constructor(
    private router: Router,
    private todoService: TodoService
  ) {}

  /**
   * Handler fired when the user clicks the edit button, navigate them to the edit page
   */
  onEditClick() {
    this.router.navigate(['todos', (this.todo as any)._id]);
  }
  
  /**
   * Get a human readable priority name
   * @param priority
   */
  getPriorityName(priority: number) {
    console.log(priority)
    switch(priority)
    {
      case 0:
        return 'Low'
      case 1:
        return 'Medium';
      case 2:
        return 'High';
      default:
        return ''
    }
  }
  
  /**
   * Handler fired when the user clicks the completion toggle
   * @param todo The todo item to toggle completion on
   */
  onCompletionToggle(todo: Todo) {
    this.completionToggle.emit(todo);
  }
}
