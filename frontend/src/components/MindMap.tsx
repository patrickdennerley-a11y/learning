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

    return {
      id: topic.id,
      type: 'default',
      position: topic.position,
      data: {
        label: (
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              {isCompleted && '✓ '}
              {isCurrent && '▶ '}
              {topic.title}
            </div>
            <div style={{ fontSize: '11px', color: '#666' }}>
              {topic.description}
            </div>
          </div>
        ),
      },
      style: {
        background: isCompleted ? '#d4edda' : isUnlocked ? '#fff3cd' : '#e2e3e5',
        border: isCurrent ? '3px solid #007bff' : '2px solid #333',
        borderRadius: '8px',
        width: 200,
        cursor: isUnlocked ? 'pointer' : 'not-allowed',
        opacity: isUnlocked ? 1 : 0.6,
      },
    };
  });

  // Convert prerequisites to React Flow edges
  const initialEdges: Edge[] = topicNodes.flatMap((topic) =>
    topic.prerequisites.map((prereqId) => ({
      id: `${prereqId}-${topic.id}`,
      source: prereqId,
      target: topic.id,
      animated: !userProgress.completedNodes.has(prereqId),
      style: { stroke: '#333', strokeWidth: 2 },
      type: 'smoothstep',
    }))
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
    <div style={{ height: '600px', width: '100%', border: '1px solid #ddd', borderRadius: '8px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        fitView
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};
