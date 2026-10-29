import "../index.css";
import {
  User,
  Brain,
  Code2,
  Languages,
  Bot,
  BrainCircuit,
  Atom,
  Server,
  Braces,
  Database,
  HardDrive,
} from "lucide-react";

const topics = [
  {
    id: 1,
    name: "Self Introduction",
    icon: User,
    color: "bg-blue-900/40 text-blue-400",
  },
  {
    id: 2,
    name: "Generative AI",
    icon: Brain,
    color: "bg-purple-900/40 text-purple-400",
  },
  {
    id: 3,
    name: "Python",
    icon: Code2,
    color: "bg-yellow-900/40 text-yellow-400",
  },
  {
    id: 4,
    name: "English",
    icon: Languages,
    color: "bg-green-900/40 text-green-400",
  },
  {
    id: 5,
    name: "SQL",
    icon: HardDrive,
    color: "bg-orange-900/40 text-orange-400",
  },
  {
    id: 6,
    name: "DSA",
    icon: BrainCircuit,
    color: "bg-red-900/40 text-red-400",
  },
  {
    id: 7,
    name: "React",
    icon: Atom,
    color: "bg-pink-900/40 text-pink-400",
  },
  {
    id: 8,
    name: "Node JS",
    icon: Server,
    color: "bg-green-900/40 text-green-400",
  },
  {
    id: 9,
    name: "Express JS",
    icon: Braces,
    color: "bg-yellow-900/40 text-yellow-400",
  },
  {
    id: 10,
    name: "MongoDB",
    icon: Database,
    color: "bg-blue-900/40 text-blue-400",
  },
];

const Sidebar = ({
  selectedTopic,
  setSelectedTopic,
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <aside
      className={`
        fixed
        lg:static

        top-0
        left-0

        z-50

        w-[300px]
        h-screen

        bg-black
        border-r
        border-zinc-900

        px-5
        py-6
        custom-scrollbar
        overflow-y-auto

        transition-transform
        duration-300

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
    >
      {/* Logo */}

      <div className="flex items-center justify-between pb-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Bot className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold whitespace-nowrap bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
            AI Interview
          </h1>
        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-3xl text-white"
        >
          ✕
        </button>
      </div>

      <p className="text-xs tracking-[4px] uppercase text-zinc-500 font-semibold mb-6">
        Select Topic
      </p>

      <div className="flex flex-col gap-5">
        {topics.map((topic) => {
          const Icon = topic.icon;

          return (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopic(topic.name);

                if (window.innerWidth < 1024) {
                  setSidebarOpen(false);
                }
              }}
              className={`w-full flex items-center gap-8 rounded-2xl p-5 transition duration-300 border
              ${
                selectedTopic === topic.name
                  ? "bg-violet-700 border-violet-500 shadow-lg shadow-violet-700/20"
                  : "bg-zinc-950 border-zinc-800 hover:border-violet-500 hover:bg-zinc-900"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${topic.color}`}
              >
                <Icon size={22} />
              </div>

              <span className="text-lg font-semibold text-white">
                {topic.name}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;