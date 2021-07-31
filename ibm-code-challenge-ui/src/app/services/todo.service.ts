import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT, LocationStrategy } from '@angular/common';
import { Observable } from 'rxjs';
import { Todo } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private readonly document: any,
    private readonly locationStrategy: LocationStrategy
  ) {}
  
  /**
   * Get the URL to the API.
   * Since its being proxied on a sub-path we need to get the origin and baseHref so we
   * can calculate the correct path to the API.
   */
  get apiUrl(): string {
    /** URL to the todo API */
    const basePath = `${this.document.location.origin}${this.locationStrategy.getBaseHref()}`;
    const apiPath = 'api/v1/todos';
    return `${basePath}${apiPath}`
  }
  
  /**
   * Create a new todo item on the server
   * @param todo The new todo item to create
   * @returns 
   */
  newTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }
  
  /**
   * Retrieve a todo item from the server
   * @param id The unique id of the todo item
   * @returns The todo item
   */
  getTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }
  
  /**
   * Retrieve all todos from the server
   * @returns A list of todo items
   */
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}`);
  }
  
  /** 
   * Update a todo item on the server 
   * @param id The unique id of the todo item
   * @param todo The updated todo item 
   */
  updateTodo(id: string, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, todo);
  }
  
  /**
   * Toggle a todo's complete on the server
   * @param id The unique id of the todo item
   * @param todo The todo to toggle
   */
  toggleTodo(id: string, todo: Todo): Observable<Todo> {
    return this.updateTodo(id, {
      ...todo,
      completed: !todo.completed
    });
  }
  
  /**
   * Delete a todo item from the server
   * @param id The unique id of the todo item
   * @returns 
   */
  deleteTodo(id: string): Observable<Todo> {
    return this.http.delete<Todo>(`${this.apiUrl}/${id}`);
  }
}
