import { useEffect, useState } from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import HTMLExportPlugin from './HTMLExportPlugin'
import HTMLImportPlugin from './HTMLImportPlugin'

function RichTextEditor({ labelText, id, materialValue, setMaterialValue }) {
    const [html, setHtml] = useState('')

    const initialConfig = {
        namespace: 'MyEditor',
        onError: (error) => console.error(error),
    }

    return (
        <div>
            {labelText && (
                <label
                    htmlFor={id}
                    className={`mb-2 block text-sm font-medium text-gray-900`}
                >
                    {labelText}
                    <span></span>
                </label>
            )}
            <div className="w-full border border-gray-300 p-2.5 text-sm text-gray-900">
                <LexicalComposer initialConfig={initialConfig} id={id}>
                    <PlainTextPlugin
                        contentEditable={
                            <ContentEditable className="editor-input" />
                        }
                    />
                    <HistoryPlugin />
                    <HTMLExportPlugin
                        setHtml={setHtml}
                        materialValue={materialValue}
                        setMaterialValue={setMaterialValue}
                    />
                    <HTMLImportPlugin initialHTML={materialValue} />
                </LexicalComposer>
            </div>
        </div>
    )
}
export default RichTextEditor
