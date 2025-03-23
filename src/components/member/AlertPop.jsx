import { useEffect, useRef, useState } from "react"


const AlertPop = () => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef(null);

    const handlePopup = (e) => {
        setIsOpen(!isOpen);
    }

    // 알람 
    useEffect(() => {
        if (isOpen) {
            // 알람 가져오는 엑시오스 요청
        }
    })

    // 팝업 관련
    useEffect(() => {
        const handleClickOutsie = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutsie);
        return () => document.removeEventListener("mousedown", handleClickOutsie);
    }, []);


    return (
        <div className="relative">
            <button
                className="relative p-2 text-2xl bg-gray-200 rounded-full"
                onClick={() => setIsOpen(!isOpen)}
            >
                {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                        {notifications.length}
                    </span>
                )}
            </button>

            {/* 알림 팝업 */}
            {isOpen && (
                <div ref={popupRef} className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
                    <h3 className="text-lg font-bold mb-2">알림</h3>
                    {notifications.length === 0 ? (
                        <p className="text-gray-500">새로운 알림이 없습니다.</p>
                    ) : (
                        <ul>
                            {notifications.map((noti) => (
                                <li key={noti.id} className="p-2 border-b last:border-none">
                                    {noti.message}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default AlertPop;