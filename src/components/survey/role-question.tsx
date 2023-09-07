import { useBlock } from '@dopt/react';
import { type FormEventHandler } from 'react';
import { client } from '../../utils/dopt-users-client';

const options = [
  { value: 'corporate-learning', label: '🗂️ Corporate learning & development' },
  { value: 'customer-support', label: '😊 Customer support' },
  { value: 'customer-success', label: '💫 Customer success' },
  { value: 'educator', label: '🍎 Educator' },
  { value: 'engineering', label: '⚙️ Engineering' },
  { value: 'finance', label: '💸 Finance/Accounting' },
  { value: 'founder', label: '⛰️ Founder' },
  { value: 'it', label: '💻 IT' },
  { value: 'hr', label: '✏️ HR' },
  { value: 'marketing', label: '🛍️ Marketing' },
  { value: 'operations', label: '🏗️ Operations' },
  { value: 'product', label: '💡 Product' },
  { value: 'sales', label: '📈 Sales' },
  { value: 'other', label: '🤔 Something else' },
];

export function RoleQuestion() {
  const [block, transition] = useBlock<['complete']>('tango-survey.role');

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);

    const role = data.get('role');

    if (role) {
      // Do something with answer
      // submit();

      client.users.identifyUser({
        identifier: 'SOME_USER_IDENTIFIER', // In real-world usage, you would pass this in dynamically
        properties: {
          role
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
              <input type="radio" name="role" value={option.value} />
              {option.label}
            </label>
          </div>
        ))}

        <button type="submit">{block.field('button') as string}</button>
      </form>
    </div>
  )
}