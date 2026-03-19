import { useMemo, useState } from 'react'
import { questionDatabase } from './data/questions'

const QUIZ_SIZE = 8

const errorTypes = [
  'Comma splice',
  'Fragment',
  'Connector punctuation',
  'Sentence type challenge',
  'Missing comma',
  'Connector misuse',
  'Run-on sentence',
  'Double connector',
  'Extra conjunction',
  'Weak sentence connection',
  'Incorrect structure',
]

const sentenceTypes = ['simple', 'compound', 'complex', 'compound-complex']

function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function generateQuizData() {
  const shuffled = shuffleArray(questionDatabase)
  return shuffled.slice(0, Math.min(QUIZ_SIZE, shuffled.length))
}

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  )
}

function FeedbackBox({ question, selectedAnswer, mode }) {
  const correctAnswer = mode === 'error' ? question.issue : question.targetType
  const isCorrect = selectedAnswer === correctAnswer

  return (
    <div className={`feedback-box ${isCorrect ? 'correct' : 'wrong'}`}>
      <div className="feedback-title">{isCorrect ? 'Correct' : 'Not quite'}</div>

      <div className="feedback-text">
        <strong>Correct answer:</strong> {correctAnswer}
      </div>

      {mode === 'sentence' && (
        <div className="feedback-text">
          <strong>Corrected sentence:</strong> {question.corrected}
        </div>
      )}

      <div className="feedback-text">{question.explanation}</div>
    </div>
  )
}

export default function App() {
  const [mode, setMode] = useState('error')
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

      const correctAnswer = mode === 'error' ? question.issue : question.targetType
      return answer === correctAnswer ? total + 1 : total
    }, 0)
  }, [quiz, answerMap, mode])

  const progress = hasQuiz ? Math.round((completedCount / quiz.length) * 100) : 0

  function generateNewQuiz() {
    const newQuiz = generateQuizData()
    setQuiz(newQuiz)
    setCurrentIndex(0)
    setSelectedAnswer('')
    setSubmittedMap({})
    setAnswerMap({})
  }

  function handleCheckAnswer() {
    if (!currentQuestion || !selectedAnswer) return

    setAnswerMap((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer,
    }))

    setSubmittedMap((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }))
  }

  function handleNextQuestion() {
    setCurrentIndex((prev) => prev + 1)
    setSelectedAnswer('')
  }

  const currentOptions = mode === 'error' ? errorTypes : sentenceTypes
  const displaySentence = mode === 'error' ? currentQuestion?.faulty : currentQuestion?.corrected
  const instruction =
    mode === 'error'
      ? 'Read the faulty sentence and choose the type of error.'
      : 'Read the corrected sentence and choose the sentence type.'

  return (
    <div className="page">
      <div className="container">
        <section className="panel">
          <h1 className="title">Sentence Repair Trainer</h1>
          <p className="subtitle">
            Review sentence errors or sentence types in quiz mode.
          </p>

          <div className="stats-grid">
            <StatCard label="Score" value={`${score}/${hasQuiz ? quiz.length : QUIZ_SIZE}`} />
            <StatCard label="Completed" value={completedCount} />
            <StatCard label="Current" value={hasQuiz ? currentIndex + 1 : 0} />
          </div>

          <div className="controls">
            <div className="control-group">
              <label htmlFor="mode" className="control-label">
                Mode
              </label>
              <select
                id="mode"
                className="select"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="error">Error type</option>
                <option value="sentence">Sentence type</option>
              </select>
            </div>

            <button className="button button-primary" onClick={generateNewQuiz}>
              Generate new quiz
            </button>
          </div>

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

        {!hasQuiz && (
          <section className="panel empty-state">
            <h2>No quiz yet</h2>
            <p>
              Choose a mode, then click <strong>Generate new quiz</strong> to begin.
            </p>
          </section>
        )}

        {hasQuiz && currentQuestion && (
          <section className="panel">
            <div className="question-top">
              <div>
                <h2 className="question-title">Question {currentIndex + 1}</h2>
                <p className="question-subtitle">{instruction}</p>
              </div>
              <span className="badge">{mode === 'error' ? 'Error type mode' : 'Sentence type mode'}</span>
            </div>

            <div className="sentence-box">{displaySentence}</div>

            {mode === 'sentence' && (
              <div
                className="feedback-box"
                style={{ background: '#f8fafc', borderColor: '#d1d5db', marginTop: '20px' }}
              >
                <div className="feedback-title">Original faulty sentence</div>
                <div className="feedback-text">{currentQuestion.faulty}</div>
              </div>
            )}

            {mode === 'error' && (
              <div
                className="feedback-box"
                style={{ background: '#f8fafc', borderColor: '#d1d5db', marginTop: '20px' }}
              >
                <div className="feedback-title">Hint</div>
                <div className="feedback-text">{currentQuestion.hint}</div>
              </div>
            )}

            <div style={{ marginTop: '20px' }}>
              <div className="options-list">
                {currentOptions.map((option) => (
                  <label key={option} className="option-card" style={{ alignItems: 'flex-start' }}>
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={() => setSelectedAnswer(option)}
                      disabled={isSubmitted}
                    />
                    <span
                      className="option-text"
                      style={{ textTransform: 'none', fontSize: '16px' }}
                    >
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {isSubmitted && (
              <div style={{ marginTop: '20px' }}>
                <FeedbackBox
                  question={currentQuestion}
                  selectedAnswer={answerMap[currentQuestion.id]}
                  mode={mode}
                />
              </div>
            )}

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
                <button className="button button-secondary" onClick={handleNextQuestion}>
                  Next question
                </button>
              ) : (
                <button className="button button-primary" onClick={generateNewQuiz}>
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
