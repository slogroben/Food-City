package Daomin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dishes implements Serializable{
    private Integer dishes_id;
    private String dishes_title;
    private String dishes_type;
    private String dishes_img1;
    private String dishes_img2;
    private String dishes_img3;
    private String dishes_img4;
    private String dishes_img5;
    private Integer dishes_price;
    private String dishes_description;
    private Integer shop_id;
}
