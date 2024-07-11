import "../styles/LandingPage.css";

function LandingPage({ onButtonClick }) {
  return (
    <>
      <div className="container">
        <nav className="header">
          <div className="ubuntu-medium">dash</div>
          <div className="button-to-app">
            <button onClick={onButtonClick}>Get Started</button>
          </div>
        </nav>
        <section className="hero-section">
          <div className="hero-caption">
            The Only Productivity App You'll Need
          </div>
          <div className="hero-subtext">
            <span>
              dash helps you stay on top of your tasks, projects, and life.
            </span>
            <span>Say Goodbye To Cluttered Browsers and background apps.</span>
          </div>
        </section>

        <section className="details">
          <div className="details-first">
            dash is the ultimate combination of productivity and simplicity.
            It's designed to make your day easier. With dash, you can manage
            your tasks, days, and projects.
          </div>
          <div className="details-second">
            dash intergrates into your workflow, it provides a central hub for
            all your needs by bringing all your daily tools, services and apps
            into one place.
          </div>
        </section>

        <footer className="footer">
          <p className="foorer-title">dash</p>
          <a href="https://github.com/sricharanandra/dash">GitHub</a>
        </footer>
      </div>
    </>
  );
}

export default LandingPage;
