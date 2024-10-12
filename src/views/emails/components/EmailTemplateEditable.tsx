import { useState } from 'react';
import EmailTemplateEditableCards from './EmailTemplateEditableCards';
import EmailTemplateFooter from './EmailTemplateFooter';
import EmailTemplateHeaderAndContent from './EmailTemplateHeaderAndContent';

type SegmentValues = 'headerAndContent' | 'editableCards' | 'footer';
const segmentButtons: {
  name: string;
  value: SegmentValues;
}[] = [
  {
    name: 'Header & Content',
    value: 'headerAndContent',
  },
  {
    name: 'Edit Cards List',
    value: 'editableCards',
  },
  {
    name: 'Footer',
    value: 'footer',
  },
];

export default function EmailTemplateEditable() {
  const [segment, setSegment] = useState<SegmentValues>('headerAndContent');

  return (
    <div>
      <div className='space-y-4 '>
        <div className='segment flex'>
          {segmentButtons.map((button, index) => (
            <button
              key={index}
              className={`flex-1 border-b-2 ${
                segment === button.value
                  ? 'border-primary  font-bold'
                  : 'border-transparent'
              } py-4 transition-colors`}
              type='button'
              onClick={() => setSegment(button.value)}
            >
              {button.name}
            </button>
          ))}
        </div>
        {segment === 'headerAndContent' && <EmailTemplateHeaderAndContent />}
        {segment === 'editableCards' && <EmailTemplateEditableCards />}
        {segment === 'footer' && <EmailTemplateFooter />}
      </div>
    </div>
  );
}
