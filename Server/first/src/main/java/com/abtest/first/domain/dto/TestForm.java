package com.abtest.first.domain.dto;

import com.abtest.first.domain.Project;
import lombok.Data;
//import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
//@Document(collection = "test")
public class TestForm {

//    @Id
//    private int id;

//    private String adminCode;

    private String name;
    private String password;

    private String maxPart;

    private List<MultipartFile> image1;
    private List<MultipartFile> image2;


    public TestForm(String name, String password, String maxPart) {
        this.name = name;
        this.password = password;
        this.maxPart = maxPart;
    }

//    private String updateDate;
}
