package com.abtest.first.controller;

import com.abtest.first.domain.*;
import com.abtest.first.domain.dto.TestForm;
import com.abtest.first.service.ProjectService;
import com.abtest.first.service.TestService;
import io.swagger.models.Response;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.python.core.PyFunction;
import org.python.core.PyInteger;
import org.python.core.PyObject;
import org.python.util.PythonInterpreter;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
@Getter
public class TestController {

    private static PythonInterpreter intPre;

    private final ProjectService projectService;
    private final TestService testService;
    private final FileStore fileStore;
    private final CSVReader csvReader = new CSVReader();
    @PostMapping("/api/project/{id}/test/create")
    public Test createTest(
            @PathVariable int id,
            HttpServletRequest request,
            @RequestParam(name = "body") String body,
            @RequestParam(name = "image1") MultipartFile image1,
            @RequestParam(name = "image2") MultipartFile image2,
            @RequestParam(name = "prompt") MultipartFile prompt
    ) throws IOException, ServletException, ParseException {


        JSONParser parser = new JSONParser();
        Object obj = parser.parse(body);
        JSONObject form = (JSONObject) obj;

        Test test = Test.builder()
                .maxPart(Integer.parseInt(String.valueOf(form.get("maxPart"))))
                .name((String) form.get("name"))
                .password((String) form.get("password"))
                .build();
        test.setProjectId(id);

        UploadFile imageFiles1 = fileStore.storeFile(image1, (String) form.get("name"));
        UploadFile imageFiles2 = fileStore.storeFile(image2, (String) form.get("name"));
        UploadFile csvFile = fileStore.storeFile(prompt, (String) form.get("name"));
        test.setImage1(imageFiles1);
        test.setImage2(imageFiles2);
        test.setCsvFile(csvFile);
        test.setNumOfSets(csvReader.readCSV(test).size() - 1);

        testService.createTest(test);
        projectService.insert(id, test);

        return test;
    }

    @GetMapping("/api/project/{id}/test/{tname}")
    public Test getTestByName(@PathVariable int id, @PathVariable String tname) {
        return testService.getTestByName(id, tname);
    }

    @GetMapping("/api/project/{id}/test/all")
    public List<Test> getTests(@PathVariable int id) {
        return testService.getAllTests(id);
    }

    @PatchMapping("/api/project/{id}/test/{tname}")
    public String editTest(@PathVariable int id, @PathVariable String tname, Test test) {
//        testService.editTest(tid, test.getName(), test.getPassword(), test.getMaxParticipants());
        return "redirect:/project/{" + "}";
    }

    @DeleteMapping("/api/project/{id}/test/delete/{tname}")
    public String deleteTest(
            @PathVariable int id
            ,@PathVariable String tname
            ) throws IOException {
        File file = new File(testService.getTestByName(id, tname).getImage1().getPath());
        FileUtil.remove(file);
        testService.deleteTest(tname, id);
        projectService.delete(id ,testService.getAllTests(id));
        return "삭제됨";
    }



    @GetMapping("/api/project/{id}/test/{tname}/play/{page}")
    public List<ResponseEntity<byte[]>> goTest(@PathVariable int id, @PathVariable String tname, @PathVariable int page) {

        List<ResponseEntity<byte[]>> response = new ArrayList<ResponseEntity<byte[]>>();
        Test test = testService.getTestByName(id, tname);
        List<List<String>> csv = csvReader.readCSV(test);
        String path = "";
        String model = "";
        int pos = 0;
        for( int i = 0; i < 2; i++) {
            if (i == 1) {
                path = test.getImage1().getPath() + test.getImage1().getUploadFilename() + "/";
                model = test.getImage1().getUploadFilename();
                System.out.println(model);
            }
            else {
                path = test.getImage2().getPath() + test.getImage2().getUploadFilename() + "/";
                model = test.getImage2().getUploadFilename();
                System.out.println(model);
            }

            StringBuilder prompt = new StringBuilder();
            for (int j = 2; j < csv.get(page).size(); j++) {
                prompt.append(csv.get(page).get(j));
            }
            response.add(returnImage(path + csv.get(page).get(i), String.valueOf(prompt) ,model));
        }

        return response;
    }

    public ResponseEntity<byte[]> returnImage(@RequestParam String imageName, String prompt, String model) {

        ResponseEntity<byte[]> result;

        try {
            File file = new File(imageName);

            HttpHeaders header = new HttpHeaders();

            header.add("ContentType", Files.probeContentType(file.toPath()));
            header.add("prompt", prompt);
            header.add("Model", model);


            result = new ResponseEntity<>(FileCopyUtils.copyToByteArray(file), header, HttpStatus.OK);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return result;
    }

    @PostMapping("/api/project/{id}/test/{tid}/result")
    public void postScore(
            @PathVariable int id,
            @PathVariable String tid,
            @RequestBody  Test temp
    ) {
        Test test = getTestByName(id, tid);
        test.setScore(test.getScore() + temp.getScore());
        test.setTester(test.getTester() + 1);

        System.setProperty("python.import.site", "false");

        intPre = new PythonInterpreter();
        intPre.execfile("first/src/main/resources/static/temp.py");
        intPre.exec("print('asd')");
//        PyFunction pyFunction = intPre.get("test_preference", PyFunction.class);
//        int a = 10; int b = 20; int n = 10;
//        PyObject pyObject = pyFunction.__call__(new PyInteger(a), new PyInteger(b), new PyInteger(n));
//        System.out.println(pyObject.toString());
    }

    @GetMapping("/api/project/{id}/test/{tid}/result")
    public int showResultTest(@PathVariable int tid, Test test, @PathVariable String id) {
        // test 결과 주는 코드
        return 0;
    }

}
