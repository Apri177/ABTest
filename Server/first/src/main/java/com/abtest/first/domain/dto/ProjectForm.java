package com.abtest.first.domain.dto;

import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;

@Data
@Getter
public class ProjectForm {
    private int id;

    private String adminCode;

    private String name;
    private String content;

    private String updateDate;
}
