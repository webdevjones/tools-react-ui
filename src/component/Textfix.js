import React from 'react'
const fixMe = () => {
    let button = document.getElementsByTagName('button');
    let textarea = document.getElementsByTagName('textarea');
    let textareaText = textarea['formatMe'].value;
    if (textareaText.length) {
        let lines = textareaText.split('\n');
        for (let i = 0; i < lines.length; ++i) {
            lines[i] = lines[i].replace(/\[mrctv:[^\]]*?\]/sgi, '')
                .replace(/.*?intermarkets.*/sgi, '')
                .replace(/.*?%%email%%.*/sgi, '')
                .replace(/^\s*/, '');
        }
        for (let i = lines.length - 1; i > 1; --i) {
            if (!(lines[i].length + lines[i - 1].length/* + lines[i-2].length*/)) {
                lines.splice(i, 1);
            }
        }
        let newLines = lines.join('\n');

        textarea['formatMe'].value = newLines;
        textarea['formatMe'].select()
        document.execCommand("copy")
        // window.getSelection().removeAllRanges()
        button['textButton'].innerHTML = "Formatted AND copied to clipboard for your convenience =D";    


    }
}
const TextFix = () => {
    return (
        <div className="container">
            <button
                id='textButton'
                onClick={fixMe}
                style={{ 
                    width: '100%', 
                    margin: '1rem 0',
                    padding: '.5rem 0',
                    fontSize: '1rem',
                    fontWeight: '600'

                }}
            >Format this text please!</button>
            <textarea
                id='formatMe'
                style={{ width: '100%', height: '75vh' }}
            ></textarea>

        </div>
    )
}

export default TextFix