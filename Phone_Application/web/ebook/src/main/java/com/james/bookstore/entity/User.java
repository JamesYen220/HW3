package com.james.bookstore.entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@Table(name = "user")
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer", "fieldHandler"})
public class User implements Serializable {

    // @Id = primary key
    @Id
    @Column(name = "user_id")
    // @GeneratedValue = The GenerationType.IDENTITY is the easiest to use but not the best one from a performance point of view.
    // It relies on an auto-incremented database column and lets the database generate a new value with each insert operation.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    private String username;
    private String password;

    @Column(name = "user_type")
    private Integer userType;
    private String email;
    private String address;

    @OneToMany()
    @JoinColumn(name="user_id")
    private List<Order> orders;

    @OneToMany()
    @JoinColumn(name="user_id")
    private List<CartItem> cart;

    // @Transient = When persisting Java objects into database records using an Object-Relational Mapping (ORM) framework, we often want to ignore certain fields.
    // If the framework is compliant with the Java Persistence API (JPA), we can add the @Transient annotation to these fields.
    @Transient
    private String icon;

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getUserId() {
        return this.userId;
    }

    public String getUsername() {
        return this.username;
    }

    public Integer getUserType() {
        return this.userType;
    }

    public List<Order> getOrders() {
        return this.orders;
    }

    public List<CartItem> getCart() {
        return this.cart;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
