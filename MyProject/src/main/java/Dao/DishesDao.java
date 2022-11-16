package Dao;

import Daomin.Dishes;

import java.util.HashMap;
import java.util.List;

public interface DishesDao {
    void addNewDishes(Dishes dishes);

    List<Dishes> findAllDishes(Integer shop_id);

    List<Dishes> reviseDishes(Dishes dishes);

    void delDishes(Integer dishes_id);

    List<Dishes> allDishes();

    Dishes idGetDishes(Integer dishes_id);

    String delImgPath(String dishes_id, String img);
}
