import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getRoot, $insertNodes } from 'lexical'
import { $generateNodesFromDOM } from '@lexical/html'

function HTMLImportPlugin({ initialHTML }) {
    const [editor] = useLexicalComposerContext()

    useEffect(() => {
        if (initialHTML) {
            editor.update(() => {
                const parser = new DOMParser()
                const dom = parser.parseFromString(initialHTML, 'text/html')

                const nodes = $generateNodesFromDOM(editor, dom)

                const root = $getRoot()
                root.clear()
                $insertNodes(nodes)
            })
        }
    }, [editor, initialHTML])

    return null
}

export default HTMLImportPlugin
