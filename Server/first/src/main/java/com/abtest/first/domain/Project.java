package com.abtest.first.domain;

import lombok.Data;
//import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
//@Document(collection = "projects")
public class Project {

    private int id;

    private String adminCode;

    private String name;
    private String content;

    private String updateDate;
}
