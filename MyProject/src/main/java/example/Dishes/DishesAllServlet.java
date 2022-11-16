package example.Dishes;

import Daomin.Dishes;
import Server.DishesServer;
import Server.DishesServerImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/DishesAllServlet")
public class DishesAllServlet extends HttpServlet {
    DishesServer dishesServer = new DishesServerImpl();
    @SneakyThrows
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //查询所有菜品
        List<Dishes> dishesList=dishesServer.AllDishes();
        ObjectMapper objectMapper = new ObjectMapper();
        String dishesList1 = objectMapper.writeValueAsString(dishesList);
        out.write(dishesList1);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
