import { useEffect, useState } from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import HTMLExportPlugin from './HTMLExportPlugin'
import HTMLImportPlugin from './HTMLImportPlugin'
import { ParagraphNode } from 'lexical'

function Placeholder() {
    return <div className="editor-placeholder">Enter some text...</div>
}

function RichTextEditor({ labelText, id, materialValue, setMaterialValue }) {
    const [html, setHtml] = useState('')

    const initialConfig = {
        namespace: 'MyEditor',
        onError: (error) => console.error(error),
        nodes: [ParagraphNode],
        theme: {
            paragraph: 'mb-1',
        },
    }

    return (
        <div>
            {labelText && (
                <label
                    htmlFor={id}
                    className={`mb-2 block text-sm font-medium text-gray-900`}
                >
                    {labelText}
                </label>
            )}
            <div className="w-full border border-gray-300 p-2.5 text-sm text-gray-900">
                <LexicalComposer initialConfig={initialConfig}>
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable className="editor-input" />
                        }
                        placeholder={<Placeholder />}
                    />
                    <HistoryPlugin />
                    <HTMLExportPlugin
                        setHtml={setHtml}
                        materialValue={materialValue}
                        setMaterialValue={setMaterialValue}
                    />
                    <HTMLImportPlugin initialHTML={materialValue} />
                    <OnChangePlugin
                        onChange={(editorState) => {
                            editorState.read(() => {
                                // You can perform additional actions here when the editor state changes
                            })
                        }}
                    />
                </LexicalComposer>
            </div>
        </div>
    )
}

export default RichTextEditor
