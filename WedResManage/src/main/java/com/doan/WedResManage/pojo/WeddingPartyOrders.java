/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.doan.WedResManage.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author giahu
 */
@Entity
@Table(name = "wedding_party_orders")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "WeddingPartyOrders.findAll", query = "SELECT w FROM WeddingPartyOrders w"),
    @NamedQuery(name = "WeddingPartyOrders.findById", query = "SELECT w FROM WeddingPartyOrders w WHERE w.id = :id"),
    @NamedQuery(name = "WeddingPartyOrders.findByOrderDate", query = "SELECT w FROM WeddingPartyOrders w WHERE w.orderDate = :orderDate"),
    @NamedQuery(name = "WeddingPartyOrders.findByAmount", query = "SELECT w FROM WeddingPartyOrders w WHERE w.amount = :amount"),
    @NamedQuery(name = "WeddingPartyOrders.findByPaymentStatus", query = "SELECT w FROM WeddingPartyOrders w WHERE w.paymentStatus = :paymentStatus"),
    @NamedQuery(name = "WeddingPartyOrders.findByTypePay", query = "SELECT w FROM WeddingPartyOrders w WHERE w.typePay = :typePay"),
    @NamedQuery(name = "WeddingPartyOrders.findByQuantityTable", query = "SELECT w FROM WeddingPartyOrders w WHERE w.quantityTable = :quantityTable"),
    @NamedQuery(name = "WeddingPartyOrders.findByNote", query = "SELECT w FROM WeddingPartyOrders w WHERE w.note = :note")})
public class WeddingPartyOrders implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "order_date")
    @Temporal(TemporalType.DATE)
    private Date orderDate;
    @Basic(optional = false)
    @NotNull
    @Column(name = "amount")
    private int amount;
    @Basic(optional = false)
    @NotNull
    @Column(name = "payment_status")
    private boolean paymentStatus;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 45)
    @Column(name = "type_pay")
    private String typePay;
    @Basic(optional = false)
    @NotNull
    @Column(name = "quantity_table")
    private int quantityTable;
    @Size(max = 45)
    @Column(name = "note")
    private String note;
    @JoinColumn(name = "list_service_id", referencedColumnName = "id")
    @OneToOne(optional = false)
    @JsonIgnore
    private ListService listServiceId;
    @JoinColumn(name = "menu_id", referencedColumnName = "id")
    @OneToOne(optional = false)
    @JsonIgnore
    private Menu menuId;
    @JoinColumn(name = "pwt_id", referencedColumnName = "id")
    @JsonIgnore
    @ManyToOne
    private PriceWeddingTime pwtId;
    @JoinColumn(name = "type_party", referencedColumnName = "id")
    @ManyToOne
    @JsonIgnore
    private TypeParty typeParty;
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    @ManyToOne(optional = false)
    private User userId;
    @JoinColumn(name = "wh_id", referencedColumnName = "id")
    @JsonIgnore
    @ManyToOne
    private WeddingHall whId;

    public WeddingPartyOrders() {
    }

    public WeddingPartyOrders(Integer id) {
        this.id = id;
    }

    public WeddingPartyOrders(Integer id, Date orderDate, int amount, boolean paymentStatus, String typePay, int quantityTable) {
        this.id = id;
        this.orderDate = orderDate;
        this.amount = amount;
        this.paymentStatus = paymentStatus;
        this.typePay = typePay;
        this.quantityTable = quantityTable;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public boolean getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(boolean paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getTypePay() {
        return typePay;
    }

    public void setTypePay(String typePay) {
        this.typePay = typePay;
    }

    public int getQuantityTable() {
        return quantityTable;
    }

    public void setQuantityTable(int quantityTable) {
        this.quantityTable = quantityTable;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public ListService getListServiceId() {
        return listServiceId;
    }

    public void setListServiceId(ListService listServiceId) {
        this.listServiceId = listServiceId;
    }

    public Menu getMenuId() {
        return menuId;
    }

    public void setMenuId(Menu menuId) {
        this.menuId = menuId;
    }

    public PriceWeddingTime getPwtId() {
        return pwtId;
    }

    public void setPwtId(PriceWeddingTime pwtId) {
        this.pwtId = pwtId;
    }

    public TypeParty getTypeParty() {
        return typeParty;
    }

    public void setTypeParty(TypeParty typeParty) {
        this.typeParty = typeParty;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public WeddingHall getWhId() {
        return whId;
    }

    public void setWhId(WeddingHall whId) {
        this.whId = whId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof WeddingPartyOrders)) {
            return false;
        }
        WeddingPartyOrders other = (WeddingPartyOrders) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.doan.WedResManage.pojo.WeddingPartyOrders[ id=" + id + " ]";
    }
    
}
