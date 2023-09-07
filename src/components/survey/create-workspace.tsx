import { useBlock } from '@dopt/react';
import RichText from '@dopt/react-rich-text';
import { type FormEventHandler } from 'react';

export function CreateWorkspace() {
  const [block, transition] = useBlock<['complete']>('tango-survey.create-workspace');

  const handleSubmit: FormEventHandler = () => {
    transition('complete');
  };

  if (!block.state.active) return null;

  return (
    <div>
      <h1>{block.field('title') as string}</h1>
      <RichText>{block.field('body')}</RichText>
      <form onSubmit={handleSubmit}>
        <div><input type="text" required /></div>
        <button type="submit">{block.field('button') as string}</button>
      </form>
    </div>
  )
}