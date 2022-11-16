package example.Admin;

import Daomin.User;
import Server.UserServer;
import Server.UserServerImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.beanutils.BeanUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/AdminDelUserServlet")
public class AdminDelUserServlet extends HttpServlet {
    UserServer userServer = new UserServerImpl();
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //接到删除用户请求
        String id = request.getParameter("id");
        List<User> newUserList=userServer.delOneUser(id);
        ObjectMapper objectMapper = new ObjectMapper();
        String newUserList1 = objectMapper.writeValueAsString(newUserList);
        out.write(newUserList1);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
