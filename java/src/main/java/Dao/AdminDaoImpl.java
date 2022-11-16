package Dao;

import Daomin.Admin;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import util.HikariCPUtil;

import java.sql.SQLException;

public class AdminDaoImpl implements AdminDao{
    QueryRunner qr = new QueryRunner(HikariCPUtil.getDataSource());
    @Override
    public Admin getroot(Admin admin) {
        try {
            return qr.query("SELECT * FROM admin WHERE rootname=? AND rootpassword=?;",new BeanHandler<>(Admin.class),admin.getRootname(),admin.getRootpassword());
        }catch (SQLException e){
            throw new RuntimeException("登录失败");
        }
    }
}
