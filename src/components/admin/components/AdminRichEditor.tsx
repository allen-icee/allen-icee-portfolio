// src/components/admin/components/AdminRichEditor.tsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { Icon } from '@iconify/react'

interface AdminRichEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

const menuButton =
  'flex size-7 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/70'

export default function AdminRichEditor({ content, onChange, placeholder }: AdminRichEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: placeholder ?? 'Start writing…' }),
    ],
    content,
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML())
    },
  })

  if (!editor) return null

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04]">

      <div className="flex flex-wrap items-center gap-0.5 border-b border-white/[0.06] px-3 py-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${menuButton} ${editor.isActive('bold') ? 'bg-purple-brand/20 text-purple-brand/80' : ''}`}
          aria-label="Bold"
        >
          <Icon icon="lucide:bold" className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${menuButton} ${editor.isActive('italic') ? 'bg-purple-brand/20 text-purple-brand/80' : ''}`}
          aria-label="Italic"
        >
          <Icon icon="lucide:italic" className="size-3.5" />
        </button>

        <span className="mx-1 h-4 w-px bg-white/[0.06]" aria-hidden />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${menuButton} ${editor.isActive('heading', { level: 2 }) ? 'bg-purple-brand/20 text-purple-brand/80' : ''}`}
          aria-label="Heading"
        >
          <Icon icon="lucide:heading-2" className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${menuButton} ${editor.isActive('heading', { level: 3 }) ? 'bg-purple-brand/20 text-purple-brand/80' : ''}`}
          aria-label="Subheading"
        >
          <Icon icon="lucide:heading-3" className="size-3.5" />
        </button>

        <span className="mx-1 h-4 w-px bg-white/[0.06]" aria-hidden />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${menuButton} ${editor.isActive('bulletList') ? 'bg-purple-brand/20 text-purple-brand/80' : ''}`}
          aria-label="Bullet list"
        >
          <Icon icon="lucide:list" className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${menuButton} ${editor.isActive('orderedList') ? 'bg-purple-brand/20 text-purple-brand/80' : ''}`}
          aria-label="Ordered list"
        >
          <Icon icon="lucide:list-ordered" className="size-3.5" />
        </button>

        <span className="mx-1 h-4 w-px bg-white/[0.06]" aria-hidden />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${menuButton} ${editor.isActive('blockquote') ? 'bg-purple-brand/20 text-purple-brand/80' : ''}`}
          aria-label="Blockquote"
        >
          <Icon icon="lucide:quote" className="size-3.5" />
        </button>
      </div>

      <div className="prose prose-invert prose-sm max-w-none px-4 py-3 text-white/70 [&_.ProseMirror-prompt]:text-white/30 [&_.ProseMirror]:min-h-[200px] [&_.ProseMirror]:outline-none [&_p.is-editor-empty:first-child::before]:text-white/20">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}