package Dao;

import Daomin.Dishes;
import com.zaxxer.hikari.HikariDataSource;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.*;
import util.HikariCPUtil;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DishesDaoImpl implements DishesDao{
    QueryRunner qr = new QueryRunner(HikariCPUtil.getDataSource());
    @Override
    public void addNewDishes(Dishes dishes) {
        try {
            qr.update("INSERT INTO dishes VALUE(NULL,?,?,?,?,?,?,?,?,?,?);",
                    dishes.getDishes_title(),
                    dishes.getDishes_type(),
                    dishes.getDishes_img1(),
                    dishes.getDishes_img2(),
                    dishes.getDishes_img3(),
                    dishes.getDishes_img4(),
                    dishes.getDishes_img5(),
                    dishes.getDishes_price(),
                    dishes.getDishes_description(),
                    dishes.getShop_id());
        }catch (SQLException e){
            throw new RuntimeException("添加菜品失败");
        }
    }

    @Override
    public List<Dishes> findAllDishes(Integer shop_id) {
        try {
            return qr.query("SELECT * FROM dishes WHERE shop_id=?;",new BeanListHandler<>(Dishes.class),shop_id);
        }catch (SQLException e){
            throw new RuntimeException("查询菜品失败");
        }
    }

    @Override
    public List<Dishes> reviseDishes(Dishes dishes) {
        try {
            qr.update("UPDATE dishes SET dishes_title=?,dishes_type=?,dishes_img1=?,dishes_img2=?,dishes_img3=?,dishes_img4=?,dishes_img5=?,dishes_price=?,dishes_description=? WHERE dishes_id=?;",
                    dishes.getDishes_title(),
                    dishes.getDishes_type(),
                    dishes.getDishes_img1(),
                    dishes.getDishes_img2(),
                    dishes.getDishes_img3(),
                    dishes.getDishes_img4(),
                    dishes.getDishes_img5(),
                    dishes.getDishes_price(),
                    dishes.getDishes_description(),
                    dishes.getDishes_id());
            return qr.query("SELECT * FROM dishes WHERE shop_id=?;",new BeanListHandler<>(Dishes.class),dishes.getShop_id());
        }catch (SQLException e){
            throw new RuntimeException("查询菜品失败");
        }
    }

    @Override
    public void delDishes(Integer dishes_id) {
        try {
            System.out.println("dao");
            qr.update("DELETE FROM dishes WHERE dishes_id=?;",dishes_id);
        }catch (SQLException e){
            throw new RuntimeException("删除菜品失败");
        }
    }

    @Override
    public List<Dishes> allDishes() {
        try {
            return qr.query("SELECT * FROM dishes;",new BeanListHandler<>(Dishes.class));
        }catch (SQLException e){
            throw new RuntimeException("查询所有菜品失败");
        }
    }

    @Override
    public Dishes idGetDishes(Integer dishes_id) {
        try {
            return qr.query("SELECT * FROM dishes where dishes_id=?;",new BeanHandler<>(Dishes.class),dishes_id);
        }catch (SQLException e){
            throw new RuntimeException("根据菜品ID查询菜品失败");
        }
    }

    @Override
    public String delImgPath(String dishes_id, String img) {
        try {
            Map<String, Object> query = qr.query("SELECT * FROM dishes where dishes_id=?;", new MapHandler(), dishes_id);
            String path=(String) query.get(img);
            return path;
        }catch (SQLException e){
            throw new RuntimeException("根据菜品ID查询菜品失败");
        }
    }
}
