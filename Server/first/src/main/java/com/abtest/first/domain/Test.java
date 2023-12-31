package com.abtest.first.domain;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Document(collection = "tests")
public class Test {

    private int projectId;

//    @Id
    private String name;

    private String password;

    private int maxPart;

    private int numOfSets;

    private int score = 0;

    private int tester = 0;

    private String testSel;

    private String testType;

//    private Boolean testResult;

    private TestResult testResult;

    private String updateDate;

    private UploadFile image1;
    private UploadFile image2;
    private UploadFile csvFile;

    @Builder
    public Test(String name, String password, int maxPart, String testSel, String testType) {
        this.name = name;
        this.password = password;
        this.maxPart = maxPart;
        this.testSel = testSel;
        this.testType = testType;
        LocalDateTime now = LocalDateTime.now();
        String formattedDate = now.format(DateTimeFormatter.ofPattern("HH:mm, yyyy-MM-dd"));
        this.updateDate = formattedDate;

    }
}
