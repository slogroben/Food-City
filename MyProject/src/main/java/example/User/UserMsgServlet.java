package example.User;

import Daomin.User;
import Server.UserServer;
import Server.UserServerImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.apache.commons.beanutils.BeanUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/UserMsgServlet")
public class UserMsgServlet extends HttpServlet {
    UserServer userServer = new UserServerImpl();
    @SneakyThrows
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //System.out.println("请求用户信息");
        String id = request.getParameter("id");
        User user1=userServer.userMsg(id);
        ObjectMapper objectMapper = new ObjectMapper();
        String user2 = objectMapper.writeValueAsString(user1);
        out.write(user2);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
