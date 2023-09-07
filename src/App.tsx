import { CreateWorkspace, JoinWorkspace, LeadSourcePlatformQuestion, LeadSourceQuestion, PostSurvey, RoleQuestion, ToolsQuestion, UseCaseQuestion } from './components/survey';

import { useFlow } from '@dopt/react';

function App() {
  const [flow, intent] = useFlow('tango-survey');

  return (
    <>
      {/* Just a convenient reset button to go through the flow again */}
      <button onClick={intent.reset}>Reset</button>

      {/* Each of these will render depending on the `active` state of their respective block */}
      <UseCaseQuestion />
      <RoleQuestion />
      <ToolsQuestion />
      <LeadSourceQuestion />
      <LeadSourcePlatformQuestion />
      {/* The create and join workspace pages will render depending on the `workspaceAvailable` user property */}
      <CreateWorkspace />
      <JoinWorkspace />
      <PostSurvey />

      {flow.state.finished && <div>Flow finished!</div>}
    </>
  )
}

export default App
