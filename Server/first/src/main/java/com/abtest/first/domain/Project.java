package com.abtest.first.domain;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Data
@Document(collection = "projects")
public class Project {

    @Id
    private int id;

    private String adminCode;

    private String name;
    private String content;

    private List<Test> tests;

    private String updateDate;

    @Builder
    public Project(String adminCode, String name, String content, List<Test> tests) {
        this.adminCode = adminCode;
        this.name = name;
        this.content = content;

        this.tests = tests;

        LocalDateTime now = LocalDateTime.now();
        String formattedDate = now.format(DateTimeFormatter.ofPattern("HH:mm, yyyy-MM-dd"));
        this.updateDate = formattedDate;
    }
}
