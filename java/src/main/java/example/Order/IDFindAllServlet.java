package example.Order;

import Daomin.Order;
import Server.OrderServer;
import Server.OrderServerImpl;
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

@WebServlet("/IDFindAllServlet")
public class IDFindAllServlet extends HttpServlet {
    OrderServer orderServer = new OrderServerImpl();
    @SneakyThrows
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //查询根据用户ID查询未结算订单
        Integer user_id = Integer.valueOf(request.getParameter("user_id"));
        List<Order> orderList=orderServer.IDfindAllOrder(user_id);
        ObjectMapper objectMapper = new ObjectMapper();
        String orderList1 = objectMapper.writeValueAsString(orderList);
        out.write(orderList1);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
