/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.doan.WedResManage.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

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
@Getter
@Setter
@NamedQueries({
    @NamedQuery(name = "WeddingPartyOrders.findAll", query = "SELECT w FROM WeddingPartyOrders w"),
    @NamedQuery(name = "WeddingPartyOrders.findById", query = "SELECT w FROM WeddingPartyOrders w WHERE w.id = :id"),
    @NamedQuery(name = "WeddingPartyOrders.findByOrderDate", query = "SELECT w FROM WeddingPartyOrders w WHERE w.orderDate = :orderDate"),
    @NamedQuery(name = "WeddingPartyOrders.findByAmount", query = "SELECT w FROM WeddingPartyOrders w WHERE w.amount = :amount"),
    @NamedQuery(name = "WeddingPartyOrders.findByPaymentStatus", query = "SELECT w FROM WeddingPartyOrders w WHERE w.status = :paymentStatus"),
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
    @Column(name = "status")
    private int status;
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
    //@JsonIgnore
    private ListService listServiceId;
    @JoinColumn(name = "menu_id", referencedColumnName = "id")
    @OneToOne(optional = false)
    //@JsonIgnore
    private Menu menuId;
    @JoinColumn(name = "pwt_id", referencedColumnName = "id")
    @ManyToOne
    private PriceWeddingTime pwtId;
    @JoinColumn(name = "type_party", referencedColumnName = "id")
    @ManyToOne
    //@JsonIgnore
    private TypeParty typeParty;
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    //@JsonIgnore
    @ManyToOne(optional = false)
    private User userId;
    @JoinColumn(name = "wh_id", referencedColumnName = "id")
    //@JsonIgnore
    @ManyToOne
    private WeddingHall whId;

    public WeddingPartyOrders(Integer id, Date orderDate, int amount, int status, String typePay, int quantityTable) {
        this.id = id;
        this.orderDate = orderDate;
        this.amount = amount;
        this.status = status;
        this.typePay = typePay;
        this.quantityTable = quantityTable;
    }

    public WeddingPartyOrders() {

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
