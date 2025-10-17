'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { useState, useCallback } from 'react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  ImageIcon,
  Heading1,
  Heading2,
  Heading3,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Define callbacks before early return to follow Rules of Hooks
  const addLink = useCallback(() => {
    if (editor && linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  }, [editor, linkUrl]);

  const addImage = useCallback(() => {
    if (editor && imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setShowImageInput(false);
    }
  }, [editor, imageUrl]);

  if (!editor) {
    return null;
  }

  const buttonClass = (isActive = false) =>
    `p-2 rounded hover:bg-amber-100 transition-colors ${
      isActive ? 'bg-amber-200 text-[rgb(var(--color-brown))]' : 'text-gray-700'
    }`;

  return (
    <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1 bg-gray-50 sticky top-0 z-10">
      {/* Text Formatting */}
      <div className="flex gap-1 border-r border-gray-300 pr-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonClass(editor.isActive('bold'))}
          type="button"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonClass(editor.isActive('italic'))}
          type="button"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={buttonClass(editor.isActive('underline'))}
          type="button"
          title="Underline"
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={buttonClass(editor.isActive('strike'))}
          type="button"
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={buttonClass(editor.isActive('code'))}
          type="button"
          title="Code"
        >
          <Code className="w-4 h-4" />
        </button>
      </div>

      {/* Headings */}
      <div className="flex gap-1 border-r border-gray-300 pr-2">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={buttonClass(editor.isActive('heading', { level: 1 }))}
          type="button"
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={buttonClass(editor.isActive('heading', { level: 2 }))}
          type="button"
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={buttonClass(editor.isActive('heading', { level: 3 }))}
          type="button"
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>
      </div>

      {/* Lists & Quotes */}
      <div className="flex gap-1 border-r border-gray-300 pr-2">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buttonClass(editor.isActive('bulletList'))}
          type="button"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={buttonClass(editor.isActive('orderedList'))}
          type="button"
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={buttonClass(editor.isActive('blockquote'))}
          type="button"
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </button>
      </div>

      {/* Alignment */}
      <div className="flex gap-1 border-r border-gray-300 pr-2">
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={buttonClass(editor.isActive({ textAlign: 'left' }))}
          type="button"
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={buttonClass(editor.isActive({ textAlign: 'center' }))}
          type="button"
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={buttonClass(editor.isActive({ textAlign: 'right' }))}
          type="button"
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
      </div>

      {/* Link & Image */}
      <div className="flex gap-1 border-r border-gray-300 pr-2">
        <div className="relative">
          <button
            onClick={() => setShowLinkInput(!showLinkInput)}
            className={buttonClass(editor.isActive('link'))}
            type="button"
            title="Add Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          {showLinkInput && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-64"
            >
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addLink();
                  }
                }}
              />
              <div className="flex gap-2">
                <button
                  onClick={addLink}
                  className="px-3 py-1 bg-gradient-to-r from-[rgb(var(--color-gold))] to-[rgb(var(--color-brown))] text-white rounded text-sm"
                  type="button"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowLinkInput(false)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setShowImageInput(!showImageInput)}
            className={buttonClass()}
            type="button"
            title="Add Image"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          {showImageInput && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-64"
            >
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addImage();
                  }
                }}
              />
              <div className="flex gap-2">
                <button
                  onClick={addImage}
                  className="px-3 py-1 bg-gradient-to-r from-[rgb(var(--color-gold))] to-[rgb(var(--color-brown))] text-white rounded text-sm"
                  type="button"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowImageInput(false)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Undo/Redo */}
      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`${buttonClass()} disabled:opacity-30 disabled:cursor-not-allowed`}
          type="button"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`${buttonClass()} disabled:opacity-30 disabled:cursor-not-allowed`}
          type="button"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false, // Fix SSR hydration mismatch in Next.js 15
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[rgb(var(--color-gold))] underline hover:text-[rgb(var(--color-brown))]',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <MenuBar editor={editor} />
      <div className="prose-editor">
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>
    </div>
  );
}
