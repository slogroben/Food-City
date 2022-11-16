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

@WebServlet("/SellerIsRegisterServlet")
public class SellerIsRegisterServlet extends HttpServlet {
    SellerServer sellerServer = new SellerServerImpl();
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //System.out.println("判断商家是否注册");
        String sellerphone = request.getParameter("sellerphone");
        Seller seller=sellerServer.isRegister(sellerphone);
        if(sellerphone.equals(seller.getSellerphone())){
            out.write("true");
        }else {
            out.write("false");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
