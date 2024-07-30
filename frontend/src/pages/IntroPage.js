import React from 'react';

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

  const navBarStyle = {
    display: 'flex',
   
    alignItems: 'center',
    padding: '10px 20px',
    color: '#fff',
    justifyContent: 'center',
    width :"100%"
  };

  const navLinkStyle = {
    color: '#fff',
    textDecoration: 'none',
    marginLeft: '20px',
  };

  const githubLinkStyle = {
    color: '#fff',
    textDecoration: 'none',
    marginLeft: '20px',
    backgroundColor: '#39d353',
    padding: '5px 10px',
    borderRadius: '5px',
   
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
      <nav style={navBarStyle}>
        <div>
          <a style={githubLinkStyle} href="https://github.com/mathpalvipin/TaskManager.git" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </nav>

      <header style={headerStyle}>
        <h1 style={headerTitleStyle}>Welcome to Our Task Manager</h1>
        <p style={headerTextStyle}>This web application is built using the following technologies:</p>
      </header>

      <section style={sectionStyle} id="frontend">
        <h2 style={sectionTitleStyle}>Frontend</h2>
        <ul>
          <li style={listItemStyle}>
            <strong style={listItemStrongStyle}>React</strong>: A JavaScript library for building user interfaces.
          </li>
          <li style={listItemStyle}>
            <strong style={listItemStrongStyle}>React Context</strong>: Used for authentication context throughout the web app.
          </li>
          <li style={listItemStyle}>
            <strong style={listItemStrongStyle}>React-Redux</strong>: To manage and centralize task management state.
          </li>
        </ul>
      </section>

      <section style={sectionStyle} id="backend">
        <h2 style={sectionTitleStyle}>Backend</h2>
        <ul>
          <li style={listItemStyle}>
            <strong style={listItemStrongStyle}>Node.js</strong>: A JavaScript runtime built on Chrome's V8 JavaScript engine.
          </li>
          <li style={listItemStyle}>
            <strong style={listItemStrongStyle}>Node-Scheduler</strong>: To schedule tasks.(The scheduling script that continuously monitors and schedules tasks should be deployed on an environment that supports long-running processes. Vercel itself does not support long-running processes, so you'll need to use Localhost for notification task.).
          </li>
          <li style={listItemStyle}>
            <strong style={listItemStrongStyle}>Cron Job</strong>: For periodic task scheduling.
          </li>
          <li style={listItemStyle}>
            <strong style={listItemStrongStyle}>JWT (JSON Web Token)</strong>: Used for secure authentication, with tokens stored in HTTP-only cookies.
          </li>
          <li style={listItemStyle}>
            <strong style={listItemStrongStyle}>MongoDB</strong>: A NoSQL database for storing application data.
          </li>
        </ul>
      </section>

      <section style={sectionStyle} id="notifications">
        <h2 style={sectionTitleStyle}>Notifications</h2>
        <ul>
          <li style={listItemStyle}>
            <strong style={listItemStrongStyle}>WebPush</strong>: To send notifications.
          </li>
          <li style={listItemStyle}>
            <strong style={listItemStrongStyle}>Service Worker</strong>: To listen to push events and show notifications on the frontend.
          </li>
        </ul>
      </section>

      <section style={sectionStyle} id="features">
        <h2 style={sectionTitleStyle}>Features</h2>
        <ul>
          <li style={listItemStyle}>
            <strong style={listItemStrongStyle}>Task Management</strong>:
            <ul>
              <li style={listItemStyle}>Create, edit, and delete tasks.</li>
              <li style={listItemStyle}>Set tasks to be recursive (daily, monthly, yearly, for birthdays).</li>
              <li style={listItemStyle}>Share tasks with other users.</li>
              <li style={listItemStyle}>Get notifications at task time.</li>
            </ul>
          </li>
        </ul>
      </section>

      <footer style={footerStyle}>
        <h2 style={footerTitleStyle}>How to Use</h2>
        <p style={footerTextStyle}>Log in to your account to start managing your tasks. You can create new tasks, set their recurrence, share them with your friends and colleagues, and receive notifications when tasks are due.</p>
      </footer>
    </div>
  );
};

export default IntroPage;
