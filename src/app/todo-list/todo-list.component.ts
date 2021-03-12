import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoItem, TodoList, TodolistService } from '../todolist.service';

interface TodoAll extends TodoList {
  remaining: number;
  isAllDone: boolean;
}

type FctFilter = (item: TodoItem) => boolean;

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  readonly obsTodoAll: Observable<TodoAll>;
  readonly fAll:       FctFilter = () => true;
  readonly fCompleted: FctFilter = (it) => it.isDone;
  readonly fActive:    FctFilter = (it) => !it.isDone;
  f: FctFilter = this.fAll;

  constructor(private TDLS: TodolistService) {
    this.obsTodoAll = this.TDLS.observable.pipe(
      map( tdl => ({
        ...tdl,
        remaining: tdl.items.reduce( (n, it) => it.isDone ? n : n + 1, 0),
        isAllDone: !tdl.items.find( this.fActive )
      }) )
    );

  }

  ngOnInit(): void {
  }

  append(label: string): void {
    this.TDLS.append(label);
  }

  updateItem(item: TodoItem, u: Partial<TodoItem>): void {
    this.TDLS.update(u, item);
  }

  updateItems(items: readonly TodoItem[], u: Partial<TodoItem>): void {
    this.TDLS.update(u, ...items);
  }

  delete(item: TodoItem): void {
    this.TDLS.remove(item);
  }

  deleteItems(items: readonly TodoItem[]) {
    this.TDLS.remove( ...items );
  }

  trackById(i: number, e: TodoItem): number {
    return e.id;
  }
}
