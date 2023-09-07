import { useBlock } from '@dopt/react';
import RichText from '@dopt/react-rich-text';

export function PostSurvey() {
  const [block, transition] = useBlock<['complete']>('tango-survey.post-survey');

  if (!block.state.active) return null;

  return (
    <div>
      <h1>{block.field('title') as string}</h1>
      <RichText>{block.field('body')}</RichText>
      <button onClick={() => transition('complete')}>{block.field('button') as string}</button>
    </div>
  )
}