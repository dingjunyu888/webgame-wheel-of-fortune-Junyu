package com.example.demo;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpSession;

@RestController
public class BookController {
  private final BookRepository bookRepository;

  public BookController(BookRepository bookRepository) {
    this.bookRepository = bookRepository;
  }

  @PostMapping("/saveBook")
  @CrossOrigin(origins = "*")
  public String saveBook(@RequestBody Book book) {
    if (book == null) {
      return "The book is invalid";
    }
    this.bookRepository.save(book);
    return "success";
  }
  
  

  @GetMapping("/findAllBooks")
  @ResponseBody
  @CrossOrigin(origins = "*")
  public List<Book> findAllBooks() {
  	Iterable<Book> books = this.bookRepository.findAll();
    List<Book> bookList = new ArrayList<>();
    books.forEach(bookList::add);
    return bookList;
  }
  /*public String findAllBooks() {
    Iterable<Book> books = this.bookRepository.findAll();
    List<Book> bookList = new ArrayList<>();
    books.forEach(bookList::add);
    return books.toString();
    
  } */
}