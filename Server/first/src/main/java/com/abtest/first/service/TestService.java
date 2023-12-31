package com.abtest.first.service;

import com.abtest.first.domain.Test;
import com.abtest.first.repository.TestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class TestService {


    private final TestRepository testRepository;

    public void createTest(Test test) { testRepository.create(test);}

    public void editTest(int projectId, String name, Test test) {
        LocalDateTime now = LocalDateTime.now();
        String formattedDate = now.format(DateTimeFormatter.ofPattern("HH:mm MM/dd"));
        test.setUpdateDate(formattedDate);

        testRepository.edit(projectId, name, test);
    }


    public void deleteTest(String tname, int projectId) {
        Test test = testRepository.findById(projectId ,tname);

        testRepository.delete(projectId ,tname);
    }

    public List<Test> getAllTests(int projectId) {
        return testRepository.findAll(projectId);
    }

    public Test getTestByName(int projectId,String tname) {
           return testRepository.findById(projectId ,tname);
    }

}