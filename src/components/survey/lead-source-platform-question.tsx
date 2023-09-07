import { useBlock } from '@dopt/react';
import { type FormEventHandler } from 'react';
import { client } from '../../utils/dopt-users-client';

const options = [
  { value: 'tiktok', label: 'TikTok' },
  { value: 'Twitter', label: 'Twitter' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'reddit', label: 'Reddit' },
  { value: 'other', label: 'Something else' },
];

export function LeadSourcePlatformQuestion() {
  const [block, transition] = useBlock<['complete', 'social']>('tango-survey.lead-source-platform');

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);

    const leadSourcePlatform = data.get('lead-source-platform');

    if (leadSourcePlatform) {
      // Do something with answer
      // submit();

      client.users.identifyUser({
        identifier: 'SOME_USER_IDENTIFIER', // In real-world usage, you would pass this in dynamically
        properties: {
          leadSourcePlatform
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
              <input type="radio" name="lead-source-platform" value={option.value} />
              {option.label}
            </label>
          </div>
        ))}

        <button type="submit">{block.field('button') as string}</button>
      </form>
    </div>
  )
}