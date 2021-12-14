import React from 'react'

const SectionTile = ({ title, endpoint, handleSection }) => {
    let img
    switch (endpoint) {
        case 'culture':
            img = 'https://cdn.mrc.org/U/OP/EMT/LOGO/MRCCulture_EmailBanner2020.png'
            break;
        case 'nbdaily':
            img = 'https://cdn.mrc.org/U/OP/EMT/LOGO/NB_EmailBanner2020.png'
            break;
        case 'cnsnews':
            img = 'https://cdn.mrc.org/U/OP/EMT/LOGO/CNS-Daily_EmailBanner2020.png'
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
        case 'mrcweekly':
            img = 'https://cdn.mrc.org/U/OP/EMT/LOGOS/MRCWeeklyBannerLogo.png'
            break;

        default:
            break;
    }
    return (
        <div className="selectionTiles--item">
            <button
                className="selectionTiles--item--button"
                id={endpoint}
                key={endpoint}
                value={endpoint}
                onClick={handleSection}
            >
                <img
                    src={img}
                    alt={endpoint}
                    className="img-fluid"
                />
            </button>
        </div>
    )
}
const Front = ({ handleSection }) => {
    return (
        <div className="container">
            <div className="selectionTiles">
                <SectionTile title="NB Daily" endpoint="nbdaily" handleSection={handleSection} />
                <SectionTile title="CNSNews" endpoint="cnsnews" handleSection={handleSection} />
                <SectionTile title="MRCTV" endpoint="mrctv" handleSection={handleSection} />
                <SectionTile title="Culture" endpoint="culture" handleSection={handleSection} />
                <SectionTile title="Latino" endpoint="latino" handleSection={handleSection} />
                <SectionTile title="FSA" endpoint="fsa" handleSection={handleSection} />
                <SectionTile title="MRC Weekly" endpoint="mrcweekly" handleSection={handleSection} />
            </div>
        </div>
    )
}

export default Front 