package Dao;

import Daomin.Dishes;
import Daomin.Order;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import util.HikariCPUtil;

import java.sql.SQLException;
import java.util.List;

public class OrderDaoImpl implements OrderDao{
    QueryRunner qr = new QueryRunner(HikariCPUtil.getDataSource());
    @Override
    public void addOrder(Order order) {
        try {
            qr.update("INSERT INTO `order` VALUE(NULL,?,?,?,?,'nosum',?)",
                    order.getOrder_title(),
                    order.getOrder_img1(),
                    order.getOrder_price(),
                    order.getOrder_num(),
                    order.getUser_id());
        }catch (SQLException e){
            throw new RuntimeException("订单添加失败");
        }
    }

    @Override
    public List<Order> findNoSumOrder(String user_id) {
        try {
            return qr.query("SELECT * FROM `order` WHERE user_id=? AND order_state='nosum';",new BeanListHandler<>(Order.class),user_id);
        }catch (SQLException e){
            throw new RuntimeException("查询订单失败");
        }
    }

    @Override
    public void delOrder(Order order) {
        try {
            qr.update("DELETE FROM `order` WHERE order_id=? AND user_id=?;",order.getOrder_id(),order.getUser_id());
        }catch (SQLException e){
            throw new RuntimeException("订单删除失败");
        }
    }

    @Override
    public List<Order> findIdOrder(Integer user_id) {
        try {
            return qr.query("SELECT * FROM `order` WHERE user_id=? and order_state!='nosum';",new BeanListHandler<>(Order.class),user_id);
        }catch (SQLException e){
            throw new RuntimeException("查询所有订单失败");
        }
    }

    @Override
    public void IDOrder(Order order) {
        try {
            qr.update("update `order` set order_num=? WHERE order_id=?;",order.getOrder_num(),order.getOrder_id());
        }catch (SQLException e){
            throw new RuntimeException("订单数量更改失败");
        }
    }

    @Override
    public List<Order> IDfindAllOrder(Integer user_id) {
        try {
            return qr.query("SELECT * FROM `order` WHERE user_id=?;",new BeanListHandler<>(Order.class),user_id);
        }catch (SQLException e){
            throw new RuntimeException("查询所有订单无论状态失败");
        }
    }

    @Override
    public void restate(Integer order_id, String restate) {
        try {
            qr.update("update `order` set order_state=?  WHERE order_id=? ;",restate,order_id);
        }catch (SQLException e){
            throw new RuntimeException("订单状态更改失败");
        }
    }

    @Override
    public void addBuy(Order order) {
        try {
            qr.update("INSERT INTO `order` VALUE(NULL,?,?,?,?,?,?)",
                    order.getOrder_title(),
                    order.getOrder_img1(),
                    order.getOrder_price(),
                    order.getOrder_num(),
                    order.getRestate(),
                    order.getUser_id());
        }catch (SQLException e){
            throw new RuntimeException("订单添加失败");
        }
    }
}
