package Dao;

import Daomin.User;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import util.HikariCPUtil;

import java.sql.SQLException;
import java.util.List;

public class UserDaoImpl implements UserDao{
    QueryRunner qr = new QueryRunner(HikariCPUtil.getDataSource());
    @Override
    public void registerUser(String username, String password, String phone) {
        try {
            qr.update("INSERT INTO `user` VALUE(NULL,?,?,?);",username,password,phone);
        }catch (SQLException e){
            throw new RuntimeException("注册失败");
        }
    }

    @Override
    public User oneUser(User user) {
        try {
            return qr.query("SELECT * FROM `user` WHERE username=? AND `password`=?;",new BeanHandler<>(User.class),user.getUsername(),user.getPassword());
        }catch (SQLException e){
            throw new RuntimeException("未找到该用户");
        }
    }

    @Override
    public List<User> getAllUser() {
        try {
            return qr.query("SELECT * FROM `user`",new BeanListHandler<>(User.class));
        }catch (SQLException e){
            throw new RuntimeException("所有用户查询失败");
        }
    }

    @Override
    public List<User> getNewUser(User user) {
        try {
            qr.update("UPDATE `user` SET username=?,`password`=?,phone=? WHERE id=?;",user.getUsername(),user.getPassword(),user.getPhone(),user.getId());
            return qr.query("SELECT * FROM `user`",new BeanListHandler<>(User.class));
        }catch (SQLException e){
            throw new RuntimeException("所有用户查询失败");
        }
    }

    @Override
    public List<User> delOneUser(String id) {
        try {
            qr.update("DELETE FROM `user` WHERE id=?",id);
            return qr.query("SELECT * FROM `user`",new BeanListHandler<>(User.class));
        }catch (SQLException e){
            throw new RuntimeException("删除用户失败");
        }
    }

    @Override
    public User userMsg(String id) {
        try {
            return qr.query("SELECT * FROM `user` where id=?",new BeanHandler<>(User.class),id);
        }catch (SQLException e){
            throw new RuntimeException("所有用户查询失败");
        }
    }

}
