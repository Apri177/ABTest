import axios, { AxiosHeaders } from "axios";

export const getTestById =
async(project_id, test_id) => {
    const res = await axios.get(
        `/api/project/${project_id}/test/${test_id}`,
    )
    return res
}

export const getTests =
async(project_id) => {
    const res = await axios.get(
        `/api/project/${project_id}/tests`
    )

    return res
}

export const createTest =
async(project_id, data, images) => {
    console.log(data);
    console.log(images);

    const res = await axios.post(
        `/api/project/${project_id}/test/create`,
        {
            name: data.name,
            maxPart: data.maxPart,
            password: data.password,
            images1: images.imageFiles1,
            images2: images.imageFiles2
        },
        {
            headers: {
            "Content-Type" : "multipart/form-data",
            }
        },
    )
    return res
}