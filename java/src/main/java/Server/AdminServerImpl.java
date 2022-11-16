package Server;

import Dao.AdminDao;
import Dao.AdminDaoImpl;
import Daomin.Admin;

public class AdminServerImpl implements AdminServer{
    AdminDao adminDao  = new AdminDaoImpl();
    @Override
    public Admin adminLogin(Admin admin) {
        return adminDao.getroot(admin);
    }
}
