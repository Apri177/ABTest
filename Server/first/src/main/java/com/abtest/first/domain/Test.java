package com.abtest.first.domain;

import lombok.Data;

import java.util.List;

@Data
public class Test {

    private Project project;

    private int id;

    private String password;

    private String name;
    private int maxParticipants;

    private String updateDate;

    private List<UploadFile> imageFiles;
}
