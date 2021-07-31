import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AddTodoComponent } from './pages/add-todo/add-todo.component';
import { EditTodoComponent } from './pages/edit-todo/edit-todo.component';
import { EditTodoDeleteDialogComponent } from './pages/edit-todo/edit-todo-delete-dialog.component';
import { ShowTodosComponent } from './pages/show-todos/show-todos.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

/** Angular Material component modules */
const MaterialModules = [
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatDialogModule,
  MatButtonToggleModule,
  MatDividerModule
]

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    AddTodoComponent,
    EditTodoComponent,
    EditTodoDeleteDialogComponent,
    ShowTodosComponent,
    TodoItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ...MaterialModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
