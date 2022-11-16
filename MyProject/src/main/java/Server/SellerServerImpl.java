package Server;

import Dao.SellerDao;
import Dao.SellerDaoImpl;
import Daomin.Seller;

import java.util.List;

public class SellerServerImpl implements SellerServer{
    SellerDao sellerDao = new SellerDaoImpl();
    @Override
    public void registerSeller(Seller seller) {
        sellerDao.addNewSeller(seller);

    }

    @Override
    public Seller sellerLogin(String sellerphone) {
        return sellerDao.getShopMsg(sellerphone);
    }

    @Override
    public List<Seller> findAllNoPassSeller(String ispass) {
        return sellerDao.getNoPassSeller(ispass);
    }

    @Override
    public List<Seller> passSeller(String shop_id) {
        return sellerDao.passSeller(shop_id);
    }

    @Override
    public List<Seller> rejectSeller(String shop_id) {
        return sellerDao.rejectSeller(shop_id);
    }

    @Override
    public List<Seller> findQuitNoPassSeller(String shopstate) {
        return sellerDao.quitSeller(shopstate);
    }

    @Override
    public List<Seller> isQuitSeller(String shop_id, String shopstate) {
        return sellerDao.isQuitSeller(shop_id,shopstate);
    }

    @Override
    public List<Seller> findOperateSeller() {
        return sellerDao.findOperateSeller();
    }

    @Override
    public List<Seller> DelOneSeller(String shop_id) {
        return sellerDao.delOneSeller(shop_id);
    }

    @Override
    public Seller sellerIsQuit(String id) {
        return sellerDao.sellIsQuit(id);
    }

    @Override
    public Seller sellerNoQuit(String id) {

        return sellerDao.sellNoQuit(id);
    }

    @Override
    public Seller isRegister(String sellerphone) {
        return sellerDao.isRegister(sellerphone);
    }

    @Override
    public List<Seller> findAllSeller() {
        return sellerDao.findAllSeller();
    }

    @Override
    public Seller IDfindSeller(String shop_id) {
        return sellerDao.IDfindSeller(shop_id);
    }
}
