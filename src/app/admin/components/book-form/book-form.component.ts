import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../../../shared/models/book';
import { BookService } from '../../../shared/services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  book: Book | null = null;
  categories = [
    'Adventure',
    'Fantasy',    
    'History'
  ]

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required)    
  })

  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute) {    
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.get(id).subscribe(book => {
        this.book = book;
        this.setFormValues();
      })
    };
  }

  onSubmit(): void {
    let form = this.form.value;
    if (this.book && this.book.id) {
      this.bookService.update(this.book.id, form);
    } else {
      this.bookService.add(form);
    }
    this.router.navigate(['/admin/books']);
  }

  setFormValues(): void {
    this.form.setValue({
      title: this.book?.title,
      author: this.book?.author,
      price: this.book?.price,
      category: this.book?.category,
      imageUrl: this.book?.imageUrl
    })
  }  
}
