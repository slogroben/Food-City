package Server;

import Daomin.User;

import java.util.List;

public interface UserServer {
    void registerUser(String username, String password, String phone);

    User userLogin(User user);

    List<User> findAllUser();

    List<User> reviseUser(User user);

    List<User> delOneUser(String id);

    User userMsg(String id);
}
