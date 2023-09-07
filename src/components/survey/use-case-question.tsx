import { useBlock } from '@dopt/react';
import { type FormEventHandler } from 'react';
import { client } from '../../utils/dopt-users-client';

const options = [
  { value: 'onboard-new-hires', label: '🛳️ Onboard new hires' },
  { value: 'roll-out-software', label: '📚 Roll out new or updated software' },
  { value: 'support-customers', label: '🌟 Support customers' },
  { value: 'support-merger', label: '💡 Support a merger / acquisition' },
  { value: 'standardize', label: '💪 Standardize best practices or operating procedures' },
  { value: 'other', label: '🧐 Something else' },
];

export function UseCaseQuestion() {
  const [block, transition] = useBlock<['complete']>('tango-survey.use-case');

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);

    const useCase = data.getAll('use-case');

    if (useCase.length) {
      // Do something with answer
      // submit();

      client.users.identifyUser({
        identifier: 'SOME_USER_IDENTIFIER', // In real-world usage, you would pass this in dynamically
        properties: {
          useCase: useCase.join(','),
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
              <input type="checkbox" name="use-case" value={option.value} />
              {option.label}
            </label>
          </div>
        ))}

        <button type="submit">{block.field('button') as string}</button>
      </form>
    </div>
  )
}