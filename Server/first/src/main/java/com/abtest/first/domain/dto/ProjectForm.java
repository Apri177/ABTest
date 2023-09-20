package com.abtest.first.domain.dto;

import lombok.Data;
//import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
//@Document(collection = "project")
public class ProjectForm {

    private int id;

    private String adminCode;

    private String name;
    private String content;

    private String updateDate;
}
