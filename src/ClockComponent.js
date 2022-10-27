
import { useEffect, useState } from "react";

export function ClockComponent() {

    const [clock, setClock] = useState();
    const [msg, setMsg] = useState();
    const [imagePath, setImagePath] = useState();

    function GetTime(){
        var now = new Date();
        var time = now.toLocaleTimeString();
        setClock(time);
    }

    function DisplayMessage(){
        var now = new Date();
        var hrs = now.getHours();
        if(hrs>=0 && hrs<=12){
            setMsg('Good Morning');
            setImagePath('assets/images/morning.png');
        } else if(hrs>12 && hrs<=17){
            setMsg('Good Afternoon');
            setImagePath('assets/images/afternoon.png');
        } else if(hrs>17 && hrs<=23){
            setMsg('Good Evening');
            setImagePath('assets/images/evening.png');
        }
    }
    
    useEffect(() => {
        setInterval(GetTime,1000);
        DisplayMessage();  
    },[])



    return (
        <div className="d-flex mb-4 bg-dark p-2 rounded text-white fs-1 fw-2">
            <div>
                <span className="p-2">{msg}</span>
                <span className="p-2">
                    <img src={imagePath} style={{ width: '100', height: '100' }}/>
                </span>
            </div>
            <div>
                <span className="p-2">{clock}</span>
            </div>
        </div>
    )
}