import { createRoot } from 'react-dom/client';

import "./index.scss";

// Main component (will eventually use all the others)
const CthuluFlixApplication = () => {
  return (
    <div className="cthulhu-flix">
      <div>Good morning</div>
    </div>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<CthulhuFlixApplication />);