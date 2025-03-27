// 페이지 이동 (특정 파라미터 필요할 경우)
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"

const getNum = (param, defaultValue) => {
    if (!param)
        return defaultValue;
    return parseInt(param);
}

// Custom Hook
export const usePageHooks = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // XXX?page=1&isze=2
    const page = getNum(searchParams.get('page'), 1);
    const size = getNum(searchParams.get('size'), 10);
    const keyfield = searchParams.get('keyfield');
    const keyword = searchParams.get('keyword');
    const boardName = searchParams.get('boardName');

    let queryDefault = '';

    if (keyfield && keyword)
        queryDefault = createSearchParams({ page, size, keyfield, keyword }).toString();
    else
        queryDefault = createSearchParams({ page, size }).toString();

    const moveToList = (pageParam) => {  // { page: 1, keyfield: XXX, keyword: XXX }
        let queryStr = '';

        if (pageParam) {
            const pageNum = getNum(pageParam.page, 1);
            const sizeNum = getNum(pageParam.size, 10);
            const keyfield = pageParam.keyfield;
            const keyword = pageParam.keyword;
            const boardName = pageParam.boardName;

            if (keyfield && keyword)
                queryStr = createSearchParams({ page: pageNum, size: sizeNum, keyfield, keyword }).toString();
            else
                queryStr = createSearchParams({ page: pageNum, size: sizeNum }).toString();
        } 
        else
            queryStr = queryDefault;
        navigate(
            {
                pathname: "../task",
                search: queryStr // 쿼리 문자열
            },
            {
                state: pageParam.boardName  // 상태 전달
            }
        );
    }

    const moveToView = (id) => {
        navigate({ pathname: `../view/${id}`, search: queryDefault });
    }

    return { moveToList, moveToView, page, size };

}


