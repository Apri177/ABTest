package com.abtest.first.domain;

import lombok.Builder;
import lombok.Data;
//import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Data
//@Document(collection = "tests")
public class Test {

//    private int id;

    private String name;
    private String password;

    private int maxPart;

//    private String updateDate;

//    private UploadFile csvFile;

    private List<UploadFile> image1;
    private List<UploadFile> images2;

    @Builder
    public Test(String name, String password, int maxPart) {
        this.name = name;
        this.password = password;
        this.maxPart = maxPart;

//        LocalDateTime now = LocalDateTime.now();
//        String formattedDate = now.format(DateTimeFormatter.ofPattern("HH:mm, yyyy-MM-dd"));
//        this.updateDate = formattedDate;
    }
}
