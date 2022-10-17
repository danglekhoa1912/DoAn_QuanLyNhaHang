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
@Table(name = "dish")
@XmlRootElement
@NamedQueries({
        @NamedQuery(name = "Dish.findAll", query = "SELECT d FROM Dish d"),
        @NamedQuery(name = "Dish.findById", query = "SELECT d FROM Dish d WHERE d.id = :id"),
        @NamedQuery(name = "Dish.findByName", query = "SELECT d FROM Dish d WHERE d.name = :name"),
        @NamedQuery(name = "Dish.findByImgae", query = "SELECT d FROM Dish d WHERE d.imgae = :imgae")})
public class Dish implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Column(name = "price")
    private int price;

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 45)
    @Column(name = "name")
    private String name;
    @Basic(optional = false)
    @NotNull
    @Column(name = "imgae")
    private String imgae;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "dishId")
    @JsonIgnore
    private Set<MenuDish> menuDishSet;
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    //@JsonIgnore
    private CategoryDish categoryId;


    public Dish() {
    }

    public Dish(Integer id) {
        this.id = id;
    }

    public Dish(Integer id, String name, String imgae) {
        this.id = id;
        this.name = name;
        this.imgae = imgae;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImgae() {
        return imgae;
    }

    public void setImgae(String imgae) {
        this.imgae = imgae;
    }

    @XmlTransient
    public Set<MenuDish> getMenuDishSet() {
        return menuDishSet;
    }

    public void setMenuDishSet(Set<MenuDish> menuDishSet) {
        this.menuDishSet = menuDishSet;
    }

    public CategoryDish getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(CategoryDish categoryId) {
        this.categoryId = categoryId;
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
        if (!(object instanceof Dish)) {
            return false;
        }
        Dish other = (Dish) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.WedResManage.pojo.Dish[ id=" + id + " ]";
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

}