const skills = [
  {
    category: "Frontend",
    skills: [
      {
        name: "JavaScript",
        icon: (
          <svg
            className="me-1 size-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 128 128"
          >
            <path
              fill="currentColor"
              d="M2 1v125h125V1H2zm66.119 106.513c-1.845 3.749-5.367 6.212-9.448 7.401-6.271 1.44-12.269.619-16.731-2.059-2.986-1.832-5.318-4.652-6.901-7.901l9.52-5.83c.083.035.333.487.667 1.071 1.214 2.034 2.261 3.474 4.319 4.485 2.022.69 6.461 1.131 8.175-2.427 1.047-1.81.714-7.628.714-14.065C58.433 78.073 58.48 68 58.48 58h11.709c0 11 .06 21.418 0 32.152.025 6.58.596 12.446-2.07 17.361zm48.574-3.308c-4.07 13.922-26.762 14.374-35.83 5.176-1.916-2.165-3.117-3.296-4.26-5.795 4.819-2.772 4.819-2.772 9.508-5.485 2.547 3.915 4.902 6.068 9.139 6.949 5.748.702 11.531-1.273 10.234-7.378-1.333-4.986-11.77-6.199-18.873-11.531-7.211-4.843-8.901-16.611-2.975-23.335 1.975-2.487 5.343-4.343 8.877-5.235l3.688-.477c7.081-.143 11.507 1.727 14.756 5.355.904.916 1.642 1.904 3.022 4.045-3.772 2.404-3.76 2.381-9.163 5.879-1.154-2.486-3.069-4.046-5.093-4.724-3.142-.952-7.104.083-7.926 3.403-.285 1.023-.226 1.975.227 3.665 1.273 2.903 5.545 4.165 9.377 5.926 11.031 4.474 14.756 9.271 15.672 14.981.882 4.916-.213 8.105-.38 8.581z"
            />
          </svg>
        ),
      },
      {
        name: "HTML",
        icon: (
          <svg
            className="me-1 size-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 128 128"
          >
            <path
              fill="currentColor"
              d="M9.032 2l10.005 112.093 44.896 12.401 45.02-12.387L118.968 2H9.032zm89.126 26.539l-.627 7.172L97.255 39H44.59l1.257 14h50.156l-.336 3.471-3.233 36.119-.238 2.27L64 102.609v.002l-.034.018-28.177-7.423L33.876 74h13.815l.979 10.919L63.957 89H64v-.546l15.355-3.875L80.959 67H33.261l-3.383-38.117L29.549 25h68.939l-.33 3.539z"
            />
          </svg>
        ),
      },
      {
        name: "Tailwind CSS",
        icon: (
          <svg
            className="me-1 size-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 128 128"
          >
            <path
              d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0"
              fill="currentColor"
            />
          </svg>
        ),
      },
      {},
    ],
  },
];

function Skills() {
  return (
    <div>
      <h2 className="mb-5 font-medium text-gray-800 dark:text-neutral-200">
        Skills
      </h2>

      <div className="space-y-3">
        {skills.map((skills) => {
          return (
            <dl
              key={skills.category}
              className="flex flex-col gap-1 sm:flex-row"
            >
              <dt className="min-w-40">
                <span className="block text-sm text-gray-500 dark:text-neutral-500">
                  {skills.category}:
                </span>
              </dt>
              <dd>
                <ul>
                  {skills.skills.map((skill) => (
                    <li
                      key={skills.category + skill.name}
                      className="me-1 inline-flex items-center text-sm text-gray-800 dark:text-neutral-200 [&:not(:last-child)]:after:content-[',']"
                    >
                      {skill.icon}
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
          );
        })}
      </div>
    </div>
  );
}

export default Skills;
