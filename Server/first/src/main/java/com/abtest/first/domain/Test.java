package com.abtest.first.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Document(collection = "tests")

public class Test {

//    @Id
    private int projectId;

    private String name;

    private String password;

    private int maxPart;

    private int numOfSets;

    private int score;

    private String updateDate;


    private UploadFile image1;
    private UploadFile image2;
    private UploadFile csvFile;

    @Builder
    public Test(String name, String password, int maxPart) {
        this.name = name;
        this.password = password;
        this.maxPart = maxPart;
        LocalDateTime now = LocalDateTime.now();
        String formattedDate = now.format(DateTimeFormatter.ofPattern("HH:mm, yyyy-MM-dd"));
        this.updateDate = formattedDate;
    }
}
