
const PageComponent = ({ serverData, searchCondition, movePage }) => {

    const { keyfield, keyword, boardName } = searchCondition;

    return (
        <>
            {
                serverData.prev ?
                    <span onClick={() => { movePage({ page: serverData.prevPage, keyfield: keyfield, keyword: keyword, boardName: boardName }) }} >이전</span> : <></>
            }
            {

                serverData.pageNumList.map((pageNum, index) => {
                    return <span key={index}
                        onClick={() => { movePage({ page: pageNum, keyfield, keyword, boardName: boardName  }) }}
                        style={{
                            margin: '2px',
                            color: pageNum === serverData.currentPage ? 'blue' : 'gray',
                            cursor: 'pointer'
                        }}>
                        {pageNum}
                    </span>
                })
            }
            {
                serverData.next ? <span onClick={() => { movePage({ page: serverData.nextPage, keyfield, keyword, boardName: boardName  }) }} >다음</span> : <></>
            }
        </>

    );

}


export default PageComponent;