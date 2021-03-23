const htmlToElement = html => {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
// const pad = (num, size) => ('0000000000000' + num).substr(-size)

const insertAfter = (newNode, existingNode) => {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

const generatePreheader = item => {
    return '<tbody><tr><td><p  style="display:none;">' + item.content + '</p></td></tr></tbody>'
}

const generateArticle = (item, template) => {
    return template.replace(/\[\[TITLE\]\]/g, item.title)
        .replace(/\[\[LINK\]\]/g, item.link)
        .replace(/\[\[AUTHOR\]\]/g, item.author)
        .replace(/\[\[DATE\]\]/g, item.pubDate)
        .replace(/\[\[IMAGE\]\]/g, item.image)
        .replace(/\[\[SUMMARY\]\]/g, item.content)
}
const createTemplate = (templates, items, snapshotImg, emailId) => {

    let domparser = new DOMParser()
    let s = new XMLSerializer();
    console.log(templates.baseHTML)
    let doc = domparser.parseFromString(templates.baseHTML, 'text/html')

    //Lets add the internal Ad
    let IA = htmlToElement(templates.internalAd)
    let adSpacer = htmlToElement(templates.adSpacer)
    let impactBox = htmlToElement(templates.impact)
    console.log(doc)
    console.log('impact', impactBox)
    insertAfter(adSpacer, doc.getElementById('articles-container'))
    insertAfter(IA, doc.getElementById('articles-container'))
    insertAfter(adSpacer, doc.getElementById('articles-container'))
    insertAfter(impactBox, doc.getElementById('impact-box'))

    //onto the items
    items.forEach((item, index) => {
        if (!index) {
            //Add the featured story
            doc
                .getElementById('featured-container')
                .innerHTML = generateArticle(item, templates.featured)
            //Add the preheader
            doc
                .getElementById('preheader')
                .innerHTML = generatePreheader(item)
        }
        else {
            //add the snapshots
            let snap = snapshotImg
                ? htmlToElement(generateArticle(item, templates.snapshotImg))
                : htmlToElement(generateArticle(item, templates.snapshot))

            let ac = doc.getElementById('articles-container')
            ac.parentNode.insertBefore(snap, ac)
            // insertAfter(snap, doc.getElementById('articles-container'))

        }
    })
    doc.getElementsByTagName('html')[0].removeAttribute('style')

    // const EmailID = Math.floor(Math.random() * 1000000000)
    let fullTemplate = s.serializeToString(doc)
    fullTemplate = fullTemplate
        .replace(/%%emailId%%/g, emailId)
    // .replace(/style="overflow-y: hidden;"/, '')

    return fullTemplate
}

export default createTemplate