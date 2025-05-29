import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Textarea } from '@/shared/ui/Textarea';

type PostEditorProps = {
  onSave: (content: string) => void;
};

export const PostEditor = ({ onSave }: PostEditorProps) => {
  const [content, setContent] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="glass rounded-xl p-4">
      <div className="flex gap-2 mb-4">
        <Button onClick={() => setIsPreview(false)} active={!isPreview}>
          Редактор
        </Button>
        <Button onClick={() => setIsPreview(true)} active={isPreview}>
          Превью
        </Button>
      </div>

      {isPreview ? (
        <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Напишите свой пост..."
          className="min-h-[200px]"
        />
      )}

      <div className="flex justify-end mt-4">
        <Button 
          onClick={() => onSave(content)}
          disabled={!content.trim()}
        >
          Опубликовать
        </Button>
      </div>
    </div>
  );
};