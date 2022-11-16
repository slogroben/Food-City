package Dao;

import Daomin.Seller;

import java.util.List;

public interface SellerDao {
    void addNewSeller(Seller seller);

    Seller getShopMsg(String sellerphone);

    List<Seller> getNoPassSeller(String ispass);

    List<Seller> passSeller(String shop_id);

    List<Seller> rejectSeller(String shop_id);

    List<Seller> quitSeller(String shopstate);

    List<Seller> isQuitSeller(String shop_id, String shopstate);

    List<Seller> findOperateSeller();

    List<Seller> delOneSeller(String shop_id);

    Seller sellIsQuit(String id);

    Seller sellNoQuit(String id);

    Seller isRegister(String sellerphone);

    List<Seller> findAllSeller();

    Seller IDfindSeller(String shop_id);
}
