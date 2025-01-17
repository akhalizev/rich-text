import React, { useEffect, useRef } from 'react';
import 'trix/dist/trix.css';
import 'trix';

interface TrixEditorProps {
  onChange?: (html: string) => void;
  value?: string;
  placeholder?: string;
  className?: string;
}

export function TrixEditor({ onChange, value, placeholder, className }: TrixEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const trixElement = editorRef.current.querySelector('trix-editor');
    
    if (!trixElement) return;

    const handleChange = (event: Event) => {
      const target = event.target as HTMLElement;
      onChange?.(target.getAttribute('value') || '');
    };

    // Prevent file attachments
    const preventFileAttachment = (event: Event) => {
      event.preventDefault();
    };

    trixElement.addEventListener('trix-change', handleChange);
    trixElement.addEventListener('trix-file-accept', preventFileAttachment);
    
    if (value) {
      (trixElement as any).editor?.loadHTML(value);
    }

    return () => {
      trixElement.removeEventListener('trix-change', handleChange);
      trixElement.removeEventListener('trix-file-accept', preventFileAttachment);
    };
  }, [onChange, value]);

  useEffect(() => {
    // Remove attachment tools from toolbar
    const attachmentTools = document.querySelectorAll(`
      .trix-button-group--file-tools,
      [data-trix-action="attachFiles"],
      [data-trix-attribute="href"]
    `);
    attachmentTools.forEach(element => element.remove());
  }, []);

  return (
    <div ref={editorRef} className={className}>
      <trix-editor
        placeholder={placeholder}
        class="trix-content prose max-w-none min-h-[200px] focus:outline-none"
      />
    </div>
  );
}