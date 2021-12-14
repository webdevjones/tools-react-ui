import React, { useState } from 'react'
import customAPI from './customAPI'

const CustomNbForm = ({ handleCustomAdd }) => {
    const [formData, setFormData] = useState('')

    const handleFormChange = e => {
        setFormData(e.target.value)
    }
    const handleForm = async e => {
        e.preventDefault()
        const btn = e.currentTarget
        const oldText = btn.innerText
        btn.innerText = 'Finding...'
        // console.log(currText)
        let encodedURI = encodeURIComponent(formData)
        let data = await customAPI.getCustom(encodedURI)
        if (data) {
            btn.innerText = oldText
            handleCustomAdd(data)
            setFormData('')
        }
        else {
            alert(`
            Something went wrong :(\n
            - The blog link doesnt exist\n
            - The blog isnt recent enough (past 150 blogs)\n
            - You copied the link wrong somehow?????????\n
            Link: ${formData}
             `)
        }
    }
    return (
        <div className='urlForm'>
            <form>
                <div>
                    <input
                        value={formData}
                        onChange={handleFormChange}
                        placeholder='Enter URL'
                    />
                </div>
                <div>
                    <button type="submit" onClick={handleForm}>Find Custom Item</button>
                </div>
            </form>
        </div>
    )

}


const Header = ({ title, handleHeaderClick, handleSection, handleCustomAdd, setEmailId, emailId, setShowSpotlight, showSpotlight, setShowPodcast, showPodcast }) => {
    if (!title) {
        title = "Email Builder 10000"
    }
    if (title === 'textfix') {
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
        case 'mrcweekly':
            img = 'https://cdn.mrc.org/U/OP/EMT/LOGOS/MRCWeeklyBannerLogo.png'
            break;

        default:
            break;
    }

    console.log('title', title)
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
                {title === 'nbdaily' || title === 'mrcweekly' ? <CustomNbForm handleCustomAdd={handleCustomAdd} /> : null}
                {
                    title !== "Email Builder 10000"
                        ?
                        <div className="setSpotlight">
                            <button className={`${showSpotlight ? 'red' : 'green'}`} onClick={e => setShowSpotlight(!showSpotlight)} >{showSpotlight ? 'Remove Spotlight' : 'Add Spotlight'}</button>
                            <button className={`${showPodcast ? 'red' : 'green'}`} onClick={e => setShowPodcast(!showPodcast)} >{showPodcast ? 'Remove Podcast' : 'Add Podcast'}</button>

                        </div>
                        : false
                }

                {
                    setEmailId
                        ? <div id="emailIdForm">
                            <label>Pardot Email Id:</label>
                            <input type="text" value={emailId} onChange={e => setEmailId(e.currentTarget.value)} placeholder="Paste email id if possible"></input>
                        </div>
                        : false
                }

                <button className='textfix' input="submit" value="textfix" onClick={handleSection} >
                    Format Text Email
                </button>

            </div>
        </div >
    )
}

export default Header