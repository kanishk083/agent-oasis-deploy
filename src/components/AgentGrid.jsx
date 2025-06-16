
import AgentCard from "./AgentCard";

const agents = [
  {
    id: "voice-assistant",
    name: "Voice Assistant",
    description: "Handle customer calls and provide 24/7 phone support",
    emoji: "🗣️",
    category: "Customer Service"
  },
  {
    id: "scheduling-bot",
    name: "Scheduling Bot", 
    description: "Automate appointment booking and calendar management",
    emoji: "📅",
    category: "Productivity"
  },
  {
    id: "crm-assistant",
    name: "CRM Assistant",
    description: "Manage leads, update records, and track sales pipeline",
    emoji: "💼",
    category: "Sales"
  },
  {
    id: "email-agent",
    name: "Email Agent",
    description: "Sort emails, draft responses, and manage your inbox",
    emoji: "📧",
    category: "Communication"
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    description: "Generate reports, analyze metrics, and create insights",
    emoji: "📊",
    category: "Analytics"
  },
  {
    id: "social-media-manager",
    name: "Social Media Manager",
    description: "Create content, schedule posts, and engage with followers",
    emoji: "📱",
    category: "Marketing"
  }
];

const AgentGrid = ({ selectedAgents, onAgentSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {agents.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          isSelected={selectedAgents.some(a => a.id === agent.id)}
          onSelect={() => onAgentSelect(agent)}
        />
      ))}
    </div>
  );
};

export default AgentGrid;
