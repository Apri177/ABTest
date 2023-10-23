# -*- coding: utf-8 -*-

from scipy import stats

def test_preference(a, b, n, p_value_threshold=0.05):
    X = a + b
    p_value = stats.binom_test(a, X, p=0.5)

    print(f"총 사용자 수: {n}")
    print(f"A를 선택한 횟수: {a}")
    print(f"B를 선택한 횟수: {b}")
    print(f"총 테스트 수: {X}")
    print(f"p-value: {p_value}")

    if p_value > p_value_threshold:
        print(f"결과: A와 B의 선호도에 통계적으로 유의미한 차이가 없습니다. (p > {p_value_threshold})")
    else:
        print(f"결과: A와 B의 선호도에 통계적으로 유의미한 차이가 있습니다. (p <= {p_value_threshold})")
    return "asdf"