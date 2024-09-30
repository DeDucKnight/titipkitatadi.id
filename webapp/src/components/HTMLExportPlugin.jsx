import { useEffect, useState } from 'react'
import { $generateHtmlFromNodes } from '@lexical/html'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

function HTMLExportPlugin({ setHtml, setMaterialValue }) {
    const [editor] = useLexicalComposerContext()
    const [lastHtml, setLastHtml] = useState('')

    useEffect(() => {
        return editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                const html = $generateHtmlFromNodes(editor)
                if (html !== lastHtml) {
                    setLastHtml(html)
                    setMaterialValue(html)
                }
            })
        })
    }, [editor, setHtml, lastHtml, setMaterialValue])

    return null
}

export default HTMLExportPlugin
