package com.abtest.first.domain.dto;

import com.abtest.first.domain.Project;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class TestForm {

    private Project project;

    private int id;

    private String name;
    private String password;

    private int maxParticipants;

    private String updateDate;

    private List<MultipartFile> imageFiles;
}
