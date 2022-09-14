import {useState} from "react";

///test data
//#0080C0 (0, 128, 192)
//#f54293 (245, 66, 147)

function ColorConverter() {
    const[form, setForm] = useState({
        hexColorEl: "",
        rgbColorEl: ""
    });

    const handleHexEntering = ({target}) => {
        var hexColor = target.value;
        if (hexColor.length < 7){
            setBodyColor("white");
            return null;
        }
        let bodyColor = isValidHex(hexColor) ? hexColor : "red";
        let rgbColor = getRgbStr(hexColor);

        setForm(prevForm => ({...prevForm, rgbColorEl: rgbColor}));
        setBodyColor(bodyColor);
    };


    return (
        <form>
            <div className="color-converter">
                <form>
                    <input className="center-block" id="hexColorEl" name="hexColorEl" onChange={handleHexEntering}/>
                    <br/>
                    <input className="center-block" id="rgbColorEl" name="rgbColorEl" value={form.rgbColorEl} readOnly />
                </form>
            </div>
        </form>
    );
}



function isValidHex(color) {
    let reg = /^#([0-9a-f]{3}){1,2}$/i;
    return reg.test(color)
}

function getRgbStr(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result)
        return "";
    
    return `rgb (${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`;
}

function setBodyColor(color){
    document.body.style.backgroundColor = color;
}



export {ColorConverter};