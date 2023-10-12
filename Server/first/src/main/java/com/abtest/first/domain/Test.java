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

    private int id;

    private String name;
    private String password;

    private int maxParticipants;

    private String updateDate;

    private UploadFile csvFile;

    private List<UploadFile> imageFiles1;
    private List<UploadFile> imageFiles2;

    @Builder
    public Test(String name, String password) {
        this.name = name;
        this.password = password;

        LocalDateTime now = LocalDateTime.now();
        String formattedDate = now.format(DateTimeFormatter.ofPattern("HH:mm, yyyy-MM-dd"));
        this.updateDate = formattedDate;
    }
}
