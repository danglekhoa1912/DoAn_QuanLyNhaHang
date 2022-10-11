/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.doan.WedResManage.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author giahu
 */
@Entity
@Table(name = "wedding_hall")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "WeddingHall.findAll", query = "SELECT w FROM WeddingHall w"),
        @NamedQuery(name = "WeddingHall.findById", query = "SELECT w FROM WeddingHall w WHERE w.id = :id"),
        @NamedQuery(name = "WeddingHall.findByName", query = "SELECT w FROM WeddingHall w WHERE w.name = :name"),
        @NamedQuery(name = "WeddingHall.findByCapacity", query = "SELECT w FROM WeddingHall w WHERE w.capacity = :capacity"),
        @NamedQuery(name = "WeddingHall.findByDescribe", query = "SELECT w FROM WeddingHall w WHERE w.describe = :describe"),
        @NamedQuery(name = "WeddingHall.findByStatus", query = "SELECT w FROM WeddingHall w WHERE w.status = :status"),
        @NamedQuery(name = "WeddingHall.findByPrice", query = "SELECT w FROM WeddingHall w WHERE w.price = :price"),
        @NamedQuery(name = "WeddingHall.findByImage", query = "SELECT w FROM WeddingHall w WHERE w.image = :image")})
public class WeddingHall implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 45)
    @Column(name = "name")
    private String name;
    @Basic(optional = false)
    @NotNull
    @Column(name = "capacity")
    private int capacity;
    @Size(max = 45)
    @Column(name = "describe_hall")
    private String describe;
    @Size(max = 45)
    @Column(name = "status")
    private String status;
    @Basic(optional = false)
    @NotNull
    @Column(name = "price")
    private int price;
    @Basic(optional = false)
    @NotNull
    @Size(max = 150)
    @Column(name = "image")
    private String image;

    @Transient
    @Nullable
    @JsonIgnore
    private MultipartFile img;

    @Nullable
    public MultipartFile getImg() {
        return img;
    }

    public void setImg(@Nullable MultipartFile img) {
        this.img = img;
    }

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "whId")
    @JsonIgnore
    private Set<WeddingPartyOrders> weddingPartyOrdersSet;

    public WeddingHall() {
    }

    public WeddingHall(Integer id) {
        this.id = id;
    }

    public WeddingHall(Integer id, String name, int capacity, int price, String image) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.price = price;
        this.image = image;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    @XmlTransient
    public Set<WeddingPartyOrders> getWeddingPartyOrdersSet() {
        return weddingPartyOrdersSet;
    }

    public void setWeddingPartyOrdersSet(Set<WeddingPartyOrders> weddingPartyOrdersSet) {
        this.weddingPartyOrdersSet = weddingPartyOrdersSet;
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
        if (!(object instanceof WeddingHall)) {
            return false;
        }
        WeddingHall other = (WeddingHall) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.nhom13.pojo.WeddingHall[ id=" + id + " ]";
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

}
