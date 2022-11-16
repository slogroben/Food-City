package Server;

import Dao.UserDao;
import Dao.UserDaoImpl;
import Daomin.User;

import java.util.List;

public class UserServerImpl implements UserServer{
    UserDao userDao = new UserDaoImpl();
    @Override
    public void registerUser(String username, String password, String phone) {
        userDao.registerUser(username,password,phone);
    }

    @Override
    public User userLogin(User user) {
        return userDao.oneUser(user);
    }

    @Override
    public List<User> findAllUser() {
        return userDao.getAllUser();
    }

    @Override
    public List<User> reviseUser(User user) {
        return userDao.getNewUser(user);
    }

    @Override
    public List<User> delOneUser(String id) {
        return userDao.delOneUser(id);
    }

    @Override
    public User userMsg(String id) {
        return userDao.userMsg(id);
    }

}
