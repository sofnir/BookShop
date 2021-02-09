import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Book } from '../../../shared/models/book';
import { BookService } from '../../../shared/services/book.service';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.scss']
})
export class AdminBooksComponent implements OnInit, OnDestroy {  
  displayedColumns: string[] = ['title', 'author', 'price', 'category', 'actions'];
  subscribe: Subscription;
  dataSource = new MatTableDataSource<Book>();

  constructor(private bookService: BookService) {
    this.subscribe = this.bookService.getAll().subscribe(books => {
      this.dataSource = new MatTableDataSource(books);
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  delete(id: string) {
    this.bookService.delete(id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
