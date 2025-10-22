import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleInterestChange = (interest) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const interestsText = interests.length > 0 ? ` Your interests: ${interests.join(', ')}.` : '';
    setMessage(`Thank you for signing up, ${name}!${interestsText}`);
  };

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a
          href="https://linkedin.com">LinkedIn</a>
      </div>

      <h2>Newsletter Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <fieldset>
          <legend>Interests:</legend>
          <label>
            <input
              type="checkbox"
              checked={interests.includes('Interest 1')}
              onChange={() => handleInterestChange('Interest 1')}
            />
            Interest 1
          </label>
          <label>
            <input
              type="checkbox"
              checked={interests.includes('Interest 2')}
              onChange={() => handleInterestChange('Interest 2')}
            />
            Interest 2
          </label>
          <label>
            <input
              type="checkbox"
              checked={interests.includes('Interest 3')}
              onChange={() => handleInterestChange('Interest 3')}
            />
            Interest 3
          </label>
        </fieldset>

        <button type="submit">Submit</button>
      </form>

      {submitted && <p>{message}</p>}
    </main>
  );
}

export default App;
