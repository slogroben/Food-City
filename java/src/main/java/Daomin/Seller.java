package Daomin;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Seller implements Serializable {
    private String shop_id;
    private String shopname;
    private String area;
    private String address;
    private String shoptype;
    private String state;
    private String shopphone;
    private String worktime;
    private String imgurl;
    private String description;
    private String sellerphone;
    private String ispass;
    private String shopstate;
}
