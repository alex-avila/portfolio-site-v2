function About() {
  return (
    <div>
      <h1 className="text-lg font-medium text-gray-800 dark:text-neutral-200">
        Alex Avila
      </h1>
      <p className="text-sm text-gray-600 dark:text-neutral-400">
        Web Developer
      </p>
      {/* TODO: rewrite this to be better */}
      <div className="mt-8">
        <p className="text-sm text-gray-600 dark:text-neutral-400">
          I'm a web developer with 6+ years of experience in building for the
          web. Specializing in frontend development and passionate about
          building beautiful, functional, accessible user interfaces.
        </p>
        <p className="mt-3 text-sm text-gray-600 dark:text-neutral-400">
          My expertise includes implementing changes on the backend, setting up
          deployment processes, creating pixel-perfect user interfaces and web
          performance optimization. Helping clients bring their visions to life.
        </p>
      </div>
    </div>
  );
}

export default About;
