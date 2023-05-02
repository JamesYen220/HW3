package com.james.bookstore.repository;
import com.james.bookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book,Integer> {
//    @Query("select b from Book b")
//    List<Book> getBooks();
}
