package Server;

import Daomin.Order;

import java.util.List;

public interface OrderServer {
    void addOrder(Order order);

    List<Order> findNoSumOrder(String user_id);

    void delOrder(Order order);

    List<Order> findIDOrder(Integer user_id);

    void IDOrder(Order order);

    List<Order> IDfindAllOrder(Integer user_id);

    void restate(Integer order_id, String restate);

    void addBuy(Order order);
}
