package util;

import com.zaxxer.hikari.HikariDataSource;

import javax.sql.DataSource;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

public class HikariCPUtil {
    private static HikariDataSource dataSource = new HikariDataSource();
    static {
        try {
            ClassLoader cl = HikariCPUtil.class.getClassLoader();
            InputStream in = cl.getResourceAsStream("jdbc.properties");
            Properties properties = new Properties();
            properties.load(in);
            dataSource.setDriverClassName(properties.getProperty("jdbc.driverClassName"));
            dataSource.setJdbcUrl(properties.getProperty("jdbc.url"));
            dataSource.setUsername(properties.getProperty("jdbc.username"));
            dataSource.setPassword(properties.getProperty("jdbc.password"));
        }catch (IOException e){
            System.out.println("数据库连接池连接失败");
            e.printStackTrace();
        }
    }
    public static DataSource getDataSource(){
        return dataSource;
    }
    public static Connection getConnection() {
        try {
            return dataSource.getConnection();
        }catch (SQLException e){
            throw new RuntimeException("连接失败",e);
        }

    }
}
