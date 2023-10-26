package com.abtest.first.domain;

import lombok.Data;

@Data
public class TestResult {

    private Double p_value = 0.1;
    private String result = "no";

}
