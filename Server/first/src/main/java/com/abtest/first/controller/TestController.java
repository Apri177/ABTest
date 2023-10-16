package com.abtest.first.controller;

import com.abtest.first.domain.FileStore;
import com.abtest.first.domain.Test;
import com.abtest.first.domain.UploadFile;
import com.abtest.first.domain.dto.TestForm;
import com.abtest.first.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class TestController {

    private final TestService testService;
    private final FileStore fileStore;

    @PostMapping("/api/project/{id}/test/create")
    public TestForm testFilesStore(
            HttpServletRequest request,
            @RequestPart(value = "body") TestForm temp,
            @RequestPart(value = "images") MultipartFile[] multipartFiles
            // Request Body로 받으면 될 듯????
            // Request Part나 Param으로 받아야하나..

    ) throws IOException, ServletException {

//        System.out.println(Arrays.toString(multipartFiles));
        System.out.println(request);
        System.out.println(temp);
        System.out.println(multipartFiles);

//        Test test = new Test(form.getName(),form.getPassword());
//        test.setName(form.getName());
//        test.setPassword(form.getPassword());
//        test.setMaxParticipants(form.getMaxParticipants());
//
//        LocalDateTime now = LocalDateTime.now();
//        String formattedDate = now.format(DateTimeFormatter.ofPattern("HH-mm MM/dd"));
//        test.setUpdateDate(formattedDate);
//
//        List<UploadFile> imageFiles1 = fileStore.storeFiles(form.getImageFiles1());
//        List<UploadFile> imageFiles2 = fileStore.storeFiles(form.getImageFiles2());
//        test.setImageFiles1(imageFiles1);
//        test.setImageFiles2(imageFiles2);
//
//        testService.createTest(test);

        return null;
    }

    @GetMapping("/project/{id}/test/{tid}")
    public String showTest(@PathVariable int tid, Model model) {
        Test test = testService.getTest(tid);

        model.addAttribute("test", test);
        return "redirect:/project/{id}/test/{tid}";
    }

    @PostMapping("/project/{id}/test/{tid}")
    public String editTest(@PathVariable int tid, Test test) {
//        testService.editTest(tid, test.getName(), test.getPassword(), test.getMaxParticipants());
        return "redirect:/project/{" + "}";
    }

    @PostMapping("/project/{id}/test/delete/{tid}")
    public String deleteTest(@PathVariable int tid, Test test) {
        testService.deleteTest(tid, test.getPassword());
        return "redirect:/project/{"  + "}";
    }

    @PostMapping("/api/project/{id}/test/{tid}/result")
    public int resultTest(@PathVariable int tid, Test test) {
        // test 결과 받는 코드
        return 0;
    }

    @GetMapping("/api/project/{id}/test/{tid}/result")
    public int showResultTest(@PathVariable int tid, Test test) {
        // test 결과 주는 코드
        return 0;
    }

}
