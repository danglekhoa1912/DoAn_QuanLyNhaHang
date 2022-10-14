package com.doan.WedResManage.Controller.DTO;

import java.util.Date;
import java.util.List;

public class OrderRequest {
    private int idUser;
    private int whId;
    private int pwtId;
    private Date orderDate;
    private List<Integer> menu;
    private int amount;
    private Boolean paymentStatus;
    private String typePay;
    private int quantity;
    private String note;
    private List<Integer> service;
    private int type_party;

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public int getWhId() {
        return whId;
    }

    public void setWhId(int whId) {
        this.whId = whId;
    }

    public int getPwtId() {
        return pwtId;
    }

    public void setPwtId(int pwtId) {
        this.pwtId = pwtId;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public List<Integer> getMenu() {
        return menu;
    }

    public void setMenu(List<Integer> menu) {
        this.menu = menu;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Boolean getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(Boolean paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getTypePay() {
        return typePay;
    }

    public void setTypePay(String typePay) {
        this.typePay = typePay;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public List<Integer> getService() {
        return service;
    }

    public void setService(List<Integer> service) {
        this.service = service;
    }

    public int getType_party() {
        return type_party;
    }

    public void setType_party(int type_party) {
        this.type_party = type_party;
    }
}
