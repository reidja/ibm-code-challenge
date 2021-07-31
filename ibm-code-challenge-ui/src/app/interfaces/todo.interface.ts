/**
 * Interface for a todo item
 */
export interface Todo {
  /** Title of the todo item */
  title: string;

  /** Description of the todo item */
  description: string;

  /** Has the todo item been completed? */
  completed: boolean;
  
  /** The priority for the todo item */
  priority: number;
}
