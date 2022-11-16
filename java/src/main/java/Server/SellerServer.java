package Server;

import Daomin.Seller;

import java.util.List;

public interface SellerServer {
    void registerSeller(Seller seller);

    Seller sellerLogin(String sellerphone);

    List<Seller> findAllNoPassSeller(String ispass);

    List<Seller> passSeller(String shop_id);

    List<Seller> rejectSeller(String shop_id);

    List<Seller> findQuitNoPassSeller(String shopstate);

    List<Seller> isQuitSeller(String shop_id, String shopstate);

    List<Seller> findOperateSeller();

    List<Seller> DelOneSeller(String shop_id);

    Seller sellerIsQuit(String id);

    Seller sellerNoQuit(String id);

    Seller isRegister(String sellerphone);

    List<Seller> findAllSeller();

    Seller IDfindSeller(String shop_id);
}
