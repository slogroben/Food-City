package Dao;

import Daomin.Seller;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import util.HikariCPUtil;

import java.sql.SQLException;
import java.util.List;

public class SellerDaoImpl implements SellerDao{
    QueryRunner qr = new QueryRunner(HikariCPUtil.getDataSource());

    @Override
    public void addNewSeller(Seller seller) {
        try {
            qr.update("INSERT INTO shop VALUE(NULL,?,?,?,?,?,?,?,?,?,?,?,?);",
                    seller.getShopname(),
                    seller.getArea(),
                    seller.getAddress(),
                    seller.getShoptype(),
                    seller.getState(),
                    seller.getShopphone(),
                    seller.getWorktime(),
                    seller.getImgurl(),
                    seller.getDescription(),
                    seller.getSellerphone(),
                    seller.getIspass(),
                    seller.getShopstate()
            );
        }catch (SQLException e){
            throw new RuntimeException("注册失败");
        }
    }

    @Override
    public Seller getShopMsg(String sellerphone) {
        try{
            return qr.query("SELECT * FROM shop WHERE sellerphone=?;",new BeanHandler<>(Seller.class),sellerphone);
        }catch (SQLException e){
        throw new RuntimeException("登录失败");
        }
    }

    @Override
    public List<Seller> getNoPassSeller(String ispass) {
        try{
            return qr.query("SELECT * FROM shop WHERE ispass=?;",new BeanListHandler<>(Seller.class),ispass);
        }catch (SQLException e){
            throw new RuntimeException("查询所有未审核商家失败");
        }
    }

    @Override
    public List<Seller> passSeller(String shop_id) {
        try{
            qr.update("UPDATE shop SET ispass='true',shopstate='operate' WHERE shop_id=?;",shop_id);
            return qr.query("SELECT * FROM shop WHERE ispass='false';",new BeanListHandler<>(Seller.class));
        }catch (SQLException e){
            throw new RuntimeException("该商家入驻通过审核失败Dao");
        }
    }

    @Override
    public List<Seller> rejectSeller(String shop_id) {
        try{
            qr.update("UPDATE shop SET ispass='reject',shopstate='reject' WHERE shop_id=?;",shop_id);
            return qr.query("SELECT * FROM shop WHERE ispass='false';",new BeanListHandler<>(Seller.class));
        }catch (SQLException e){
            throw new RuntimeException("该商家入驻被拒绝通过审核失败Dao");
        }
    }

    @Override
    public List<Seller> quitSeller(String shopstate) {
        try{
            return qr.query("SELECT * FROM shop WHERE shopstate=?;",new BeanListHandler<>(Seller.class),shopstate);
        }catch (SQLException e){
            throw new RuntimeException("查询所有未审核商家失败");
        }
    }

    @Override
    public List<Seller> isQuitSeller(String shop_id, String shopstate) {
        try{
            if ("quitpass".equals(shopstate)){
                qr.update("UPDATE shop SET shopstate='quit',ispass='quit' WHERE shop_id=?;",shop_id);
            }
            else if("quitreject".equals(shopstate)){
                qr.update("UPDATE shop SET shopstate='operate' WHERE shop_id=?;",shop_id);
            }
            else {
                System.out.println(shopstate);
            }
            return qr.query("SELECT * FROM shop WHERE shopstate='isquit';",new BeanListHandler<>(Seller.class));
        }catch (SQLException e){
            throw new RuntimeException("查询所有未审核商家失败");
        }
    }

    @Override
    public List<Seller> findOperateSeller() {
        try{
            return qr.query("SELECT * FROM shop WHERE shopstate='operate';",new BeanListHandler<>(Seller.class));
        }catch (SQLException e){
            throw new RuntimeException("查询所有通过审核商家失败");
        }
    }

    @Override
    public List<Seller> delOneSeller(String shop_id) {
        try {
            qr.update("DELETE FROM dishes WHERE shop_id=?",shop_id);
            qr.update("DELETE FROM shop WHERE shop_id=?",shop_id);
            return qr.query("SELECT * FROM shop WHERE shopstate='operate';",new BeanListHandler<>(Seller.class));
        }catch (SQLException e){
            throw new RuntimeException("删除商家失败");
        }
    }

    @Override
    public Seller sellIsQuit(String id) {
        try{
            qr.update("UPDATE shop SET shopstate='isquit' WHERE shop_id=?;",id);
            return qr.query("SELECT * FROM shop WHERE shop_id=?;",new BeanHandler<>(Seller.class),id);
        }catch (SQLException e){
            throw new RuntimeException("该商家请求退出失败Dao");
        }

    }

    @Override
    public Seller sellNoQuit(String id) {
        try{
            qr.update("UPDATE shop SET shopstate='operate' WHERE shop_id=?;",id);
            return qr.query("SELECT * FROM shop WHERE shop_id=?;",new BeanHandler<>(Seller.class),id);
        }catch (SQLException e){
            throw new RuntimeException("该商家取消退出失败Dao");
        }
    }

    @Override
    public Seller isRegister(String sellerphone) {
        try{
            return qr.query("SELECT * FROM shop WHERE sellerphone=?;",new BeanHandler<>(Seller.class),sellerphone);
        }catch (SQLException e){
            throw new RuntimeException("查询商家是否注册失败Dao");
        }
    }

    @Override
    public List<Seller> findAllSeller() {
        try{
            return qr.query("SELECT * FROM shop;",new BeanListHandler<>(Seller.class));
        }catch (SQLException e){
            throw new RuntimeException("查询所有商家失败Dao");
        }
    }

    @Override
    public Seller IDfindSeller(String shop_id) {
        try{
            return qr.query("SELECT * FROM shop where shop_id=?;",new BeanHandler<>(Seller.class),shop_id);
        }catch (SQLException e){
            throw new RuntimeException("查询该商家失败Dao");
        }
    }
}
