import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@remix-run/react";

export default function HerbDetail(){
    const myParams = useParams();
    const hbId = myParams.hbId;
    const [hbData, setHerbData] = useState({
        hbId: '',
        hbName: '',
        hbDesc: '',
        hbCate: '',
        hbProp: '',
        hbSupp: ''
    });

    useEffect(() => {
        try {
            const fetchHerbData = async () => {
                const hbData = await fetch(`lab02/harbDetail/${hbId}`);
                if (hbData.ok) {
                    const hbJson = await hbData.json();
                    setHerbData(hbJson);
                    console.log(hbJson);
                } else {
                    alert('[ERR] Failed to loaded data.');
                }
            }

            fetchHerbData().catch(console.error);
        } catch (error) {
            alert('[ERR] An error occurred while loading the data.');
        }
    }, []);

    return (
    <div className="m-3">
        <a href='#'>[ ข้อมูลสมุนไพร ]</a>
        <h1 className="font-bold">รายละเอียดสมุนไพร</h1>
        {
            <div key={hbId}>
                <div className="font-bold p-2 m-2 border-2 rounded-lg">
                    ชื่อสมุนไพร: {hbData.hbName}<br/>
                    รายละเอียด: {hbData.hbDesc}<br/>
                    หมวดหมู่: {hbData.hbCate}<br/>
                    สรรพคุณ: {hbData.hbProp}<br/>
                    ผู้ผลิต: {hbData.hbSupp}<br/>
                </div>
            </div>
        }
        <a href='/lab02/herbLists'>[ ย้อนกลับ ]</a>
    </div>
    );
}