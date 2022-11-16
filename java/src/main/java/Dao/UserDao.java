package Dao;

import Daomin.User;

import java.util.List;

public interface UserDao {
    void registerUser(String username, String password, String phone);

    User oneUser(User user);

    List<User> getAllUser();

    List<User> getNewUser(User user);

    List<User> delOneUser(String id);

    User userMsg(String id);
}
