/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.doan.WedResManage.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
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
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author giahu
 */
@Entity
@Table(name = "menu_dish")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MenuDish.findAll", query = "SELECT m FROM MenuDish m"),
    @NamedQuery(name = "MenuDish.findById", query = "SELECT m FROM MenuDish m WHERE m.id = :id")})
public class MenuDish implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    //@JsonIgnore
    @JoinColumn(name = "dish_id", referencedColumnName = "id")
    @ManyToOne
    private Dish dishId;
    @JsonIgnore
    @JoinColumn(name = "menu_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Menu menuId;

    public MenuDish() {
    }

    public MenuDish(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Dish getDishId() {
        return dishId;
    }

    public void setDishId(Dish dishId) {
        this.dishId = dishId;
    }

    public Menu getMenuId() {
        return menuId;
    }

    public void setMenuId(Menu menuId) {
        this.menuId = menuId;
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
        if (!(object instanceof MenuDish)) {
            return false;
        }
        MenuDish other = (MenuDish) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.doan.WedResManage.pojo.MenuDish[ id=" + id + " ]";
    }
    
}
