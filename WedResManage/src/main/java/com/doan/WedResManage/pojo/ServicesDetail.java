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
@Table(name = "services_detail")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ServicesDetail.findAll", query = "SELECT s FROM ServicesDetail s"),
    @NamedQuery(name = "ServicesDetail.findById", query = "SELECT s FROM ServicesDetail s WHERE s.id = :id")})
public class ServicesDetail implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @JsonIgnore
    @Column(name = "id")
    private Integer id;
    @JoinColumn(name = "list_service_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    @JsonIgnore
    private ListService listServiceId;
    @JoinColumn(name = "service_id", referencedColumnName = "id")
    @ManyToOne
    private Service serviceId;

    public ServicesDetail() {
    }

    public ServicesDetail(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ListService getListServiceId() {
        return listServiceId;
    }

    public void setListServiceId(ListService listServiceId) {
        this.listServiceId = listServiceId;
    }

    public Service getServiceId() {
        return serviceId;
    }

    public void setServiceId(Service serviceId) {
        this.serviceId = serviceId;
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
        if (!(object instanceof ServicesDetail)) {
            return false;
        }
        ServicesDetail other = (ServicesDetail) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.doan.WedResManage.pojo.ServicesDetail[ id=" + id + " ]";
    }
    
}
