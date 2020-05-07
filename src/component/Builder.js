import React from 'react'

import CKEditor from 'ckeditor4-react'

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
  let id = -1
  return (
    items.map(item => {
      ++id
      return (
        <div key={id} className="buildArea--items--queued">
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
          <QueueSwitch incontent='0' index={id} handleSwitch={handleSwitch} />
        </div>
      )
    })
  )
}

const IncontentItems = ({ items, handleSwitch }) => {
  let id = -1
  return (
    items.map(item => {
      ++id
      return (
        <div key={id} className="buildArea--topItems--incontent">
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
          <QueueSwitch incontent='1' index={id} handleSwitch={handleSwitch} />
        </div>
      )
    })
  )
}

const Builder = ({ items, topItems, handleSwitch }) => {
    console.log(topItems.length)
    const data = `<p>Da amount of lengths: ${topItems.length}</p>`
  return (
    <div className="container-fluid">
      <div className="buildArea">
        <div className="buildArea--items">
          <QueuedItems items={items} handleSwitch={handleSwitch} />
        </div>
        <div className="buildArea--topItems">
          <IncontentItems items={topItems} handleSwitch={handleSwitch} />
        </div>
        <div className="buildArea--editor">
          <CKEditor
            data={data}
            type="classic"
          />
        </div>
      </div>
    </div>
  )
}

export default Builder