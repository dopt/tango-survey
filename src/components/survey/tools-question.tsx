import { useBlock } from '@dopt/react';
import { type FormEventHandler } from 'react';
import { client } from '../../utils/dopt-users-client';

const options = [
  { value: 'a', label: 'Tool A' },
  { value: 'b', label: 'Tool B' },
  { value: 'c', label: 'Tool C' },
  { value: 'd', label: 'Tool D' },
  { value: 'other', label: 'Something else' },
];

export function ToolsQuestion() {
  const [block, transition] = useBlock<['complete']>('tango-survey.tools');

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);

    const tools = data.getAll('tools');

    if (tools.length) {
      // Do something with answer
      // submit();

      client.users.identifyUser({
        identifier: 'SOME_USER_IDENTIFIER', // In real-world usage, you would pass this in dynamically
        properties: {
          tools: tools.join(','),
        },
      });

      transition('complete');
    }
  };

  if (!block.state.active) return null;

  return (
    <div>
      <h1>{block.field('title') as string}</h1>

      <form onSubmit={handleSubmit}>
        {options.map((option) => (
          <div key={option.value}>
            <label>
              <input type="checkbox" name="tools" value={option.value} />
              {option.label}
            </label>
          </div>
        ))}

        <button type="submit">{block.field('button') as string}</button>
      </form>
    </div>
  )
}