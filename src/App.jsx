import { useMemo, useState } from 'react'

const challengeBank = [
  {
    id: 1,
    faulty: 'The library was crowded, I studied at home.',
    issue: 'Comma splice',
    targetType: 'compound',
    corrected: 'The library was crowded, so I studied at home.',
    toolLabel: 'Add conjunction',
    hint: 'Two independent clauses cannot be joined by only a comma.',
    explanation:
      "The original sentence is a comma splice. Adding the coordinating conjunction 'so' creates a correct compound sentence with two independent clauses.",
    choices: [
      'The library was crowded, so I studied at home.',
      'Because the library was crowded.',
      'The library was crowded studying at home.',
      'The library was crowded, and because I studied at home.',
    ],
  },
  {
    id: 2,
    faulty: 'Because Minh was tired.',
    issue: 'Fragment',
    targetType: 'complex',
    corrected: 'Because Minh was tired, he went to bed early.',
    toolLabel: 'Add main clause',
    hint: 'A dependent clause cannot stand alone as a complete sentence.',
    explanation:
      "The original sentence is a fragment because it contains only a dependent clause beginning with 'because'. Adding an independent clause makes it a correct complex sentence.",
    choices: [
      'Because Minh was tired, he went to bed early.',
      'Because Minh was tired early.',
      'Minh because was tired.',
      'Because Minh was tired, and he went to bed early.',
    ],
  },
  {
    id: 3,
    faulty: 'Lan loves reading however she rarely buys new books.',
    issue: 'Wrong connector punctuation',
    targetType: 'compound',
    corrected: 'Lan loves reading; however, she rarely buys new books.',
    toolLabel: 'Fix connector',
    hint: "Sentence connectors like 'however' do not join two clauses with no punctuation.",
    explanation:
      "'However' is a sentence connector, not a coordinating conjunction. A semicolon before it and a comma after it make the sentence correct.",
    choices: [
      'Lan loves reading; however, she rarely buys new books.',
      'Lan loves reading however, she rarely buys new books.',
      'Lan loves reading, however she rarely buys new books.',
      'Lan loves reading however because she rarely buys new books.',
    ],
  },
  {
    id: 4,
    faulty: 'Although the weather was terrible, we continued the trip, and we reached the campsite before dark.',
    issue: 'Sentence type challenge',
    targetType: 'compound-complex',
    corrected: 'Although the weather was terrible, we continued the trip, and we reached the campsite before dark.',
    toolLabel: 'Identify type',
    hint: 'Look for both independent and dependent clauses.',
    explanation:
      'This sentence is already grammatical. It is compound-complex because it contains one dependent clause and two independent clauses joined by and.',
    choices: [
      'Although the weather was terrible, we continued the trip, and we reached the campsite before dark.',
      'Although the weather was terrible.',
      'We continued the trip and reached the campsite.',
      'Because the weather was terrible, and we continued the trip.',
    ],
  },
  {
    id: 5,
    faulty: 'The café was small but it was popular with students.',
    issue: 'Missing comma',
    targetType: 'compound',
    corrected: 'The café was small, but it was popular with students.',
    toolLabel: 'Add punctuation',
    hint: 'Two independent clauses joined by a coordinating conjunction usually need a comma.',
    explanation:
      "Both parts are independent clauses. Adding a comma before 'but' makes the compound sentence correctly punctuated.",
    choices: [
      'The café was small, but it was popular with students.',
      'The café was small but, it was popular with students.',
      'The café was small. but it was popular with students.',
      'The café was small, because it was popular with students.',
    ],
  },
  {
    id: 6,
    faulty: 'While the meeting was still going on.',
    issue: 'Fragment',
    targetType: 'complex',
    corrected: 'While the meeting was still going on, the staff prepared the reports.',
    toolLabel: 'Add main clause',
    hint: "A clause starting with 'while' is dependent here.",
    explanation:
      "The original is a fragment because 'while the meeting was still going on' cannot stand alone. Adding an independent clause creates a correct complex sentence.",
    choices: [
      'While the meeting was still going on, the staff prepared the reports.',
      'While the meeting was still going on reports.',
      'The meeting was still going on while.',
      'While the meeting was still going on, and the staff prepared the reports.',
    ],
  },
  {
    id: 7,
    faulty: 'Hoa revised her essay, therefore she felt more confident.',
    issue: 'Connector misuse',
    targetType: 'compound',
    corrected: 'Hoa revised her essay; therefore, she felt more confident.',
    toolLabel: 'Fix connector',
    hint: 'Therefore is usually used with stronger punctuation than a comma alone.',
    explanation:
      "A comma alone cannot correctly introduce 'therefore' between two independent clauses. A semicolon before it and a comma after it fix the sentence.",
    choices: [
      'Hoa revised her essay; therefore, she felt more confident.',
      'Hoa revised her essay, therefore, she felt more confident.',
      'Hoa revised her essay therefore she felt more confident.',
      'Hoa revised her essay because therefore she felt more confident.',
    ],
  },
  {
    id: 8,
    faulty: 'The shop closed early the manager was sick.',
    issue: 'Run-on sentence',
    targetType: 'complex',
    corrected: 'The shop closed early because the manager was sick.',
    toolLabel: 'Add dependent clause link',
    hint: 'You need a logical connector showing cause.',
    explanation:
      "The original sentence runs two clauses together. Adding 'because' clearly links the reason to the result and creates a correct complex sentence.",
    choices: [
      'The shop closed early because the manager was sick.',
      'The shop closed early, the manager was sick.',
      'Because the shop closed early the manager was sick.',
      'The shop closed early but because the manager was sick.',
    ],
  },
  {
    id: 9,
    faulty: 'My brother enjoys football, my sister prefers tennis, and I like swimming.',
    issue: 'Comma splice in a longer sentence',
    targetType: 'compound-complex',
    corrected: 'Although my brother enjoys football, my sister prefers tennis, and I like swimming.',
    toolLabel: 'Rebuild sentence',
    hint: 'The faulty version has too many independent clauses joined incorrectly.',
    explanation:
      'The original sentence incorrectly joins multiple independent clauses. The corrected version uses a dependent clause and two independent clauses, producing a grammatical compound-complex sentence.',
    choices: [
      'Although my brother enjoys football, my sister prefers tennis, and I like swimming.',
      'My brother enjoys football, my sister prefers tennis and I like swimming.',
      'Because my brother enjoys football, and my sister prefers tennis.',
      'My brother enjoys football because my sister prefers tennis and I like swimming.',
    ],
  },
  {
    id: 10,
    faulty: 'The hotel was expensive. But the service was excellent.',
    issue: 'Weak sentence connection',
    targetType: 'compound',
    corrected: 'The hotel was expensive, but the service was excellent.',
    toolLabel: 'Combine clauses',
    hint: 'Try joining the contrast into one sentence.',
    explanation:
      'Both sentences are grammatically correct separately, but this challenge asks students to repair them into a stronger compound sentence using contrast.',
    choices: [
      'The hotel was expensive, but the service was excellent.',
      'The hotel was expensive because the service was excellent.',
      'The hotel was expensive, however but the service was excellent.',
      'Although the hotel was expensive. the service was excellent.',
    ],
  },
  {
    id: 11,
    faulty: 'When the bell rang, and the students left the room.',
    issue: 'Extra conjunction',
    targetType: 'complex',
    corrected: 'When the bell rang, the students left the room.',
    toolLabel: 'Remove extra word',
    hint: 'The sentence already has a subordinating conjunction.',
    explanation:
      "'When' already introduces a dependent clause. The extra 'and' is unnecessary and makes the structure incorrect.",
    choices: [
      'When the bell rang, the students left the room.',
      'When the bell rang, and the students left the room.',
      'When the bell rang the students left and the room.',
      'When the bell rang. the students left the room because.',
    ],
  },
  {
    id: 12,
    faulty: 'The teacher explained the task clearly, the students still asked many questions.',
    issue: 'Comma splice',
    targetType: 'compound',
    corrected: 'The teacher explained the task clearly, but the students still asked many questions.',
    toolLabel: 'Add conjunction',
    hint: 'The second clause contrasts with the first one.',
    explanation:
      "The original sentence is a comma splice. Adding 'but' correctly joins the two independent clauses and shows contrast.",
    choices: [
      'The teacher explained the task clearly, but the students still asked many questions.',
      'The teacher explained the task clearly because the students still asked many questions.',
      'The teacher explained the task clearly, the students still asked many questions.',
      'Although the teacher explained the task clearly, but the students still asked many questions.',
    ],
  },
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

function generateGame(roundCount = 8) {
  return shuffleArray(challengeBank).slice(0, roundCount)
}

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  )
}

function FeedbackBox({ challenge, selectedCorrection, selectedType, roundCorrect }) {
  const correctionCorrect = selectedCorrection === challenge.corrected
  const typeCorrect = selectedType === challenge.targetType

  return (
    <div className={`feedback-box ${roundCorrect ? 'correct' : 'wrong'}`}>
      <div className="feedback-title">{roundCorrect ? 'Challenge cleared' : 'Not quite'}</div>
      <div className="feedback-text">
        <strong>Corrected sentence:</strong> {challenge.corrected}
      </div>
      <div className="feedback-text">
        <strong>Sentence type:</strong> {challenge.targetType}
      </div>
      <div className="feedback-text">{challenge.explanation}</div>
      {!correctionCorrect && (
        <div className="feedback-text">
          Your repair choice was not the best fix for this issue.
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
  const [game, setGame] = useState([])
  const [index, setIndex] = useState(0)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [selectedCorrection, setSelectedCorrection] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [lastResult, setLastResult] = useState(null)

  const hasGame = game.length > 0
  const current = hasGame && index < game.length ? game[index] : null
  const gameEnded = hasGame && (lives <= 0 || index >= game.length)
  const completed = hasGame ? Math.min(index, game.length) : 0
  const progress = hasGame ? Math.round((completed / game.length) * 100) : 0

  const headline = useMemo(() => {
    if (!hasGame) return 'Ready to play?'
    if (lives <= 0) return 'Game over'
    if (index >= game.length) return 'Challenge complete'
    return null
  }, [hasGame, lives, index, game.length])

  function startGame() {
    setGame(generateGame(8))
    setIndex(0)
    setLives(3)
    setScore(0)
    setSelectedCorrection('')
    setSelectedType('')
    setSubmitted(false)
    setLastResult(null)
  }

  function submitTurn() {
    if (!current || !selectedCorrection || !selectedType) return

    const correctionCorrect = selectedCorrection === current.corrected
    const typeCorrect = selectedType === current.targetType
    const roundCorrect = correctionCorrect && typeCorrect

    if (roundCorrect) {
      setScore((prev) => prev + 10)
    } else {
      setLives((prev) => prev - 1)
    }

    setLastResult({ correctionCorrect, typeCorrect, roundCorrect })
    setSubmitted(true)
  }

  function nextRound() {
    setIndex((prev) => prev + 1)
    setSelectedCorrection('')
    setSelectedType('')
    setSubmitted(false)
    setLastResult(null)
  }

  return (
    <div className="page">
      <div className="container">
        <section className="panel">
          <h1 className="title">Fix the Sentence Challenge</h1>
          <p className="subtitle">
            Repair faulty sentences, then identify the sentence type after correction.
          </p>

          <div className="stats-grid">
            <StatCard label="Score" value={score} />
            <StatCard label="Lives" value={lives} />
            <StatCard
              label="Round"
              value={hasGame ? `${Math.min(index + (current ? 1 : 0), game.length)}/${game.length}` : '0/0'}
            />
          </div>

          <div className="controls">
            <div className="control-group">
              <div className="control-label">Game rules</div>
              <div className="subtitle">
                8 rounds. Get both steps right to earn 10 points. Lose 1 life for a wrong repair or wrong sentence type.
              </div>
            </div>
            <button className="button button-primary" onClick={startGame}>
              {hasGame ? 'Restart game' : 'Start game'}
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

        {!hasGame && (
          <section className="panel empty-state">
            <h2>{headline}</h2>
            <p>
              You will see a faulty sentence, choose the best repair, then choose the sentence type after correction.
            </p>
          </section>
        )}

        {current && !gameEnded && (
          <section className="panel">
            <div className="question-top">
              <div>
                <h2 className="question-title">Round {index + 1}</h2>
                <p className="question-subtitle">Fix the sentence, then choose its type.</p>
              </div>
              <span className="badge">{current.issue}</span>
            </div>

            <div className="sentence-box">{current.faulty}</div>

            <div className="feedback-box" style={{ background: '#f8fafc', borderColor: '#d1d5db' }}>
              <div className="feedback-title">Tool card</div>
              <div className="feedback-text">
                <strong>Action:</strong> {current.toolLabel}
              </div>
              <div className="feedback-text">
                <strong>Hint:</strong> {current.hint}
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h3 className="question-subtitle" style={{ color: '#111827', fontWeight: 700, marginBottom: '12px' }}>
                Step 1: Choose the best repair
              </h3>
              <div className="options-list">
                {current.choices.map((choice) => (
                  <label key={choice} className="option-card" style={{ alignItems: 'flex-start' }}>
                    <input
                      type="radio"
                      name={`repair-${current.id}`}
                      value={choice}
                      checked={selectedCorrection === choice}
                      onChange={() => setSelectedCorrection(choice)}
                      disabled={submitted}
                    />
                    <span className="option-text" style={{ textTransform: 'none', fontSize: '16px' }}>{choice}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h3 className="question-subtitle" style={{ color: '#111827', fontWeight: 700, marginBottom: '12px' }}>
                Step 2: Choose the sentence type after correction
              </h3>
              <div className="stats-grid" style={{ marginTop: 0 }}>
                {sentenceTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className="button"
                    onClick={() => setSelectedType(type)}
                    disabled={submitted}
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

            {submitted && lastResult && (
              <div style={{ marginTop: '20px' }}>
                <FeedbackBox
                  challenge={current}
                  selectedCorrection={selectedCorrection}
                  selectedType={selectedType}
                  roundCorrect={lastResult.roundCorrect}
                />
              </div>
            )}

            <div className="actions">
              {!submitted ? (
                <button
                  className="button button-primary"
                  onClick={submitTurn}
                  disabled={!selectedCorrection || !selectedType}
                >
                  Check repair
                </button>
              ) : (
                <button className="button button-secondary" onClick={nextRound}>
                  Next round
                </button>
              )}
            </div>
          </section>
        )}

        {gameEnded && hasGame && (
          <section className="panel empty-state">
            <h2>{headline}</h2>
            <p>
              Final score: <strong>{score}</strong>
            </p>
            <p style={{ marginTop: '10px' }}>
              {lives <= 0
                ? 'You ran out of lives. Restart and try to repair each sentence more carefully.'
                : 'Great job. You completed all rounds in the sentence repair challenge.'}
            </p>
            <div style={{ marginTop: '20px' }}>
              <button className="button button-primary" onClick={startGame}>
                Play again
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
