import { useState } from "react";
import { useNavigate } from "@remix-run/react";

export default function HerbFrom(){
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        try { 
            const resHerb = await fetch(
                'http://localhost:3002/api/herbInsert',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formJson)
                }
            );

            if(resHerb.ok){
                const data = await resHerb.json();
                alert(`${data.message}`);
                navigate('/lab02/herbDetail/:hbId');
            }else{
                alert('[ERR] Failed to update the form.');
            }

        } catch (error) {
            alert('[ERR] An error occurred while updatting the form.');
        }
    }

    return (
    <div className="m-3">
        <a href='herbLists'>[ ข้อมูลสมุนไพร ]</a>
        <h1 className="font-bold">เพิ่มข้อมูลสมุนไพร</h1>
        <form method="POST" onSubmit={handleSubmit}>
        <label>ชื่อสมุนไพร (*):</label><br/>
        <input type="text" name="hbName" className="border rounded-lg p-2 w-1/2" required /><br/>
        <label>รายละเอียด</label><br/>
        <textarea rows={3} cols={50} name="hbDesc" className="border rounded-lg p-2 w-1/2" /><br/>
        <label>หมวดหมู่ (*)</label>:<br />
        <select name="hbCate" id="hbId" className="border rounded-lg p-2 w-1/2" required>
            <option value="">-เลือกหมวดหมู่-</option>
            <option value={10}>ราก</option>
            <option value={20}>เปลือกไม้</option>
            <option value={30}>เนื้อไม้</option>
            <option value={40}>ใบ</option>
            <option value={50}>อื่น ๆ</option>
        </select><br />
        <label>สรรพคุณ (*)</label>:<br />
        <textarea rows={3} cols={50} name="hbProp" id="hbProp" className="border rounded-lg p-2 w-1/2" required /><br />
        <label>ผู้ผลิต (*)</label>:<br />
        <input type="text" name="hbSupp" id="hbSupp" className="border rounded-lg p-2 w-1/2" placeholder="ระบุชื่อ-สกุลนักศึกษา" required /><br />
        <button type="submit">[ บันทึก ]</button>
        <button type="reset">[ เคลียร์ ]</button>
        </form>
    </div>
    );
}