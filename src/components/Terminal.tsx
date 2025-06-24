import React, { useState, useRef, useEffect } from "react";

interface TerminalProps {
  username?: string;
  hostname?: string;
  commands?: Record<string, (args: string[]) => string>;
  initialMessage?: string;
  isDarkMode: boolean;
  projects: {
    id: string;
    title: string;
    description: string;
    images: string[];
    technologies: string[];
    fullDescription: string;
  }[];
}

interface CommandHistory {
  command: string;
  output: string;
}

const Terminal = ({
  username = "visitor",
  hostname = "portfolio",
  commands = {},
  initialMessage = "Welcome to my portfolio! Type 'help' to see available commands.",
  isDarkMode,
  projects,
}: TerminalProps) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Personal portfolio commands
  const defaultCommands: Record<string, (args: string[]) => string> = {
    help: () => {
      const allCommands = { ...defaultCommands, ...commands };
      return `Available commands:
${Object.keys(allCommands).map(cmd => `  ${cmd.padEnd(12)} - ${getCommandDescription(cmd)}`).join('\n')}

Try any command to learn more about me!`;
    },
    
    clear: () => {
      setTimeout(() => setHistory([]), 0);
      return "";
    },
    
    about: () =>
      `👋 Hello! I'm a developer who loves to develop and design amazing things.
    
    🎯 I enjoy working on challenging projects and learning new technologies.
    Always excited to collaborate and build something great together!    

💡 Curious about my background? Try 'education', or 'hobbies'!`,

education: () =>
  `🎓 Education:

Bachelor of Science in Information Technology  
Nueva Ecija University of Science and Technology | 2023 - 2027  
• Currently a 3rd-year student  
• Learning full-stack development — diving into Next.js, backend systems, and modern web technologies  
• Actively building websites for practice using React to sharpen real-world dev skills

💡 Always growing — committed to mastering both front-end and back-end technologies.`,


location: () =>
  `🌍 Location & Availability:

📍 Currently based in: Philippines  
🕐 Timezone: PHT (UTC+8)  
🌐 Work Style: Remote-friendly, open to global collaboration

🏢 Available for:  
• Freelance projects  
• Part-time work  
• Full-time positions`,



whoami: () =>
  `👤 About Me:

Name: Reiniel  
Role: Web Developer / Designer  
Passion: Building clean, functional websites and interfaces  
Status: Always learning, always improving

💻 Focused on writing maintainable code  
🛠️ Hands-on with both front-end and back-end workflows  
🎨 Committed to creating intuitive, user-friendly designs


Type 'hobbies' to see what I do when I'm not coding!`,

hobbies: () => {
  return `🎮 When I'm not coding, I enjoy:

• Gaming – especially competitive or co-op games  
• Listening to music – helps me focus and unwind  
• Watching movies and series – from thrillers to anime  
• Hanging out and playing with friends – online or in person`;
},


skills: () => 
  `💻 Technical Skills:

Frontend:
- HTML5, CSS3, Tailwind CSS
- JavaScript (ES6+), React
- Basic TypeScript

Backend:
- Currently learning backend development`,
  };

  // Helper function to get command descriptions
  const getCommandDescription = (cmd: string): string => {
    const descriptions = {
      help: "Show all available commands",
      clear: "Clear the terminal screen",
      about: "Brief introduction about me",
      education: "My educational background",
      location: "Where I'm based and availability",
      whoami: "Personal introduction",
      hobbies: "What I do for fun",
      skills: "Technical skills and expertise",
    };
    return descriptions[cmd] || "No description available";
  };

  // Combine default and custom commands
  const allCommands = { ...defaultCommands, ...commands };

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when terminal is clicked
  useEffect(() => {
    if (initialMessage) {
      setHistory([{ command: "", output: initialMessage }]);
    }
  }, [initialMessage]);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const args = input.trim().split(" ");
    const cmd = args[0].toLowerCase();
    const cmdArgs = args.slice(1);

    let output = "";
    if (cmd in allCommands) {
      output = allCommands[cmd](cmdArgs);
    } else {
      output = `Command not found: ${cmd}. Type 'help' to see available commands.`;
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput("");
  };

  return (
    <div className="w-full max-w-4xl h-96 bg-black rounded-md shadow-lg overflow-hidden border border-gray-700 flex flex-col mx-auto">
      {/* Terminal header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-gray-400 text-sm font-mono">
          reiniel@portfolio:~
        </div>
      </div>

      {/* Terminal content */}
      <div
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-sm text-green-400 bg-black cursor-text"
        onClick={handleClick}
      >
        {history.map((item, index) => (
          <div key={index} className="mb-2">
            {item.command && (
              <div className="flex">
                <span className="text-blue-400 mr-2">
                  reiniel@portfolio:~$
                </span>
                <span>{item.command}</span>
              </div>
            )}
            <div className="whitespace-pre-line text-gray-100">{item.output}</div>
          </div>
        ))}
        <div className="flex">
          <span className="text-blue-400 mr-2">
            reiniel@portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(e);
              }
            }}
            className="bg-transparent outline-none text-green-400 w-full flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;