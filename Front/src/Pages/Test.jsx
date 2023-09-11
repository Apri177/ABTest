/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'

import * as S from '../styles/styled-components'
import { registFile } from '../util/api/fileUpload'

const Test = () => {

    const [selectedImages, setSelectedImage] = useState([])

    const [selectedFiles, setSelectedFiles] = useState("")

    const onSelectFile = (e) => {
        e.preventDefault()
        e.persist()

        const selectedFiles = e.target.files

        const fileURLList = [...selectedFiles]

        //업로드되는 파일에는 url이 있어야 한다. 
        //획득한 Blob URL Address를 브라우저에서 그대로 호출 시에 이미지는 표시가 되고,
        //일반 파일의 경우 다운로드를 할 수 있다.
        for(let i = 0; i < selectedFiles.length; i++) {
            const nowURL = URL.createObjectURL(selectedFiles[i])
            fileURLList.push(nowURL[i])
        }

        setSelectedFiles(fileURLList)

        const selectedFileArray = Array.from(selectedFiles)

        const imageArray = selectedFileArray.map((file) => {
            return file.name
        })

        setSelectedImage(previousImages => previousImages.concat(imageArray))
        e.target.value = ''
    }

    const attachFile =
        selectedImages &&
        selectedImages.map((image) => {
            return (
                <S.DivImg key={image}>
                    <div>
                        {image}
                    </div>
                    <button onClick={() => {
                        setSelectedImage(selectedImages.filter((e) => e !== image))
                    }}>
                        asdf
                    </button>
                </S.DivImg>
            )
        })

    return (
        <div>
            <tbody>
                <tr>
                    <td>첨부파일</td>
                    <td>
                        <S.TableDiv>
                            {selectedImages.length !== 0 ? (
                                <div>{attachFile}</div>
                            ) : (
                                <S.NotDownload>파일을 첨부할 수 있습니다.</S.NotDownload>
                            )}
                            <S.ChangeButton>업로드</S.ChangeButton>
                            {selectedImages.length !== 0 ? (
                                ''
                            ) : (
                                <input
                                    type="file"
                                    name="images"
                                    onChange={onSelectFile}
                                    accept=".png, .jpg, image/*"
                                />
                            )}
                        </S.TableDiv>
                    </td>
                </tr>
            </tbody>
            <button onClick={() => registFile(selectedFiles)}>
                등록
            </button>
        </div>
    )
}

export default Test