import React from "react";

function About() {
  return (
    <main className="about">
      <section className="about-info">
        <h2 className="about-info-name">mitchell johnson</h2>
        <p className="about-info-p"> Software developer and IT professional</p>
        <div className="social-links">
          <li>
            <a data-testid="github" href="https://github.com/boring-jpg" target="_blank">
              <i className="fa-brands fa-github fa-2xl"></i>
            </a>
          </li>
          <li>
            <a
              data-testid="linkedin"
              href="https://www.linkedin.com/in/mitchell-j/"
              target="_blank"
            >
              <i className="fa-brands fa-linkedin fa-2xl"></i>
            </a>
          </li>
        </div>
      </section>
    </main>
  );
}

export default About;
