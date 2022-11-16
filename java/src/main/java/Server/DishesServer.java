package Server;

import Daomin.Dishes;

import java.util.HashMap;
import java.util.List;

public interface DishesServer {
    void addNewDishes(Dishes dishes);

    List<Dishes> FindAllDishes(Integer shop_id);

    List<Dishes> reviseDishes(Dishes dishes);

    void delDishes(Integer dishes_id);

    List<Dishes> AllDishes();

    Dishes idGetDishes(Integer dishes_id);

    String delImgPath(String dishes_id, String img);
}
