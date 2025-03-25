import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPostBoard } from "../../api/postApi/postApi";
import { usePageHooks } from "../../hooks/pageHooks";


const initialState = {
    notice: [],
    task: []
};

const HomePageComponent = () => {

    const [searchParams] = useSearchParams();
    const [post, setPost] = useState({ ...initialState });
    const { moveToList, moveToView, page, size } = usePageHooks();

    useEffect(() => {

        getPostBoard(5)
            .then(data => {
                console.log('data : ', data);
                setPost(data);
            })
            .catch(error => {
                console.error('Error : ', error);
            });
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                {/* 🏷️ 공지사항 */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">📢 새로운 공지사항</h2>
                    <div className="space-y-3">
                        {post.notice.map((notice, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer" onClick={() => moveToView(notice.id)}>
                                <h3 className="text-lg font-semibold text-blue-600">{notice.title}</h3>
                                <p className="text-sm text-gray-500">{notice.regDate}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 📝 과제 목록 */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">📝 최신 과제</h2>
                    <div className="space-y-3">
                        {post.task.map((task, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer" onClick={() => moveToView(task.id)}>
                                <h3 className="text-lg font-semibold text-green-600">{task.title}</h3>
                                <p className="text-sm text-gray-500">{task.regDate}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );

}


export default HomePageComponent;