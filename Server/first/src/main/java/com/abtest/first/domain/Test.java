package com.abtest.first.domain;

import lombok.Data;
//import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
//@Document(collection = "tests")
public class Test {

    private Project project;

    private int id;

    private String password;

    private String name;
    private int maxParticipants;

    private String updateDate;

    private List<UploadFile> imageFiles;
}
