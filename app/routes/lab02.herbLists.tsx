import { useState, useEffect } from "react";

export default function HerbLists(){
    const [loadStatus, setLoadStatus] = useState(true);
    const [herbData, setHerbData] = useState([]);

    useEffect(()=>{
        try {
            const fetchHerbData = async() => {
                const herb = await fetch(
                    '/lab02/herbDetail/:hbId'
                );
                if(herb.ok){
                    const hbJson = await herb.json();
                    setHerbData(hbJson);
                }else{
                    alert('[ERR] Unable to read data.');
                }
            }
            fetchHerbData().catch(console.error);
            setLoadStatus(false);
            console.log('Fetch herb data.');
        } catch (error) {
            alert('[ERR] An error occurs when reading the data.');
        }
    }, [loadStatus]);

    const handleDelete = (hbId) => {
        try {
            const fetchData = async() => {
                const hbData = await fetch(
                    `http://localhost:3002/${hbId}`,
                    { 
                        method: 'DELETE'
                    }
                );
                if(hbData.ok){
                    const myJson = await hbData.json();
                    alert(myJson.message);
                }else{
                    alert('[ERR] An error when deleting data.');
                }
            } 
            fetchData();
            setLoadStatus(true);
        } catch (error) {
            alert('[ERR] An error occurs when deleting the data.');
        }
    }
    
    return (
    <div className="m-3">
        <a href='/lab02/herbForm'>[ เพิ่มข้อมูลสมุนไพร ]</a>
        <h1 className="font-bold">รายการสมุนไพร</h1>
        {
            herbData.map((h_item, index) => 
            <div key={index}>
                <div className="font-bold p-2 m-2 border-2 rounded-lg">
                    ชื่อสมุนไพร: {h_item.hbName}<br/>
                    รายละเอียด: {h_item.hbDesc}<br/>
                    หมวดหมู่: {h_item.hbCate}<br/>
                    สรรพคุณ: {h_item.hbProp}<br/>
                    ผู้ผลิต: {h_item.hbSupp}<br/>
                </div>
                <div className="p-2 m-2">
                    <a href={`/lab02/herbDetail/${h_item.hbId}`}>[ รายละเอียด ]</a>
                    <a href={`/lab02/herbEditForm/${h_item.hbId}`}>[ แก้ไข ]</a>
                    <a href="#" onClick={(e) => handleDelete(`${h_item.hbId}`)}>[ ลบ ]</a>
                </div>
            </div>
            )
        }
    </div>
    );
}