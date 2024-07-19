

const IntroPage = () => {
  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px',
  };

  const headerTitleStyle = {
    fontSize: '2.5em',
    marginBottom: '10px',
  };

  const headerTextStyle = {
    fontSize: '1.2em',
    color: '#555',
  };

  const sectionStyle = {
    marginBottom: '30px',
  };

  const sectionTitleStyle = {
    fontSize: '1.8em',
    color: '#333',
    marginBottom: '10px',
  };

  const listItemStyle = {
    backgroundColor: '#fff',
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const listItemStrongStyle = {
    color: '#007BFF',
  };

  const footerStyle = {
    textAlign: 'center',
    marginTop: '40px',
  };

  const footerTitleStyle = {
    fontSize: '1.8em',
    marginBottom: '10px',
  };

  const footerTextStyle = {
    fontSize: '1.2em',
    color: '#555',
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={headerTitleStyle}>Welcome to Our Web App!</h1>
        <p style={headerTextStyle}>This web application is built using the following technologies:</p>
      </header>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Frontend</h2>
        <ul>
          <li style={listItemStyle}>
            <strong style={listItemStrongStyle}>React</strong>: A JavaScript library for building user interfaces.
          </li>
          <li style={listItemStyle}>
            <strong style={listItemStrongStyle}>React-Redux</strong>: To manage and centralize the application state.
          </li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Backend</h2>
        <ul>
          <li style={listItemStyle}>
            <strong style={listItemStrongStyle}>Node.js</strong>: A JavaScript runtime built on Chrome's V8 JavaScript engine.
          </li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Authentication</h2>
        <ul>
          <li style={listItemStyle}>
            <strong style={listItemStrongStyle}>JWT (JSON Web Token)</strong>: For secure authentication using context hook and storing tokens in HTTP-only cookies.
          </li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Features</h2>
        <ul>
          <li style={listItemStyle}>
            <strong style={listItemStrongStyle}>Task Management</strong>:
            <ul>
              <li style={listItemStyle}>Create, edit, and delete tasks.</li>
              <li style={listItemStyle}>Set tasks to be recursive (daily, monthly, yearly, for birthdays).</li>
              <li style={listItemStyle}>Share tasks with other users.</li>
            </ul>
          </li>
        </ul>
      </section>

      <footer style={footerStyle}>
        <h2 style={footerTitleStyle}>How to Use</h2>
        <p style={footerTextStyle}>Log in to your account to start managing your tasks. You can create new tasks, set their recurrence, and share them with your friends and colleagues.</p>
      </footer>
    </div>
  );
};
export default IntroPage;
