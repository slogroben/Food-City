package example.Seller;

import Daomin.Seller;
import Server.SellerServer;
import Server.SellerServerImpl;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/SellerAllServlet")
public class SellerAllServlet extends HttpServlet {
    SellerServer sellerServer = new SellerServerImpl();
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //System.out.println("请求所有通过审核商家信息");
        List<Seller> sellerList=sellerServer.findOperateSeller();
        ObjectMapper objectMapper = new ObjectMapper();
        String sellerList1 = objectMapper.writeValueAsString(sellerList);
        out.write(sellerList1);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
