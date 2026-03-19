import { useMemo, useState } from 'react'
import { questionDatabase } from './data/questions'

const QUIZ_SIZE = 10
const answerOptions = ['simple', 'compound', 'complex', 'compound-complex']

function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function generateQuizData(difficulty) {
  let filtered = questionDatabase

  if (difficulty !== 'all') {
    filtered = questionDatabase.filter(q => q.difficulty === difficulty)
  }

  return shuffleArray(filtered).slice(0, Math.min(QUIZ_SIZE, filtered.length))
}

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  )
}

function FeedbackBox({ question, selectedAnswer }) {
  const isCorrect = selectedAnswer === question.correctAnswer

  return (
    <div className={`feedback-box ${isCorrect ? 'correct' : 'wrong'}`}>
      <div className="feedback-title">{isCorrect ? 'Correct' : 'Not quite'}</div>

      <div className="feedback-text">
        <strong>Correct answer:</strong> {question.correctAnswer}
      </div>

      <div className="feedback-text">{question.explanation}</div>

      <div className="feedback-chip-row">
        <span className="feedback-chip">Difficulty: {question.difficulty}</span>
      </div>
    </div>
  )
}

export default function App() {
  const [difficulty, setDifficulty] = useState('all')
  const [quiz, setQuiz] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [submittedMap, setSubmittedMap] = useState({})
  const [answerMap, setAnswerMap] = useState({})

  const hasQuiz = quiz.length > 0
  const currentQuestion = hasQuiz ? quiz[currentIndex] : null
  const currentQuestionId = currentQuestion?.id || null
  const isSubmitted = currentQuestionId ? !!submittedMap[currentQuestionId] : false
  const isLastQuestion = hasQuiz && currentIndex === quiz.length - 1

  const completedCount = useMemo(() => Object.keys(submittedMap).length, [submittedMap])

  const score = useMemo(() => {
    return quiz.reduce((total, question) => {
      const answer = answerMap[question.id]
      if (!answer) return total
      return answer === question.correctAnswer ? total + 1 : total
    }, 0)
  }, [quiz, answerMap])

  const progress = hasQuiz ? Math.round((completedCount / quiz.length) * 100) : 0

  function generateNewQuiz() {
    const newQuiz = generateQuizData(difficulty)
    setQuiz(newQuiz)
    setCurrentIndex(0)
    setSelectedAnswer('')
    setSubmittedMap({})
    setAnswerMap({})
  }

  function handleCheckAnswer() {
    if (!currentQuestion || !selectedAnswer) return

    setAnswerMap(prev => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer,
    }))

    setSubmittedMap(prev => ({
      ...prev,
      [currentQuestion.id]: true,
    }))
  }

  function handleNextQuestion() {
    setCurrentIndex(prev => prev + 1)
    setSelectedAnswer('')
  }

  return (
    <div className="page">
      <div className="container">

        {/* HEADER */}
        <section className="hero-card">
          <div className="hero-top">
            <div>
              <h1 className="title">Sentence Types Review Quiz</h1>
              <p className="subtitle">
                Practice identifying sentence structures with targeted difficulty levels.
              </p>
            </div>

            <button className="button button-primary" onClick={generateNewQuiz}>
              Generate new quiz
            </button>
          </div>

          {/* FILTER */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontWeight: '600', marginRight: '10px' }}>
              Difficulty:
            </label>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="select"
            >
              <option value="all">All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="difficult">Difficult</option>
            </select>
          </div>

          {/* STATS */}
          <div className="stats-grid">
            <StatCard label="Score" value={`${score}/${hasQuiz ? quiz.length : QUIZ_SIZE}`} />
            <StatCard label="Completed" value={completedCount} />
            <StatCard label="Current" value={hasQuiz ? currentIndex + 1 : 0} />
          </div>

          {/* PROGRESS */}
          <div className="progress-wrapper">
            <div className="progress-top">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </section>

        {/* EMPTY STATE */}
        {!hasQuiz && (
          <section className="panel empty-state">
            <div className="empty-icon">✦</div>
            <h2>No quiz yet</h2>
            <p>
              Select a difficulty, then click <strong>Generate new quiz</strong>.
            </p>
          </section>
        )}

        {/* QUESTION */}
        {hasQuiz && currentQuestion && (
          <section className="panel question-panel">
            <div className="question-top">
              <div>
                <div className="eyebrow">Sentence analysis</div>
                <h2 className="question-title">Question {currentIndex + 1}</h2>
                <p className="question-subtitle">
                  Identify the sentence type.
                </p>
              </div>

              <span className={`badge badge-${currentQuestion.difficulty}`}>
                {currentQuestion.difficulty}
              </span>
            </div>

            <div className="sentence-box">
              {currentQuestion.sentence}
            </div>

            {/* OPTIONS */}
            <div className="options-list">
              {answerOptions.map(option => (
                <label
                  key={option}
                  className={`option-card ${selectedAnswer === option ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => setSelectedAnswer(option)}
                    disabled={isSubmitted}
                  />
                  <span className="option-text">{option}</span>
                </label>
              ))}
            </div>

            {/* FEEDBACK */}
            {isSubmitted && (
              <div style={{ marginTop: '20px' }}>
                <FeedbackBox
                  question={currentQuestion}
                  selectedAnswer={answerMap[currentQuestion.id]}
                />
              </div>
            )}

            {/* ACTIONS */}
            <div className="actions">
              {!isSubmitted ? (
                <button
                  className="button button-primary"
                  onClick={handleCheckAnswer}
                  disabled={!selectedAnswer}
                >
                  Check answer
                </button>
              ) : !isLastQuestion ? (
                <button
                  className="button button-secondary"
                  onClick={handleNextQuestion}
                >
                  Next question
                </button>
              ) : (
                <button
                  className="button button-primary"
                  onClick={generateNewQuiz}
                >
                  Generate new quiz
                </button>
              )}
            </div>

          </section>
        )}
      </div>
    </div>
  )
}
