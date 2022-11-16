package example.Captcha;

import lombok.SneakyThrows;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@WebServlet("/CaptchaServlet")
public class CaptchaServlet extends HttpServlet {
    @SneakyThrows
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setContentType("img/jpeg");
        Random random = new Random();
        //生成六位随机验证码
        Integer width =100;
        Integer height =20;
        BufferedImage img = new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB);
        Graphics g = img.getGraphics();
        g.setColor(Color.gray);
        g.drawRect(0,0,width-1,height-1);
        g.setColor(Color.yellow);
        for (int i = 0; i < 5; i++) {
            g.drawLine(random.nextInt(width-1),random.nextInt(height-1),random.nextInt(width-1),random.nextInt(height-1));
        }
        g.setColor(Color.RED);
        String captcha="";
        for (int i = 0; i < 4; i++) {
            Integer num=random.nextInt(10);
            captcha=captcha+num;
            g.setFont(new Font("default", Font.BOLD, 20));
            g.drawString(num+"",10+i*20,20);
        }
        request.getSession().setAttribute("captcha",captcha);
        ImageIO.write(img,"jpg",response.getOutputStream());
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }
}
