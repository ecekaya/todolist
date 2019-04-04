package com.smartict.blog.dao;

import com.smartict.blog.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

//    User find(Integer id);

//    Boolean existsByUsername(String username);
//
//    Boolean existsByEmail(String email);
//
//    Optional<User> findByUsernameOrEmail(String username, String email);

    @Query(value = "SELECT * FROM todolist.user WHERE tokenId = :tokenId", nativeQuery = true)
    User getByTokenId(@Param("tokenId") String tokenId);

    @Query(value = "SELECT * FROM todolist.user WHERE username = :username", nativeQuery = true)
    User getByUsername(@Param("username") String username);

    @Query(value = "SELECT * FROM todolist.user WHERE username = :username and password= :password and isEnabled=1", nativeQuery = true)
    User getByUsernameAndPassword(@Param("username") String username, @Param("password") String password);
}
