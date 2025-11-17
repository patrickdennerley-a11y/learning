# Personalized Adaptive Learning Platform

A web-based learning platform that adapts to each user's cognitive style and creates a personalized learning journey.

## Phase 1 Prototype - COMPLETED ✓

This is the Phase 1 prototype featuring:

- **Interactive Mind Map**: Visual learning path with connected topic nodes
- **Node Unlocking System**: Complete exams with >50% to unlock next topics
- **Learning Resources**: Cheat sheets, flashcards, practice exams, and audio summaries
- **Progress Tracking**: LocalStorage-based progress persistence
- **5 Statistics Topics**: Descriptive Statistics → Probability Basics → Distributions → Hypothesis Testing + Regression

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to the URL shown (typically http://localhost:5173)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How to Use

1. **Select a Topic**: Click on unlocked (yellow) topic nodes in the mind map
2. **Explore Resources**:
   - View cheat sheets with formulas
   - Study flashcards (click to flip)
   - Take practice exams
   - Listen to audio summaries
3. **Take Final Exam**: Click "Take Final Exam" button
4. **Pass to Unlock**: Score >50% to complete the topic and unlock dependent topics
5. **Track Progress**: See completed topics (green) and your overall progress

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Mind Map**: React Flow
- **Build Tool**: Vite
- **Styling**: Inline CSS (for Phase 1 simplicity)

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── MindMap.tsx           # Interactive mind map component
│   │   ├── NodeDetails.tsx       # Resource viewer
│   │   └── FinalExam.tsx         # Exam component
│   ├── data/
│   │   └── topicNodes.ts         # Statistics topic data
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   ├── App.tsx                   # Main app component
│   └── main.tsx                  # Entry point
```

## Features Implemented (Phase 1)

- ✅ Interactive mind map visualization
- ✅ Node unlocking based on exam scores
- ✅ Multiple learning resource types
- ✅ Final exams with scoring
- ✅ Progress persistence (localStorage)
- ✅ Prerequisite system for topics
- ✅ Responsive layout

## Next Phases (Not Yet Implemented)

### Phase 2: User Input Tracking
- Track user interactions and answer history
- Build cognitive profile based on learning patterns
- Identify mistake patterns

### Phase 3: Adaptive Resource Recommendation
- Method switching based on effectiveness
- Personalized resource ordering
- Difficulty adaptation

### Phase 4: A4 Paper Knowledge Gap Analyzer
- Image upload for handwritten notes
- AI analysis via Claude API
- Gap identification and personalized corrections

### Phase 5: Advanced Personalization
- Predict misconceptions
- Preemptive guidance
- Formula vs prose ratio adjustment per user

## Contributing

This is a prototype project. To add content:

1. Edit `src/data/topicNodes.ts` to add/modify topics
2. Follow the `TopicNode` type structure in `src/types/index.ts`
3. Ensure prerequisites are properly set

## License

This is a learning platform prototype.

## Development Notes

- Progress is saved to browser localStorage
- Use "Reset Progress" button to clear all progress
- All exam scores are saved and can be reviewed
- Audio files are placeholder URLs (add actual audio files to make functional)
