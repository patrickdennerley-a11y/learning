import { useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from 'reactflow';
import type { Node, Edge, Connection } from 'reactflow';
import 'reactflow/dist/style.css';
import type { TopicNode, UserProgress } from '../types';
import { CheckCircle2, Play, Lock } from 'lucide-react';

interface MindMapProps {
  topicNodes: TopicNode[];
  userProgress: UserProgress;
  onNodeClick: (nodeId: string) => void;
}

export const MindMap = ({ topicNodes, userProgress, onNodeClick }: MindMapProps) => {
  // Convert TopicNodes to React Flow nodes
  const initialNodes: Node[] = topicNodes.map((topic) => {
    const isCompleted = userProgress.completedNodes.has(topic.id);
    const isUnlocked = topic.prerequisites.length === 0 ||
      topic.prerequisites.every(prereq => userProgress.completedNodes.has(prereq));
    const isCurrent = userProgress.currentNode === topic.id;

    let statusIcon;
    let bgClass;
    let borderClass;
    let textClass;

    if (isCompleted) {
      statusIcon = <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      bgClass = 'bg-emerald-500/10';
      borderClass = 'border-emerald-500/50';
      textClass = 'text-emerald-100';
    } else if (isUnlocked) {
      statusIcon = <Play className="w-5 h-5 text-amber-400" />;
      bgClass = 'bg-amber-500/10';
      borderClass = 'border-amber-500/50';
      textClass = 'text-amber-100';
    } else {
      statusIcon = <Lock className="w-5 h-5 text-slate-500" />;
      bgClass = 'bg-slate-500/10';
      borderClass = 'border-slate-600/50';
      textClass = 'text-slate-400';
    }

    return {
      id: topic.id,
      type: 'default',
      position: topic.position,
      data: {
        label: (
          <div className={`min-w-[200px] p-4 rounded-xl backdrop-blur-md ${bgClass} border-2 ${borderClass} ${
            isCurrent ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-slate-950' : ''
          } transition-all duration-300 ${isUnlocked ? 'hover:scale-105 cursor-pointer hover:shadow-lg hover:shadow-primary-500/20' : 'cursor-not-allowed opacity-60'}`}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {statusIcon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-bold text-sm mb-1 ${textClass}`}>
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {topic.description}
                </p>
                {userProgress.examScores[topic.id] && (
                  <div className="mt-2 pt-2 border-t border-white/10">
                    <p className="text-xs text-emerald-400 font-medium">
                      Score: {userProgress.examScores[topic.id].toFixed(0)}%
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ),
      },
      style: {
        background: 'transparent',
        border: 'none',
        padding: 0,
      },
    };
  });

  // Convert prerequisites to React Flow edges
  const initialEdges: Edge[] = topicNodes.flatMap((topic) =>
    topic.prerequisites.map((prereqId) => {
      const isCompleted = userProgress.completedNodes.has(prereqId);
      return {
        id: `${prereqId}-${topic.id}`,
        source: prereqId,
        target: topic.id,
        animated: !isCompleted,
        style: {
          stroke: isCompleted ? '#10b981' : '#6366f1',
          strokeWidth: 2,
        },
        type: 'smoothstep',
      };
    })
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const topicNode = topicNodes.find(t => t.id === node.id);
      if (!topicNode) return;

      const isUnlocked = topicNode.prerequisites.length === 0 ||
        topicNode.prerequisites.every(prereq => userProgress.completedNodes.has(prereq));

      if (isUnlocked) {
        onNodeClick(node.id);
      }
    },
    [topicNodes, userProgress, onNodeClick]
  );

  return (
    <div className="h-[600px] w-full rounded-xl overflow-hidden border border-white/5 bg-slate-900/30">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        fitView
        className="bg-slate-950/50"
      >
        <Controls className="bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-lg" />
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
          color="#8b5cf6"
          className="opacity-20"
        />
      </ReactFlow>
    </div>
  );
};
