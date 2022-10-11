/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.doan.WedResManage.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.Set;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author giahu
 */
@Entity
@Table(name = "list_service")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ListService.findAll", query = "SELECT l FROM ListService l"),
    @NamedQuery(name = "ListService.findById", query = "SELECT l FROM ListService l WHERE l.id = :id"),
    @NamedQuery(name = "ListService.findByPrice", query = "SELECT l FROM ListService l WHERE l.price = :price")})
public class ListService implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "price")
    private int price;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "listServiceId")
    private Set<ServicesDetail> servicesDetailSet;
    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "listServiceId")
    private WeddingPartyOrders weddingPartyOrders;

    public ListService() {
    }

    public ListService(Integer id) {
        this.id = id;
    }

    public ListService(Integer id, int price) {
        this.id = id;
        this.price = price;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @XmlTransient
    public Set<ServicesDetail> getServicesDetailSet() {
        return servicesDetailSet;
    }

    public void setServicesDetailSet(Set<ServicesDetail> servicesDetailSet) {
        this.servicesDetailSet = servicesDetailSet;
    }
    @XmlTransient
    public WeddingPartyOrders getWeddingPartyOrders() {
        return weddingPartyOrders;
    }

    public void setWeddingPartyOrders(WeddingPartyOrders weddingPartyOrders) {
        this.weddingPartyOrders = weddingPartyOrders;
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
        if (!(object instanceof ListService)) {
            return false;
        }
        ListService other = (ListService) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.doan.WedResManage.pojo.ListService[ id=" + id + " ]";
    }

}
