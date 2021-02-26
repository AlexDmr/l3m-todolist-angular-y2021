import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem, TodoList, TodolistService } from '../todolist.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  constructor(private TDLS: TodolistService) { }

  ngOnInit(): void {
  }

  get obsTodoList(): Observable<TodoList> {
    return this.TDLS.observable;
  }

  append(label: string): void {
    this.TDLS.append(label);
  }

  updateItem(item: TodoItem, u: Partial<TodoItem>): void {
    this.TDLS.update(u, item);
  }

  delete(item: TodoItem): void {
    this.TDLS.remove(item);
  }

}
