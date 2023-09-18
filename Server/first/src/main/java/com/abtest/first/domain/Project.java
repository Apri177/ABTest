package com.abtest.first.domain;

import lombok.Data;

import java.util.List;

@Data
public class Project {

    private int id;

    private String adminCode;

    private String name;
    private String content;

    private String updateDate;
}
