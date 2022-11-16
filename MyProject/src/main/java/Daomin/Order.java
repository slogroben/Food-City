package Daomin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order implements Serializable{
    private Integer order_id;
    private String order_title;
    private String order_img1;
    private Integer order_price;
    private Integer order_num;
    private String order_state;
    private Integer user_id;
    public String Restate;
}
