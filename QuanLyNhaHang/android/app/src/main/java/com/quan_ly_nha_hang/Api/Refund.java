package com.quan_ly_nha_hang.Api;

import com.quan_ly_nha_hang.Constant.AppInfo;
import com.quan_ly_nha_hang.Helper.Helpers;

import org.json.JSONObject;

import java.util.Date;
import java.util.Random;
import java.util.TimeZone;

import okhttp3.FormBody;
import okhttp3.RequestBody;

public class Refund {

    private class RefundOrderData {
        Long Timestamp;

        String Mrefundid;
        String AppId;
        String Amount;
        String AppTransId;
        String Description;
        String Mac;

        private RefundOrderData(String amount) throws Exception {
            Random rand = new Random();
            Timestamp = System.currentTimeMillis();
            String uid = Timestamp + "" + (111 + rand.nextInt(888));
            AppId = String.valueOf(AppInfo.APP_ID);
            Amount = amount;
            AppTransId = Helpers.getAppTransId();
            Description = "Merchant pay for order #" + Helpers.getAppTransId();

            Mrefundid = Helpers.getCurrentTimeString("yyMMdd")+"_"+ AppId +"_"+uid;
            String inputHMac = String.format("%s|%s|%s|%s|%s|%s|%s",
                    this.AppId,
                    this.AppTransId,
                    this.Amount,
                    this.Description,
                    this.Timestamp);

            Mac = Helpers.getMac(AppInfo.MAC_KEY, inputHMac);
        }
    }

    public JSONObject refundOrder(String amount) throws Exception {
        RefundOrderData input = new RefundOrderData(amount);

        RequestBody formBody = new FormBody.Builder()
                .add("app_id", input.AppId)
                .add("amount", input.Amount)
                .add("app_trans_id", input.AppTransId)
                .add("description", input.Description)
                .add("mac", input.Mac)
                .add("mrefundid",input.Mrefundid)
                .add("timestamp", String.valueOf(input.Timestamp))
                .build();

        JSONObject data = HttpProvider.sendPost(AppInfo.URL_REFUND, formBody);
        return data;
    }

}
