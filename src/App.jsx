import { useMemo, useState } from 'react'
import { questionDatabase } from './data/questions'

const QUIZ_SIZE = 8
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

function FeedbackBox({ question, selectedCorrection, selectedType }) {
  const correctionCorrect = selectedCorrection === question.corrected
  const typeCorrect = selectedType === question.targetType
  const allCorrect = correctionCorrect && typeCorrect

  return (
    <div className={`feedback-box ${allCorrect ? 'correct' : 'wrong'}`}>
      <div className="feedback-title">{allCorrect ? 'Correct' : 'Not quite'}</div>
      <div className="feedback-text">
        <strong>Corrected sentence:</strong> {question.corrected}
      </div>
      <div className="feedback-text">
        <strong>Sentence type:</strong> {question.targetType}
      </div>
      <div className="feedback-text">{question.explanation}</div>
      {!correctionCorrect && (
        <div className="feedback-text">
          Your repair choice was not the best fix for this sentence.
        </div>
      )}
      {!typeCorrect && (
        <div className="feedback-text">
          Review the corrected sentence carefully before choosing the sentence type.
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [quiz, setQuiz] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCorrection, setSelectedCorrection] = useState('')
  const [selectedType, setSelectedType] = useState('')
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

      const correctionCorrect = answer.selectedCorrection === question.corrected
      const typeCorrect = answer.selectedType === question.targetType

      return correctionCorrect && typeCorrect ? total + 1 : total
    }, 0)
  }, [quiz, answerMap])

  const progress = hasQuiz ? Math.round((completedCount / quiz.length) * 100) : 0

  function generateNewQuiz() {
    const newQuiz = generateQuizData()
    setQuiz(newQuiz)
    setCurrentIndex(0)
    setSelectedCorrection('')
    setSelectedType('')
    setSubmittedMap({})
    setAnswerMap({})
  }

  function handleCheckAnswer() {
    if (!currentQuestion || !selectedCorrection || !selectedType) return

    setAnswerMap((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        selectedCorrection,
        selectedType,
      },
    }))

    setSubmittedMap((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }))
  }

  function handleNextQuestion() {
    setCurrentIndex((prev) => prev + 1)
    setSelectedCorrection('')
    setSelectedType('')
  }

  return (
    <div className="page">
      <div className="container">
        <section className="panel">
          <h1 className="title">Sentence Repair Trainer</h1>
          <p className="subtitle">
            Fix the sentence, then choose the sentence type after correction.
          </p>

          <div className="stats-grid">
            <StatCard label="Score" value={`${score}/${hasQuiz ? quiz.length : QUIZ_SIZE}`} />
            <StatCard label="Completed" value={completedCount} />
            <StatCard label="Current" value={hasQuiz ? currentIndex + 1 : 0} />
          </div>

          <div className="controls">
            <div className="control-group">
              <div className="control-label">Quiz format</div>
              <div className="subtitle">
                Step 1: choose the best repair. Step 2: choose the sentence type.
              </div>
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
              Click <strong>Generate new quiz</strong> to begin.
            </p>
          </section>
        )}

        {hasQuiz && currentQuestion && (
          <section className="panel">
            <div className="question-top">
              <div>
                <h2 className="question-title">Question {currentIndex + 1}</h2>
                <p className="question-subtitle">Repair the sentence, then identify the sentence type.</p>
              </div>
              <span className="badge">{currentQuestion.issue}</span>
            </div>

            <div className="sentence-box">{currentQuestion.faulty}</div>

            <div className="feedback-box" style={{ background: '#f8fafc', borderColor: '#d1d5db', marginTop: '20px' }}>
              <div className="feedback-title">Hint</div>
              <div className="feedback-text">{currentQuestion.hint}</div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h3
                className="question-subtitle"
                style={{ color: '#111827', fontWeight: 700, marginBottom: '12px' }}
              >
                Step 1: Choose the best repair
              </h3>
              <div className="options-list">
                {currentQuestion.choices.map((choice) => (
                  <label key={choice} className="option-card" style={{ alignItems: 'flex-start' }}>
                    <input
                      type="radio"
                      name={`repair-${currentQuestion.id}`}
                      value={choice}
                      checked={selectedCorrection === choice}
                      onChange={() => setSelectedCorrection(choice)}
                      disabled={isSubmitted}
                    />
                    <span className="option-text" style={{ textTransform: 'none', fontSize: '16px' }}>
                      {choice}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h3
                className="question-subtitle"
                style={{ color: '#111827', fontWeight: 700, marginBottom: '12px' }}
              >
                Step 2: Choose the sentence type after correction
              </h3>
              <div className="stats-grid" style={{ marginTop: 0 }}>
                {sentenceTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className="button"
                    onClick={() => setSelectedType(type)}
                    disabled={isSubmitted}
                    style={{
                      background: selectedType === type ? '#111827' : '#ffffff',
                      color: selectedType === type ? '#ffffff' : '#111827',
                      border: '1px solid #d1d5db',
                      textTransform: 'capitalize',
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {isSubmitted && (
              <div style={{ marginTop: '20px' }}>
                <FeedbackBox
                  question={currentQuestion}
                  selectedCorrection={answerMap[currentQuestion.id].selectedCorrection}
                  selectedType={answerMap[currentQuestion.id].selectedType}
                />
              </div>
            )}

            <div className="actions">
              {!isSubmitted ? (
                <button
                  className="button button-primary"
                  onClick={handleCheckAnswer}
                  disabled={!selectedCorrection || !selectedType}
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
