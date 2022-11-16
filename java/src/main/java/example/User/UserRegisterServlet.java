package example.User;

import Daomin.User;
import Server.UserServer;
import Server.UserServerImpl;
import lombok.SneakyThrows;
import org.apache.commons.beanutils.BeanUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/UserRegisterServlet")
public class UserRegisterServlet extends HttpServlet {
    UserServer userServer = new UserServerImpl();
    @SneakyThrows
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //System.out.println("接到注册请求");
        User user = new User();
        BeanUtils.populate(user,request.getParameterMap());
        String captcha = request.getParameter("captcha");
        userServer.registerUser(user.getUsername(),user.getPassword(),user.getPhone());
        out.write(user.getUsername());
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
