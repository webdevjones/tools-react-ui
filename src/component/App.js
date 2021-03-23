import React, { useState, useEffect } from 'react'
import Header from './Header'
import Front from './Front'
import Builder from './Builder'
import sectionAPI from './sectionAPI'
import TextFix from './Textfix'


const App = () => {
  const [loading, setLoading] = useState(false)
  const [section, setSection] = useState(null)
  const [items, setItems] = useState({})
  const [topItems, setTopItems] = useState({})
  const [templates, setTemplates] = useState({})
  const [emailId, setEmailId] = useState("")
  const handleLoad = load => {
    setLoading(load)
  }

  const handleCustomAdd = data => {
    console.log(data)
    setTopItems([data].concat(topItems))
  }

  const handleHeaderClick = () => {
    setLoading(false)
    setSection(null)
    setTopItems({})
    setTemplates({})
    setItems({})
  }

  const handleSection = (event) => {
    const section = event.currentTarget.value
    setSection(section)
  }

  const handleSwitch = (event) => {
    let [index, incontent] = event.currentTarget.value.split(',')
    index = Number(index)
    incontent = Number(incontent)
    if (incontent) {
      const temp = topItems[index]
      setTopItems(topItems.filter((item, i) => i !== index))
      setItems([temp].concat(items))
    }
    else {
      const temp = items[index]
      setItems(items.filter((item, i) => i !== index))
      setTopItems(topItems.concat([temp]))

    }
  }

  useEffect(() => {
    if (section && section !== 'textfix') {
      const getData = async () => {
        handleLoad(true)
        const res = await sectionAPI.getSection(section)
        handleLoad(false)
        const bottomIter = res.bottomItems.values()
        const topIter = res.topItems.values()
        const bottomValues = []
        const topValues = []
        for (let elem of bottomIter) {
          bottomValues.push(elem)
        }
        for (let elem of topIter) {
          topValues.push(elem)
        }
        setItems(bottomValues)
        setTopItems(topValues)
        setTemplates(res.templates)


      }
      getData()

    }

  }, [section])



  if (loading) {
    return (
      <div className="loading-wrapper">
        <img
          src="spinninHarry.gif"
          alt="Loading..."
        />
      </div>
    )
  }

  else if (section === 'textfix') {
    return (
      <div className="bootstrap-wrapper">
        <Header title={section} handleHeaderClick={handleHeaderClick} handleSection={handleSection} />
        <TextFix />
      </div>
    )

  }
  else if (section && items.length >= 0 && topItems.length >= 0 && templates.hasOwnProperty('baseHTML')) {
    return (
      <div className="bootstrap-wrapper">
        <Header title={section} handleHeaderClick={handleHeaderClick} handleSection={handleSection} handleCustomAdd={handleCustomAdd} setEmailId={setEmailId} emailId={emailId}/>
        <Builder items={items} topItems={topItems} setTopItems={setTopItems} templates={templates} section={section} handleSwitch={handleSwitch} emailId={emailId} />
      </div>
    )
  }

  else {
    return (
      <div className="bootstrap-wrapper">
        <Header handleHeaderClick={handleHeaderClick} handleSection={handleSection} />
        <Front handleSection={handleSection} />
      </div>
    );
  }
}

export default App;
