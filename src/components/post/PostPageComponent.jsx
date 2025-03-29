
import { useEffect, useState } from "react";
import { getPosts } from '../../api/postApi/postApi';
import { usePageHooks } from '../../hooks/pageHooks';
import PageComponent from "./PageComponent";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";


const initialState = {
  dtoList: [],
  pageRequestDto: null,
  totalCount: 0,
  pageNumList: [],
  prev: false,
  next: false,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  currentPage: 0
}



const PostPageComponent = () => {
  const role = useSelector(state => state.loginSlicer.initState.role);

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const loc = location.state
  const navi = useNavigate();

  const { moveToList, moveToView, page, size } = usePageHooks();

  const [serverData, setServerData] = useState({ ...initialState });

  const [keyfield, setKeyfield] = useState('');

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    console.log(location.state)
    console.log("role : ", role)
    const keyfieldParam = searchParams.get('keyfield') || '';
    const keywordParam = searchParams.get('keyword') || '';

    if (keyfield && keyword) {
      getPosts({ page, size, keyfield: keyfieldParam, keyword: keywordParam, boardName: loc })
        .then(data => {
          console.log('data : ', data);
          setServerData(data);
        })
        .catch(error => {
          console.error('Error : ', error);
        })

      setKeyfield(keyfieldParam);
      setKeyword(keywordParam);

    } else {
      getPosts({ page, size, boardName: loc })
        .then(data => {
          console.log('data : ', data);
          setServerData(data);
          console.log("loc", loc);
        })
        .catch(error => {
          console.error('Error : ', error);
        })
    }

  }, [page, size, loc]);


  const handleChangeKeyfield = (e) => {
    setKeyfield(e.target.value);
    setKeyword("");
  }

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  }

  const handleClick = () => {

    const pageNum = 1;

    getPosts({ page: pageNum, size, keyfield, keyword, boardName: loc })
      .then(data => {
        console.log(data)
        setServerData(data);
      })
      .catch(error => {
        console.eror('error : ', error);
      })

    moveToList({ page: pageNum, size, keyfield, keyword, boardName: loc });
  }


  return (
    <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col min-h-[80vh]">
      {/* 📋 게시글 리스트 */}
      <div className="space-y-4 flex-1 overflow-auto">
        {
          serverData.dtoList.length > 0 ? serverData.dtoList.map((post, index) => (

            <div key={post.id} className="bg-gray-50 p-4 shadow-md rounded-lg flex justify-between items-center hover:shadow-lg transition cursor-pointer" onClick={() => navi(`/view/${post.id}`)}>
              <div>
                <div className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                  <span className="text-blue-500">{post.title}</span>{post.fileItems.length > 0 ? <img src="imageIcon.png" className="w-3 h-3 mb-[-4px]"></img> : <></>}   <span className="text-sm text-gray-400">（{post.commentCount}）</span>
                </div>
                <div className="flex items-center space-x-2">
                <p className="text-m font-semibold text-gray-700">{post.nickname}</p>
                <p className="text-sm text-gray-500">{post.regDate.split('.')[0].replace('T', ' ')}</p>
              </div>

              </div>
              {/* <span className="text-gray-600">댓글 :（{post.commentCount}）</span> */}
              <span className="text-gray-600">#{((page - 1) * size) + index + 1}</span>
              {/* <span className="text-gray-600">#{post.}</span> */}
            </div>
          ))
            :
            (
              <div className="flex flex-col items-center justify-center h-[50vh]">
                {/* 메시지 */}
                <div className="text-3xl font-semibold text-gray-500">🚫 정보가 없습니다</div>

                {/* 돌아가기 버튼 */}
                <button
                  className="text-white bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-4 rounded mt-4"
                  onClick={() => { navi('/') }}>
                  돌아가기
                </button>
              </div>
            )
        }
      </div>

      <div className="mt-6">
        {/* 페이지 */}
        <div className="mt-auto flex items-center">

          {/* 📌 페이지네이션 (중앙 정렬) */}
          <div className="flex-grow flex justify-center">
            <PageComponent serverData={serverData} searchCondition={{ keyfield, keyword, boardName:loc }} movePage={moveToList} />
          </div>

          {/* 📝 글쓰기 버튼 (맨 오른쪽 정렬) */}
          
          {role === 'PROFESSOR' || role === 'ADMIN'? <button className="text-white bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-4 rounded ml-auto" 
          onClick={() => { navi('/write',{state: { loc}}) }}>
            글쓰기
          </button> : <></>}

        </div>


        {/* 🔍 검색 폼 */}
        <div className="flex space-x-2 mt-4">
        <select value={keyfield} onChange={handleChangeKeyfield} className="p-2 border rounded-md w-32">
            <option value="">선택</option>
            <option value="nickname">작성자</option>
            <option value="title">제목</option>
            <option value="contents">내용</option>
          </select>
          <input type="text" placeholder="검색어 입력" value={keyword} onChange={handleChangeKeyword} className="p-2 border rounded-md flex-1 min-w-[200px]" />
          <button type="button" onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">검색</button>
        </div>
      </div>
    </div>
  );
}

export default PostPageComponent;