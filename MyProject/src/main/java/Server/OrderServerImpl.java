package Server;

import Dao.OrderDao;
import Dao.OrderDaoImpl;
import Daomin.Order;

import java.util.List;

public class OrderServerImpl implements OrderServer{
    OrderDao orderDao = new OrderDaoImpl();
    @Override
    public void addOrder(Order order) {
        orderDao.addOrder(order);
    }

    @Override
    public List<Order> findNoSumOrder(String user_id) {
        return orderDao.findNoSumOrder(user_id);
    }

    @Override
    public void delOrder(Order order) {
        orderDao.delOrder(order);
    }

    @Override
    public List<Order> findIDOrder(Integer user_id) {
        return orderDao.findIdOrder(user_id);
    }

    @Override
    public void IDOrder(Order order) {
        orderDao.IDOrder(order);
    }

    @Override
    public List<Order> IDfindAllOrder(Integer user_id) {
        return orderDao.IDfindAllOrder(user_id);
    }

    @Override
    public void restate(Integer order_id, String restate) {
        orderDao.restate(order_id,restate);
    }

    @Override
    public void addBuy(Order order) {
        orderDao.addBuy(order);
    }


}
