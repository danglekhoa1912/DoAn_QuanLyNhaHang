/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.doan.WedResManage.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.Set;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author giahu
 */
@Entity
@Table(name = "type_party")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "TypeParty.findAll", query = "SELECT t FROM TypeParty t"),
    @NamedQuery(name = "TypeParty.findById", query = "SELECT t FROM TypeParty t WHERE t.id = :id"),
    @NamedQuery(name = "TypeParty.findByNameParty", query = "SELECT t FROM TypeParty t WHERE t.nameParty = :nameParty"),
    @NamedQuery(name = "TypeParty.findByImageType", query = "SELECT t FROM TypeParty t WHERE t.imageType = :imageType")})
public class TypeParty implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 45)
    @Column(name = "name_party")
    private String nameParty;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 120)
    @Column(name = "image_type")
    private String imageType;
    @OneToMany(mappedBy = "typeParty")
    @JsonIgnore
    private Set<WeddingPartyOrders> weddingPartyOrdersSet;

    public TypeParty() {
    }

    public TypeParty(Integer id) {
        this.id = id;
    }

    public TypeParty(Integer id, String nameParty, String imageType) {
        this.id = id;
        this.nameParty = nameParty;
        this.imageType = imageType;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNameParty() {
        return nameParty;
    }

    public void setNameParty(String nameParty) {
        this.nameParty = nameParty;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
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
        if (!(object instanceof TypeParty)) {
            return false;
        }
        TypeParty other = (TypeParty) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.doan.WedResManage.pojo.TypeParty[ id=" + id + " ]";
    }
    
}
