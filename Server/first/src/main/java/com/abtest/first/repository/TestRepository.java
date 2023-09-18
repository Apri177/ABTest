package com.abtest.first.repository;


import com.abtest.first.domain.Test;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Repository
public class TestRepository {

    // 해쉬맵을 사용한 저장 방식 -> MongoDB 컬렉션으로 직 변환
    private static HashMap<Integer, Test> tests = new HashMap<>();

    private static int sequence = 0;

    public void save(Test test) {
        test.setId(++sequence);
        tests.put(test.getId(), test);
    }

    public void edit(int id, Test test) { tests.put(id, test); }

    public void delete(int id) { tests.remove(id); }

    public List<Test> findAll() { return new ArrayList<>(tests.values()); }

    public Test findById(int id) { return tests.get(id); }

    public void deleteAll() {
        tests = new HashMap<>();
        sequence = 0;
    }


}
