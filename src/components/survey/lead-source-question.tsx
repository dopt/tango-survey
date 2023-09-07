import { useBlock } from '@dopt/react';
import { type FormEventHandler } from 'react';
import { client } from '../../utils/dopt-users-client';

const options = [
  { value: 'coworker', label: '🤓 Coworker' },
  { value: 'google', label: '🔎 Google search' },
  { value: 'linkedin', label: '💼 LinkedIn' },
  { value: 'social', label: '📣 Social media (TikTok, Instagram, Twitter, etc.)' },
  { value: 'blog', label: '💻 Tango blog' },
  { value: 'word-of-mouth', label: '🗣️ Word of mouth' },
  { value: 'invite', label: '✉️ Email invite' },
  { value: 'other', label: '🤔 Something else' },
];

export function LeadSourceQuestion() {
  const [block, transition] = useBlock<['complete', 'social']>('tango-survey.lead-source');

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);

    const leadSource = data.get('lead-source');

    if (leadSource) {
      // Do something with answer
      // submit();

      client.users.identifyUser({
        identifier: 'SOME_USER_IDENTIFIER', // In real-world usage, you would pass this in dynamically
        properties: {
          leadSource
        },
      });

      if (leadSource == 'social') {
        transition('social');
      } else {
        transition('complete');
      }
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
              <input type="radio" name="lead-source" value={option.value} />
              {option.label}
            </label>
          </div>
        ))}

        <button type="submit">{block.field('button') as string}</button>
      </form>
    </div>
  )
}