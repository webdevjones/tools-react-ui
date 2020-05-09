import React from 'react'


const Header = ({ title, handleHeaderClick, handleSection }) => {
    if (!title) {
        title = "Email Builder 10000"
    }
    if(title === 'textfix'){
        title = 'Text Fix'
    }
    let img = null
    switch (title) {
        case 'culture':
            img = 'https://cdn.mrc.org/U/OP/EMT/LOGO/MRCCulture_EmailBanner2020.png'
            break;
        case 'nbdaily':
            img = 'https://cdn.mrc.org/U/OP/EMT/LOGO/NB_EmailBanner2020.png'
            break;
        case 'cnsnews':
            img = 'https://cdn.mrc.org/U/OP/EMT/LOGO/CNS_EmailBanner2020.png'
            break;
        case 'mrctv':
            img = 'https://cdn.mrc.org/U/OP/EMT/LOGO/MRCTV_EmailBanner2020.png'
            break;
        case 'latino':
            img = 'https://cdn.mrc.org/U/OP/EMT/LOGO/MRCLatino_EmailBanner2020.png'
            break;
        case 'fsa':
            img = 'https://cdn.mrc.org/U/OP/EMT/LOGO/FreeSpeechAmerica_Logo.png'
            break;

        default:
            break;
    }
    return (
        <div
            className={title + " container-fluid"}
            id="header"

        >
            <div
                className="navbar"
            >
                <div className="title">
                    <button input="submit" onClick={handleHeaderClick}>
                        {
                            img
                                ? <img src={img} alt={title} />
                                : < h1 >{title}</h1>
                        }
                    </button>
                </div>
                <button className='textfix' input="submit" value="textfix" onClick={handleSection} >
                    Format Text Email
                </button>

            </div>
        </div >
    )
}

export default Header