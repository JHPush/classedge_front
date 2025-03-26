import { useState } from 'react';
import { registerPost } from '../../api/postApi/postApi';
import FileUpload from './FileUpload';
import { useNavigate } from 'react-router-dom';  // 페이지 리디렉션을 위한 useNavigate


const initialState = {
    title: '',
    nickname: '',
    contents: '',
    boardName: 'NOTICE',
    lmiDate: ''
}

const Postwrite = () => {
    const [post, setPost] = useState({ ...initialState });
    const [postId, setPostId] = useState(null);
    //const [uploadVisible, setUploadVisible] = useState(false); //파일 업로드 창
    const navigate = useNavigate();  // 페이지 이동을 위한 hook
    const [files, setFiles] = useState([]);


    const handleChange = (e) => {

        const { name, value } = e.target;
        setPost({ ...post, [name]: value })
    };

    const handleClickSave = () => {

        if (!post.title) {
            alert('제목을 입력하세요');

        } else if (!post.contents) {
            alert('내용을 입력하세요');

        } else {
            if (window.confirm("게시글을 등록하시겠습니까?")) {
                registerPost(post, files)
                    .then(data => {
                        setPostId(data.id)
                        setPost({ ...initialState });
                        console.log("postid:", data.id);
                        navigate('/task', {state: `${post.boardName}`})

                    })
                    .catch(error => {
                        console.error("Error: ", error);

                    });

            }
        }
    }

    // const toggleUpload = () => {
    //     setUploadVisible(!uploadVisible);
    // }

    const MAX_FILE_SIZE = 3 * 1024 * 1024; // 개당 3MB
    const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 전체 총합 10MB

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        let totalSize = 0;
        let invalidFiles = [];

        // 파일 크기 체크
        Array.from(selectedFiles).forEach(file => {
            if (file.size > MAX_FILE_SIZE) {
                invalidFiles.push(file);
            } else {
                totalSize += file.size;
            }
        });

        // 개별 파일 크기 초과 확인
        if (invalidFiles.length > 0) {
            alert(`파일 크기가 너무 큽니다. 개별 파일 크기는 최대 3MB입니다.`);
            setFiles([]); // 상태 초기화
        }
        // 전체 파일 크기 초과 확인
        else if (totalSize > MAX_TOTAL_SIZE) {
            alert(`파일 크기 총합이 10MB를 초과할 수 없습니다.`);
            setFiles([]); // 상태 초기화
        } else {
            setFiles(selectedFiles); // 모든 조건을 만족하면 파일 상태 업데이트
        }

        console.log(selectedFiles);

    }
    return (
        <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">

            {/* 제목 */}
            <h1 className="text-2xl font-bold text-gray-700 mb-6">📌 게시글 작성</h1>

            {/* 카테고리 선택 */}
            <div className="flex items-center space-x-4 mb-4">
                <label className="font-semibold text-gray-600" htmlFor="boardName">카테고리</label>
                <select name="boardName" value={post.boardName} onChange={handleChange} className="p-2 border rounded-md">
                    <option value="NOTICE">공지사항</option>
                    <option value="TASK">과제</option>
                </select>
            </div>

            {/* 과제 마감일 (과제 선택 시만 보임) */}
            {post.boardName === 'TASK' && (
                <div className="flex items-center space-x-4 mb-4">
                    <label className="font-semibold text-gray-600" htmlFor="lmiDate">📅 과제 마감일</label>
                    <input type="datetime-local" name="lmiDate" value={post.lmiDate} onChange={handleChange} className="p-2 border rounded-md" />
                </div>
            )}

            {/* 제목 입력 */}
            <div className="mb-4">
                <label className="font-semibold text-gray-600 block mb-1" htmlFor="title">제목</label>
                <input type="text" name="title" placeholder="제목을 입력하세요." value={post.title} onChange={handleChange} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300" />
            </div>

            {/* 내용 입력 (🔹 크기 확장됨!) */}
            <div className="mb-4">
                <label className="font-semibold text-gray-600 block mb-1" htmlFor="contents">내용</label>
                <textarea
                    name="contents"
                    placeholder="내용을 입력하세요."
                    value={post.contents}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md h-96 resize-none overflow-auto focus:ring-2 focus:ring-blue-300"
                ></textarea>
            </div>

            {/* 파일 업로드 */}
            <div className="mb-4">
                <input type="file" onChange={handleFileChange} multiple className="p-2 border rounded-md" />
            </div>

            {/* 등록 버튼 */}
            <div className="flex justify-end">
                <button type="button" onClick={handleClickSave} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                    등록
                </button>
            </div>

        </div>
    );
};

export default Postwrite;
