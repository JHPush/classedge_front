import { useEffect, useRef, useState } from "react"
import { getCookie } from "../../utils/cookieUtils";
import SockJS from "sockjs-client";
import { Client } from '@stomp/stompjs';

const NotificationItem = ({ content, date, link }) => {
    return (
        <div style={{ border: "1px solid #ddd", padding: "10px", margin: "5px 0" }}>
            <p>{content}</p>
            <p>{date}</p>
            <a href={link} target="_blank" rel="noopener noreferrer">자세히 보기</a>
        </div>
    );
};

const AlertPop = () => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const popupRef = useRef(null);

    let stompClient = null;

    const handlePopup = (e) => {
        setIsOpen(!isOpen);
    }

    // 실시간 알람 수신 
    useEffect(() => {
        console.log("start WebSocket")

        if (!userEmail) return;
        console.log("in WebSocket " + userEmail)

        const socket = new SockJS("http://localhost:8080/ws");
        stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str),
            reconnectDelay: 5000, // 자동 재연결 5초
        })
        stompClient.activate(); // WebSocket 클라이언트 활성화
        stompClient.onConnect = () => {
            console.log("Success Connet")
            stompClient.subscribe(`/api/v1/alert/${userEmail}`, (msg) => {
                console.log("msg : " + msg);
                try {
                    const newNotification = JSON.parse(msg.body);
                    console.log("newNotification");
                    setNotifications((prev) => [...prev, newNotification]);
                }
                catch (e) {
                    console.error("메시지 오류 : ", e);
                }
            })
        }
        stompClient.onWebSocketClose = () => {
            console.log("WebSocket 연결이 종료되었습니다.");
        };

        stompClient.onStompError = (frame) => {
            console.error("STOMP 오류:", frame);
        };

        stompClient.onStompError = (e) => {
            console.log("eeror");
        }
    }, [userEmail])

    // 팝업 관련
    useEffect(() => {
        setUserEmail(getCookie('member').email);
        const handleClickOutsie = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setIsOpen(false);
                // setNotifications([])
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
                            {
                            notifications.map((noti) => {
                                console.log(noti);
                                return (
                                <NotificationItem 
                                    key={noti.id}
                                    content={noti.content}
                                    date={noti.regDate}
                                    link={null}/>
                            )})
                            }
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default AlertPop;