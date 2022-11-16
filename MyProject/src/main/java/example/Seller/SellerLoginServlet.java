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
import java.util.Random;

@WebServlet("/SellerLoginServlet")
public class SellerLoginServlet extends HttpServlet {
    SellerServer sellerServer = new SellerServerImpl();
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        Seller seller=sellerServer.sellerLogin(request.getParameter("sellerphone"));
        request.getSession().setAttribute("seller",seller);
        ObjectMapper objectMapper = new ObjectMapper();
        String seller1 = objectMapper.writeValueAsString(seller);
        out.write(seller1);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
