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

@WebServlet("/AdminFindQuitSellerServlet")
public class AdminFindQuitSellerServlet extends HttpServlet {
    SellerServer sellerServer = new SellerServerImpl();
    @SneakyThrows
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //接到发现所有请求离开商家请求
        String shopstate = request.getParameter("shopstate");
        List<Seller> sellerQuitList=sellerServer.findQuitNoPassSeller(shopstate);
        ObjectMapper objectMapper = new ObjectMapper();
        String sellerQuitList1 = objectMapper.writeValueAsString(sellerQuitList);
        out.write(sellerQuitList1);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
