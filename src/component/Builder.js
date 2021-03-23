import React from 'react'
import CKEditor from 'ckeditor4-react'
import htmlToElement from '../utils/createTemplate'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const QueueSwitch = ({ incontent, index, handleSwitch }) => {
    if (Number(incontent)) {
        return (
            <button
                className="buildArea--topItems--incontent--button"
                input="submit"
                value={[index, Number(incontent)]}
                onClick={handleSwitch}
            >
                Remove
            </button>
        )
    }
    else {
        return (
            <button
                className="buildArea--items--queued--button"
                input="submit"
                value={[index, Number(incontent)]}
                onClick={handleSwitch}
            >
                Add
            </button>
        )
    }
}
const QueuedItems = ({ items, handleSwitch }) => {
    return (
        items.map((item, index) => {
            return (
                <div key={index} className="buildArea--items--queued">
                    <h6>
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {item.title}
                        </a>
                    </h6>
                    <p>{`${item.author} | ${item.pubDate} | ${item.pubTime}`}</p>
                    <QueueSwitch incontent='0' index={index} handleSwitch={handleSwitch} />
                </div>
            )
        })
    )
}

const IncontentItem = SortableElement(({ section, item, arrIndex, handleSwitch }) => {
    return (
        <div
            key={arrIndex}
            className={section + "Light buildArea--topItems--incontent"}
        >
            <h6>
                <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {item.title}
                </a>
            </h6>

            <p>{`${item.author} | ${item.pubDate} | ${item.pubTime}`}</p>
            <QueueSwitch incontent='1' index={arrIndex} handleSwitch={handleSwitch} />
        </div>
    )
})

const SortableList = SortableContainer(({ topItems, handleSwitch, section }) => {
    return (
        <div className="buildArea--topItems">
            {
                topItems.map((item, index) => {
                    return (
                        <IncontentItem section={section} item={item} key={index} index={index} arrIndex={index} handleSwitch={handleSwitch} />
                    )
                })
            }
        </div>
    )
})

const Builder = ({ items, topItems, setTopItems, templates, section, handleSwitch, emailId }) => {
    const snapshotImg = section === 'nbdaily' || section === 'mrctv'
        ? false
        : true
    let template = htmlToElement(templates, topItems, snapshotImg, emailId)

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setTopItems(arrayMove(topItems, oldIndex, newIndex))
    };
    const copyToClipboard = str => {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };
    const editorChange = e => {
        let data = e.editor.getData()
        data = data
            .replace(/<!--\[if \(gte mso 9\)\|\(IE\)\]>/g, "\n<!--[if (gte mso 9)|(IE)]>\n")
            .replace(/<!\[endif\]-->/g, "\n<![endif]-->\n")
        copyToClipboard(data)
    }
    return (
        <div className="container-fluid">
            <div className="buildArea">
                <div className="buildArea--items">
                    <QueuedItems items={items} handleSwitch={handleSwitch} />
                </div>
                <SortableList section={section} topItems={topItems} helperClass='test' axis='xy' handleSwitch={handleSwitch} onSortEnd={onSortEnd} />
                <div className="buildArea--editor">
                    <CKEditor
                        data={template}
                        type="classic"
                        config={{
                            allowedContent: true,
                            startupShowBorders: false,
                            fullPage: true,
                            height: 600
                            // extraPlugins: 'autogrow',
                            // autoGrow_onStartup: true
                        }}
                        onChange={editorChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default Builder