import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() book?: Book;  

  constructor() {    
  }

  ngOnInit(): void {    
  }
}
