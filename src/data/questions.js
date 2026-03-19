export const questionDatabase = [
  {
    id: 'fix_001',
    faulty: 'The library was crowded, I studied at home.',
    issue: 'Comma splice',
    targetType: 'compound',
    corrected: 'The library was crowded, so I studied at home.',
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
    id: 'fix_002',
    faulty: 'Because Minh was tired.',
    issue: 'Fragment',
    targetType: 'complex',
    corrected: 'Because Minh was tired, he went to bed early.',
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
    id: 'fix_003',
    faulty: 'Lan loves reading however she rarely buys new books.',
    issue: 'Wrong connector punctuation',
    targetType: 'compound',
    corrected: 'Lan loves reading; however, she rarely buys new books.',
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
    id: 'fix_004',
    faulty: 'Although the weather was terrible, we continued the trip, and we reached the campsite before dark.',
    issue: 'Sentence type challenge',
    targetType: 'compound-complex',
    corrected: 'Although the weather was terrible, we continued the trip, and we reached the campsite before dark.',
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
    id: 'fix_005',
    faulty: 'The café was small but it was popular with students.',
    issue: 'Missing comma',
    targetType: 'compound',
    corrected: 'The café was small, but it was popular with students.',
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
    id: 'fix_006',
    faulty: 'While the meeting was still going on.',
    issue: 'Fragment',
    targetType: 'complex',
    corrected: 'While the meeting was still going on, the staff prepared the reports.',
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
    id: 'fix_007',
    faulty: 'Hoa revised her essay, therefore she felt more confident.',
    issue: 'Connector misuse',
    targetType: 'compound',
    corrected: 'Hoa revised her essay; therefore, she felt more confident.',
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
    id: 'fix_008',
    faulty: 'The shop closed early the manager was sick.',
    issue: 'Run-on sentence',
    targetType: 'complex',
    corrected: 'The shop closed early because the manager was sick.',
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
    id: 'fix_009',
    faulty: 'My brother enjoys football, my sister prefers tennis, and I like swimming.',
    issue: 'Comma splice in a longer sentence',
    targetType: 'compound-complex',
    corrected: 'Although my brother enjoys football, my sister prefers tennis, and I like swimming.',
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
    id: 'fix_010',
    faulty: 'The hotel was expensive. But the service was excellent.',
    issue: 'Weak sentence connection',
    targetType: 'compound',
    corrected: 'The hotel was expensive, but the service was excellent.',
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
    id: 'fix_011',
    faulty: 'When the bell rang, and the students left the room.',
    issue: 'Extra conjunction',
    targetType: 'complex',
    corrected: 'When the bell rang, the students left the room.',
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
    id: 'fix_012',
    faulty: 'The teacher explained the task clearly, the students still asked many questions.',
    issue: 'Comma splice',
    targetType: 'compound',
    corrected: 'The teacher explained the task clearly, but the students still asked many questions.',
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
