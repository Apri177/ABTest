package com.abtest.first.domain.dto;

import com.abtest.first.domain.Test;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@Getter
public class ProjectForm {
    private int id;

    private String adminCode;

    private String name;
    private String content;

    private List<Test> tests;

    private String updateDate;
}
