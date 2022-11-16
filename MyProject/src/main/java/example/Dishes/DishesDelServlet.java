package example.Dishes;

import Daomin.Dishes;
import Server.DishesServer;
import Server.DishesServerImpl;
import lombok.SneakyThrows;
import org.apache.commons.beanutils.BeanUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/DishesDelServlet")
public class DishesDelServlet extends HttpServlet {
    DishesServer dishesServer = new DishesServerImpl();
    @SneakyThrows
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //请求删除菜品
        Integer dishes_id =Integer.valueOf(request.getParameter("dishes_id"));
        Dishes dishes=dishesServer.idGetDishes(dishes_id);
        if(dishes.getDishes_img1()!=null){
            if (!dishes.getDishes_img1().isEmpty()){
                new File(dishes.getDishes_img1()).delete();
            }
            if (!dishes.getDishes_img2().isEmpty()){
                new File(dishes.getDishes_img2()).delete();
            }
            if (!dishes.getDishes_img3().isEmpty()){
                new File(dishes.getDishes_img3()).delete();
            }
            if (!dishes.getDishes_img4().isEmpty()){
                new File(dishes.getDishes_img4()).delete();
            }
            if (!dishes.getDishes_img5().isEmpty()){
                new File(dishes.getDishes_img5()).delete();
            }
        }
        dishesServer.delDishes(dishes_id);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
