package example.Admin;

import Daomin.Seller;
import Server.SellerServer;
import Server.SellerServerImpl;
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

@WebServlet("/AdminRejectSellerServlet")
public class AdminRejectSellerServlet extends HttpServlet {
    SellerServer sellerServer = new SellerServerImpl();
    @SneakyThrows
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //System.out.println("该商家拒绝通过");
        String shop_id = request.getParameter("shop_id");
        List<Seller> sellerList=sellerServer.rejectSeller(shop_id);
        ObjectMapper objectMapper = new ObjectMapper();
        String sellerList1 = objectMapper.writeValueAsString(sellerList);
        out.write(sellerList1);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
