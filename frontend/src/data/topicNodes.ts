import type { TopicNode } from '../types';

export const topicNodes: TopicNode[] = [
  {
    id: 'descriptive-stats',
    title: 'Descriptive Statistics',
    description: 'Learn measures of central tendency and variability',
    prerequisites: [],
    position: { x: 250, y: 50 },
    resources: {
      cheatSheet: {
        id: 'cs-desc-1',
        title: 'Descriptive Statistics Formulas',
        formulas: [
          { formula: 'μ = Σx / n', description: 'Mean (population)' },
          { formula: 'x̄ = Σx / n', description: 'Mean (sample)' },
          { formula: 'σ² = Σ(x - μ)² / n', description: 'Variance (population)' },
          { formula: 's² = Σ(x - x̄)² / (n-1)', description: 'Variance (sample)' },
          { formula: 'σ = √(σ²)', description: 'Standard deviation' },
        ],
      },
      flashcards: [
        { id: 'fc-1', front: 'What is the mean?', back: 'μ = Σx / n - the average of all values' },
        { id: 'fc-2', front: 'What is variance?', back: 'σ² = Σ(x - μ)² / n - measure of spread' },
        { id: 'fc-3', front: 'Difference between population and sample variance?', back: 'Sample uses (n-1) denominator (Bessel\'s correction)' },
      ],
      practiceExams: [
        {
          id: 'pe-1',
          title: 'Descriptive Statistics Practice',
          questions: [
            {
              id: 'q1',
              question: 'Calculate the mean of: 2, 4, 6, 8, 10',
              options: ['5', '6', '7', '8'],
              correctAnswer: 1,
            },
            {
              id: 'q2',
              question: 'What does standard deviation measure?',
              options: ['Central tendency', 'Spread/variability', 'Correlation', 'Causation'],
              correctAnswer: 1,
            },
          ],
        },
      ],
      audioSummary: {
        id: 'audio-1',
        title: 'Descriptive Statistics Overview',
        audioUrl: '/audio/descriptive-stats.mp3',
        duration: '5:30',
      },
    },
    finalExam: {
      id: 'exam-desc-1',
      passingScore: 50,
      questions: [
        {
          id: 'fe-q1',
          question: 'What is the formula for population mean?',
          options: ['Σx / n', 'Σx / (n-1)', '√(Σx²)', 'Σ(x - μ)²'],
          correctAnswer: 0,
        },
        {
          id: 'fe-q2',
          question: 'Why use (n-1) in sample variance?',
          options: ['It\'s faster to calculate', 'Bessel\'s correction for unbiased estimator', 'To get larger values', 'Historical convention'],
          correctAnswer: 1,
        },
        {
          id: 'fe-q3',
          question: 'Standard deviation is:',
          options: ['Square of variance', 'Square root of variance', 'Same as mean', 'Sum of deviations'],
          correctAnswer: 1,
        },
        {
          id: 'fe-q4',
          question: 'Dataset: [1, 2, 3, 4, 5]. What is the mean?',
          options: ['2', '3', '4', '5'],
          correctAnswer: 1,
        },
      ],
    },
  },
  {
    id: 'probability-basics',
    title: 'Probability Basics',
    description: 'Fundamental probability concepts and rules',
    prerequisites: ['descriptive-stats'],
    position: { x: 250, y: 200 },
    resources: {
      cheatSheet: {
        id: 'cs-prob-1',
        title: 'Probability Formulas',
        formulas: [
          { formula: 'P(A) = favorable / total', description: 'Basic probability' },
          { formula: 'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)', description: 'Addition rule' },
          { formula: 'P(A | B) = P(A ∩ B) / P(B)', description: 'Conditional probability' },
          { formula: 'P(A ∩ B) = P(A) × P(B)', description: 'Independent events' },
        ],
      },
      flashcards: [
        { id: 'fc-p1', front: 'What is P(A)?', back: 'Probability of event A occurring' },
        { id: 'fc-p2', front: 'Addition rule formula?', back: 'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)' },
        { id: 'fc-p3', front: 'When are events independent?', back: 'When P(A ∩ B) = P(A) × P(B)' },
      ],
      practiceExams: [
        {
          id: 'pe-p1',
          title: 'Probability Practice',
          questions: [
            {
              id: 'pq1',
              question: 'Coin flip: P(Heads) = ?',
              options: ['0.25', '0.5', '0.75', '1.0'],
              correctAnswer: 1,
            },
          ],
        },
      ],
      audioSummary: {
        id: 'audio-p1',
        title: 'Probability Basics',
        audioUrl: '/audio/probability.mp3',
        duration: '6:15',
      },
    },
    finalExam: {
      id: 'exam-prob-1',
      passingScore: 50,
      questions: [
        {
          id: 'fe-p1',
          question: 'What is the probability of rolling a 6 on a die?',
          options: ['1/12', '1/6', '1/3', '1/2'],
          correctAnswer: 1,
        },
        {
          id: 'fe-p2',
          question: 'Two independent events A and B: P(A) = 0.3, P(B) = 0.4. Find P(A ∩ B):',
          options: ['0.12', '0.7', '0.5', '0.34'],
          correctAnswer: 0,
        },
        {
          id: 'fe-p3',
          question: 'Conditional probability P(A|B) formula:',
          options: ['P(A) / P(B)', 'P(A ∩ B) / P(B)', 'P(A) × P(B)', 'P(B) - P(A)'],
          correctAnswer: 1,
        },
        {
          id: 'fe-p4',
          question: 'Sum of all probabilities in a sample space equals:',
          options: ['0', '0.5', '1', 'Infinity'],
          correctAnswer: 2,
        },
      ],
    },
  },
  {
    id: 'distributions',
    title: 'Probability Distributions',
    description: 'Normal, binomial, and other distributions',
    prerequisites: ['probability-basics'],
    position: { x: 250, y: 350 },
    resources: {
      cheatSheet: {
        id: 'cs-dist-1',
        title: 'Distribution Formulas',
        formulas: [
          { formula: 'f(x) = (1/σ√(2π))e^(-(x-μ)²/2σ²)', description: 'Normal distribution PDF' },
          { formula: 'Z = (x - μ) / σ', description: 'Z-score standardization' },
          { formula: 'P(X = k) = C(n,k)p^k(1-p)^(n-k)', description: 'Binomial distribution' },
          { formula: 'E(X) = μ', description: 'Expected value (normal)' },
        ],
      },
      flashcards: [
        { id: 'fc-d1', front: 'What is Z-score?', back: 'Z = (x - μ) / σ - standardized value' },
        { id: 'fc-d2', front: 'Normal distribution shape?', back: 'Bell curve, symmetric around mean' },
        { id: 'fc-d3', front: '68-95-99.7 rule?', back: '68% within 1σ, 95% within 2σ, 99.7% within 3σ' },
      ],
      practiceExams: [
        {
          id: 'pe-d1',
          title: 'Distributions Practice',
          questions: [
            {
              id: 'dq1',
              question: 'Normal distribution parameters are:',
              options: ['Mean and variance', 'Median and mode', 'Range and IQR', 'Min and max'],
              correctAnswer: 0,
            },
          ],
        },
      ],
      audioSummary: {
        id: 'audio-d1',
        title: 'Understanding Distributions',
        audioUrl: '/audio/distributions.mp3',
        duration: '7:45',
      },
    },
    finalExam: {
      id: 'exam-dist-1',
      passingScore: 50,
      questions: [
        {
          id: 'fe-d1',
          question: 'Z-score of 0 means:',
          options: ['Value is the mean', 'Value is zero', 'Invalid data', 'Maximum value'],
          correctAnswer: 0,
        },
        {
          id: 'fe-d2',
          question: 'Normal distribution is symmetric around:',
          options: ['Median', 'Mode', 'Mean', 'All of the above'],
          correctAnswer: 3,
        },
        {
          id: 'fe-d3',
          question: 'What % of data falls within 1 standard deviation (68-95-99.7 rule)?',
          options: ['50%', '68%', '95%', '99.7%'],
          correctAnswer: 1,
        },
        {
          id: 'fe-d4',
          question: 'Binomial distribution requires:',
          options: ['Continuous data', 'Fixed number of trials', 'Normal data', 'Infinite trials'],
          correctAnswer: 1,
        },
      ],
    },
  },
  {
    id: 'hypothesis-testing',
    title: 'Hypothesis Testing',
    description: 'Statistical inference and p-values',
    prerequisites: ['distributions'],
    position: { x: 100, y: 500 },
    resources: {
      cheatSheet: {
        id: 'cs-hyp-1',
        title: 'Hypothesis Testing Formulas',
        formulas: [
          { formula: 't = (x̄ - μ) / (s / √n)', description: 't-statistic' },
          { formula: 'α = 0.05', description: 'Significance level (common)' },
          { formula: 'p-value < α → reject H₀', description: 'Decision rule' },
          { formula: 'CI = x̄ ± t*(s/√n)', description: 'Confidence interval' },
        ],
      },
      flashcards: [
        { id: 'fc-h1', front: 'Null hypothesis (H₀)?', back: 'Assumption of no effect/difference' },
        { id: 'fc-h2', front: 'p-value meaning?', back: 'Probability of observing data if H₀ is true' },
        { id: 'fc-h3', front: 'Type I error?', back: 'Rejecting true H₀ (false positive)' },
      ],
      practiceExams: [
        {
          id: 'pe-h1',
          title: 'Hypothesis Testing Practice',
          questions: [
            {
              id: 'hq1',
              question: 'If p-value = 0.03 and α = 0.05, we:',
              options: ['Accept H₀', 'Reject H₀', 'Cannot decide', 'Need more data'],
              correctAnswer: 1,
            },
          ],
        },
      ],
      audioSummary: {
        id: 'audio-h1',
        title: 'Hypothesis Testing Explained',
        audioUrl: '/audio/hypothesis.mp3',
        duration: '8:20',
      },
    },
    finalExam: {
      id: 'exam-hyp-1',
      passingScore: 50,
      questions: [
        {
          id: 'fe-h1',
          question: 'Null hypothesis typically assumes:',
          options: ['Effect exists', 'No effect', 'Large effect', 'Random effect'],
          correctAnswer: 1,
        },
        {
          id: 'fe-h2',
          question: 'Common significance level α:',
          options: ['0.01', '0.05', '0.10', 'All are common'],
          correctAnswer: 3,
        },
        {
          id: 'fe-h3',
          question: 'Type II error is:',
          options: ['Rejecting true H₀', 'Failing to reject false H₀', 'Calculation error', 'Sample error'],
          correctAnswer: 1,
        },
        {
          id: 'fe-h4',
          question: 'Lower p-value means:',
          options: ['Weaker evidence against H₀', 'Stronger evidence against H₀', 'H₀ is true', 'Invalid test'],
          correctAnswer: 1,
        },
      ],
    },
  },
  {
    id: 'regression',
    title: 'Regression Analysis',
    description: 'Linear regression and correlation',
    prerequisites: ['distributions'],
    position: { x: 400, y: 500 },
    resources: {
      cheatSheet: {
        id: 'cs-reg-1',
        title: 'Regression Formulas',
        formulas: [
          { formula: 'ŷ = β₀ + β₁x', description: 'Linear regression equation' },
          { formula: 'β₁ = r(sᵧ/sₓ)', description: 'Slope coefficient' },
          { formula: 'r = Σ((x-x̄)(y-ȳ)) / √(Σ(x-x̄)²Σ(y-ȳ)²)', description: 'Correlation coefficient' },
          { formula: 'R² = 1 - (SSres/SStot)', description: 'Coefficient of determination' },
        ],
      },
      flashcards: [
        { id: 'fc-r1', front: 'What does β₁ represent?', back: 'Slope - change in y per unit change in x' },
        { id: 'fc-r2', front: 'Range of correlation r?', back: '-1 to +1 (perfect negative to perfect positive)' },
        { id: 'fc-r3', front: 'R² interpretation?', back: 'Proportion of variance in y explained by x' },
      ],
      practiceExams: [
        {
          id: 'pe-r1',
          title: 'Regression Practice',
          questions: [
            {
              id: 'rq1',
              question: 'r = -0.9 means:',
              options: ['Weak positive', 'Strong negative', 'No correlation', 'Weak negative'],
              correctAnswer: 1,
            },
          ],
        },
      ],
      audioSummary: {
        id: 'audio-r1',
        title: 'Regression Analysis Overview',
        audioUrl: '/audio/regression.mp3',
        duration: '9:10',
      },
    },
    finalExam: {
      id: 'exam-reg-1',
      passingScore: 50,
      questions: [
        {
          id: 'fe-r1',
          question: 'In ŷ = β₀ + β₁x, β₀ is:',
          options: ['Slope', 'Y-intercept', 'Correlation', 'Error term'],
          correctAnswer: 1,
        },
        {
          id: 'fe-r2',
          question: 'Perfect positive correlation r = ?',
          options: ['-1', '0', '0.5', '1'],
          correctAnswer: 3,
        },
        {
          id: 'fe-r3',
          question: 'R² = 0.81 means:',
          options: ['81% variance explained', 'Weak fit', 'No relationship', 'r = 0.81'],
          correctAnswer: 0,
        },
        {
          id: 'fe-r4',
          question: 'Correlation does NOT imply:',
          options: ['Association', 'Causation', 'Relationship', 'Pattern'],
          correctAnswer: 1,
        },
      ],
    },
  },
];
