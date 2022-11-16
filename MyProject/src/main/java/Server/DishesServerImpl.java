package Server;

import Dao.DishesDao;
import Dao.DishesDaoImpl;
import Daomin.Dishes;

import java.util.HashMap;
import java.util.List;

public class DishesServerImpl implements DishesServer{
    DishesDao dishesDao = new DishesDaoImpl();
    @Override
    public void addNewDishes(Dishes dishes) {
        dishesDao.addNewDishes(dishes);
    }

    @Override
    public List<Dishes> FindAllDishes(Integer shop_id) {
        return dishesDao.findAllDishes(shop_id);
    }

    @Override
    public List<Dishes> reviseDishes(Dishes dishes) {
        return dishesDao.reviseDishes(dishes);
    }

    @Override
    public void delDishes(Integer dishes_id) {
        dishesDao.delDishes(dishes_id);
    }

    @Override
    public List<Dishes> AllDishes() {
        return dishesDao.allDishes();
    }

    @Override
    public Dishes idGetDishes(Integer dishes_id) {
        return dishesDao.idGetDishes(dishes_id);
    }

    @Override
    public String delImgPath(String dishes_id, String img) {
        return dishesDao.delImgPath(dishes_id,img);
    }

}
