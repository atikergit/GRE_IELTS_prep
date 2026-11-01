/* Learning track. Original lessons written for this app, aligned with ETS and IELTS official formats. */
window.SECTIONS = {
  gre: [
    {id:'quant', name:'Quantitative Reasoning'},
    {id:'verbal', name:'Verbal Reasoning'},
    {id:'writing', name:'Analytical Writing'}
  ],
  ielts: [
    {id:'listening', name:'Listening'},
    {id:'reading', name:'Reading'},
    {id:'writing', name:'Writing'},
    {id:'speaking', name:'Speaking'},
    {id:'scores', name:'Scores & accuracy'}
  ]
};

window.LESSONS = [
/* ================= GRE QUANT ================= */
{id:'q-qc', exam:'gre', sec:'quant', title:'Quantitative Comparison', mins:12,
summary:'The four fixed answers and how to compare two quantities without fully calculating them.',
body:`
<p>Every Quantitative Comparison (QC) question shows <b>Quantity A</b> and <b>Quantity B</b>, sometimes with information above them. The answer choices never change:</p>
<ol class="abcd"><li><b>(A)</b> Quantity A is greater.</li><li><b>(B)</b> Quantity B is greater.</li><li><b>(C)</b> The two quantities are equal.</li><li><b>(D)</b> The relationship cannot be determined from the information given.</li></ol>
<p>Your job is to find the <i>relationship</i>, not the value. That difference is what makes QC fast.</p>
<h3>Treat it like a balance scale</h3>
<p>Imagine A and B on the two sides of a scale. You may do anything to both sides that cannot flip the balance:</p>
<ul>
<li>add or subtract the same number from both sides;</li>
<li>multiply or divide both sides by the same <b>positive</b> number;</li>
<li>square both sides only if you know both are positive.</li>
</ul>
<p>Never multiply both sides by something that could be negative or zero: a negative flips the scale, and zero makes everything equal.</p>
<h3>When variables appear, plug in a spread of numbers</h3>
<p>Test values from different "families": <b>0, 1, −1, a fraction like ½, a negative fraction, a large number</b>. Stop as soon as two values give different relationships: the answer is (D).</p>
<h3>When there are no variables</h3>
<p>If both quantities are fixed numbers, the relationship is fixed too, so (D) is impossible.</p>`,
fast:['Simplify both sides with the same safe step before computing anything.','Pick numbers from different families: 0, 1, −1, ½, large. Two different outcomes means (D).','No variables? Cross out (D) immediately.','Estimate: if A is about 50 and B is about 70, you are done.'],
example:{q:'x is an integer and x &gt; 0.<br>Quantity A: 3x + 7 &nbsp;&nbsp; Quantity B: 2x + 12', a:`Subtract 2x + 7 from both sides. A becomes <b>x</b>, B becomes <b>5</b>. Now the question is "x versus 5". x could be 1 (B larger) or 10 (A larger), so the answer is <b>(D)</b>. No calculation of 3x + 7 was needed.`},
traps:['Picking (D) when both sides are plain numbers.','Testing only positive whole numbers and missing fractions or negatives.','Multiplying both sides by a variable that might be negative.','Trusting a figure that is not drawn to scale.']},

{id:'q-number', exam:'gre', sec:'quant', title:'Integers, factors, primes & remainders', mins:15,
summary:'Divisibility, prime factorisation, counting divisors, odd/even and remainder rules.',
body:`
<h3>Prime factorisation is the master key</h3>
<p>Break a number into primes using a factor tree: 84 = 2 × 42 = 2 × 2 × 21 = 2² × 3 × 7. Almost every factor question becomes easy once you have this.</p>
<ul>
<li><b>Is k a factor of n?</b> Every prime in k must appear in n at least as many times. 8 = 2³ is not a factor of 84 = 2² × 3 × 7 because 84 has only two 2s.</li>
<li><b>How many positive divisors?</b> Add 1 to each exponent and multiply. 36 = 2² × 3² → (2+1)(2+1) = 9 divisors.</li>
</ul>
<h3>Divisibility shortcuts</h3>
<ul>
<li>by 3: digit sum divisible by 3 · by 9: digit sum divisible by 9</li>
<li>by 4: last two digits divisible by 4 · by 6: divisible by 2 and 3</li>
<li>by 5: ends in 0 or 5</li>
</ul>
<h3>Odd and even</h3>
<p>even ± even = even · odd ± odd = even · even ± odd = odd · any product with an even factor is even.</p>
<h3>Remainders</h3>
<p>"n leaves remainder r when divided by d" means <b>n = dq + r</b> with 0 ≤ r &lt; d. The quickest method: <b>replace n with the smallest number that works</b>, which is r itself, and compute.</p>
<p>Two useful facts: the square of any odd integer leaves remainder 1 when divided by 4 (and by 8); remainders can be added and multiplied, then reduced.</p>`,
fast:['For remainder questions, substitute the smallest valid number (n = r) and compute.','Count divisors with (exponent + 1) products.','A remainder is always smaller than the divisor: any choice ≥ the divisor is wrong.'],
example:{q:'When n is divided by 7, the remainder is 5. What is the remainder when 3n is divided by 7?', a:`Take n = 5 (the smallest number that works). 3n = 15. 15 = 2 × 7 + 1, so the remainder is <b>1</b>. Check with n = 12: 3n = 36 = 5 × 7 + 1. Same answer.`},
traps:['Forgetting 1 and the number itself when counting divisors (the formula already includes them).','Treating 1 as prime. It is not; 2 is the only even prime.','Giving a "remainder" bigger than the divisor.']},

{id:'q-percent', exam:'gre', sec:'quant', title:'Percents, ratios & rates', mins:15,
summary:'Percent change, successive changes, ratio parts, and work and speed problems.',
body:`
<h3>Percent change</h3>
<p><b>Percent change = change ÷ original × 100.</b> The original is the starting value, not the new one. From 80 to 100 is a 25% increase; from 100 to 80 is a 20% decrease.</p>
<h3>Use multipliers</h3>
<p>Increase by 20% → × 1.20. Decrease by 25% → × 0.75. Successive changes <b>multiply</b>: up 20% then down 20% is 1.2 × 0.8 = 0.96, a 4% net loss, not zero.</p>
<p>To undo a change, divide by the multiplier. A price after a 25% discount is $36: original = 36 ÷ 0.75 = $48.</p>
<h3>Ratios</h3>
<p>If boys : girls = 3 : 5, think of 3 + 5 = 8 equal parts. In a class of 40, each part is 5, so 15 boys and 25 girls.</p>
<h3>Rates and work</h3>
<ul>
<li>distance = speed × time; work = rate × time.</li>
<li>Combined work: add the <b>rates</b>, not the times. A does a job in a hours, B in b hours → together <b>ab ÷ (a + b)</b> hours.</li>
<li>Average speed over a round trip = total distance ÷ total time (not the average of the two speeds).</li>
</ul>`,
fast:['Convert every percent to a multiplier and chain them.','Reverse a percent change by dividing, never by "adding the percent back".','Two workers: product over sum, ab ÷ (a + b).','Pick 100 as the starting value when no number is given.'],
example:{q:'A price rises 10% and then falls 10%. What is the net change?', a:`1.10 × 0.90 = 0.99, so a <b>1% decrease</b>. Picking 100 as the start: 100 → 110 → 99.`},
traps:['Dividing by the new value instead of the original.','Thinking +x% then −x% cancels out.','Averaging two times or two speeds.']},

{id:'q-algebra', exam:'gre', sec:'quant', title:'Equations, inequalities & systems', mins:18,
summary:'Linear and quadratic equations, inequalities, simultaneous equations, and back-solving.',
body:`
<h3>Linear equations</h3>
<p>Do the same thing to both sides until the variable stands alone. 3x − 7 = 2x + 5 → x = 12.</p>
<h3>Inequalities</h3>
<p>Same rules, with one exception: <b>multiplying or dividing by a negative number flips the sign</b>. −2x &gt; 6 → x &lt; −3.</p>
<p>For a squared variable inside a range, check the endpoints <i>and</i> zero. If −3 &lt; x &lt; 2, then x² can be anything from 0 up to (but not including) 9: the largest square comes from the end farthest from zero.</p>
<h3>Systems of two equations</h3>
<p>Elimination is usually fastest: line the equations up and add or subtract a multiple of one from the other to remove a variable. Before solving fully, check whether the question wants a combination such as x + y; sometimes adding the equations gives it directly.</p>
<h3>Quadratics</h3>
<p>Know three patterns on sight:</p>
<ul><li>a² − b² = (a + b)(a − b)</li><li>(a + b)² = a² + 2ab + b²</li><li>(a − b)² = a² − 2ab + b²</li></ul>
<p>Set the equation equal to zero, factor, and set each factor to zero: x² − 5x + 6 = 0 → (x − 2)(x − 3) = 0 → x = 2 or 3.</p>
<h3>Back-solving</h3>
<p>When choices are numbers, try them in the question. Start with the middle choice; if it is too big, move to smaller ones.</p>`,
fast:['Read the last line first: what exactly is asked?','Elimination beats substitution for most GRE systems.','Back-solve from the middle choice.','Flip the inequality sign whenever you multiply or divide by a negative.'],
example:{q:'If 2x + 3y = 12 and 4x − y = 10, what is x + y?', a:`From the second equation y = 4x − 10. Substitute: 2x + 12x − 30 = 12 → 14x = 42 → x = 3, so y = 2 and <b>x + y = 5</b>. Check: 2(3) + 3(2) = 12 ✓.`},
traps:['Answering x when the question asks for x + y.','Forgetting to flip the sign in an inequality.','Assuming the variable is a positive integer when nothing says so.']},

{id:'q-exponents', exam:'gre', sec:'quant', title:'Exponents & roots', mins:12,
summary:'Exponent rules, negative and fractional powers, and how fractions behave when squared.',
body:`
<h3>The rules</h3>
<div class="tblwrap"><table class="tbl"><tbody>
<tr><td>a<sup>m</sup> × a<sup>n</sup> = a<sup>m+n</sup></td><td>a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m−n</sup></td></tr>
<tr><td>(a<sup>m</sup>)<sup>n</sup> = a<sup>mn</sup></td><td>a<sup>0</sup> = 1 (a ≠ 0)</td></tr>
<tr><td>a<sup>−n</sup> = 1 ÷ a<sup>n</sup></td><td>a<sup>1/2</sup> = √a</td></tr>
</tbody></table></div>
<h3>Adding powers is different</h3>
<p>There is no rule for a<sup>m</sup> + a<sup>n</sup>. Factor instead: 2<sup>10</sup> + 2<sup>10</sup> = 2 × 2<sup>10</sup> = 2<sup>11</sup>. And 3<sup>8</sup> + 3<sup>8</sup> + 3<sup>8</sup> = 3 × 3<sup>8</sup> = 3<sup>9</sup>.</p>
<h3>Rewrite with a common base</h3>
<p>4<sup>10</sup> = (2²)<sup>10</sup> = 2<sup>20</sup>. 8<sup>x</sup> = 2<sup>3x</sup>. Once bases match, compare exponents.</p>
<h3>Numbers between 0 and 1</h3>
<p>Squaring makes them <b>smaller</b> (½ → ¼); square roots make them larger. Negative numbers become positive when squared. These facts drive many QC questions.</p>`,
fast:['Same base? Compare exponents.','Sum of identical powers: count them and multiply (k × a<sup>n</sup>).','For "x² vs x", test x = ½ and x = 2.'],
example:{q:'Which is greater: 2<sup>30</sup> or 4<sup>14</sup>?', a:`4<sup>14</sup> = 2<sup>28</sup>. Since 30 &gt; 28, <b>2<sup>30</sup></b> is greater.`},
traps:['Adding exponents when the operation is addition, not multiplication.','Assuming x² &gt; x for every positive x.']},

{id:'q-geometry', exam:'gre', sec:'quant', title:'Triangles, circles & polygons', mins:20,
summary:'Angle facts, special right triangles, Pythagorean triples, circles and areas.',
body:`
<h3>Triangles</h3>
<ul>
<li>Angles add to 180°. Equal sides face equal angles.</li>
<li><b>Triangle inequality:</b> any side is less than the sum and greater than the difference of the other two.</li>
<li>Area = ½ × base × height, where the height is perpendicular to the base.</li>
</ul>
<h3>Right triangles</h3>
<p>Pythagoras: a² + b² = c². Memorise the triples so you never calculate them: <b>3-4-5, 5-12-13, 8-15-17, 7-24-25</b> and their multiples (6-8-10, 9-12-15).</p>
<div class="tblwrap"><table class="tbl"><thead><tr><th>Special triangle</th><th>Side ratio</th></tr></thead><tbody>
<tr><td>45°–45°–90°</td><td>1 : 1 : √2</td></tr>
<tr><td>30°–60°–90°</td><td>1 : √3 : 2</td></tr>
</tbody></table></div>
<p>An equilateral triangle of side s splits into two 30-60-90 triangles: height = (√3 ÷ 2) × s, area = (√3 ÷ 4) × s².</p>
<h3>Circles</h3>
<p>Circumference = 2πr = πd. Area = πr². An arc or sector is a fraction of the whole: angle ÷ 360.</p>
<h3>Polygons</h3>
<p>Interior angles of an n-sided polygon add to (n − 2) × 180°. A hexagon: 720°.</p>
<p><b>Figures are not drawn to scale</b> unless the question says so. A line that looks straight is straight, but lengths and angles can't be measured by eye.</p>`,
fast:['Spot a triple (5-12-13) and skip the square roots.','Area of a circle given? Take √(area ÷ π) to get r in one step.','Draw the height when you see an equilateral or isosceles triangle.'],
example:{q:'A circle has area 49π. What is its circumference?', a:`πr² = 49π → r = 7. Circumference = 2πr = <b>14π</b>.`},
traps:['Using the diameter in a radius formula.','Confusing area (πr²) with circumference (2πr).','Measuring a figure that is not drawn to scale.']},

{id:'q-coord', exam:'gre', sec:'quant', title:'Coordinate geometry', mins:10,
summary:'Slope, intercepts, the line equation, and distances on the plane.',
body:`
<p><b>Slope</b> = rise ÷ run = (y₂ − y₁) ÷ (x₂ − x₁). A line is <b>y = mx + b</b>: m is the slope, b the y-intercept (where x = 0).</p>
<ul>
<li>To find b, put any point on the line into y = mx + b.</li>
<li>x-intercept: set y = 0. y-intercept: set x = 0.</li>
<li>Parallel lines have equal slopes; perpendicular slopes multiply to −1 (2 and −½).</li>
<li>Distance between two points is the hypotenuse of a right triangle with legs |x₂ − x₁| and |y₂ − y₁|.</li>
</ul>`,
fast:['Sketch the two points: the sign of the slope is visible at once.','Distance: look for a 3-4-5 or 5-12-13 triangle.'],
example:{q:'A line passes through (1, 2) and (4, 11). What is its y-intercept?', a:`Slope = (11 − 2) ÷ (4 − 1) = 3. Then 2 = 3(1) + b → b = <b>−1</b>.`},
traps:['Mixing up x and y order in the slope formula.','Giving the slope when the intercept is asked.']},

{id:'q-stats', exam:'gre', sec:'quant', title:'Mean, median, spread & distributions', mins:18,
summary:'Averages, median, standard deviation, quartiles and the normal distribution.',
body:`
<h3>Mean</h3>
<p>The key identity: <b>sum = mean × number of values</b>. Most "a number is removed / added" questions are solved with sums, not means.</p>
<h3>Median and mode</h3>
<p>Median: sort the values, take the middle one; with an even count, average the two middle values. Mode: the most frequent value.</p>
<h3>Standard deviation (SD)</h3>
<p>SD measures how spread out values are around the mean. You rarely compute it. Know how it reacts:</p>
<ul>
<li>Adding the same number to every value: <b>SD unchanged</b> (the set just slides).</li>
<li>Multiplying every value by k: SD is multiplied by |k|.</li>
<li>More values far from the mean → larger SD.</li>
</ul>
<h3>Quartiles and boxplots</h3>
<p>Q1 is the median of the lower half, Q3 of the upper half. Interquartile range (IQR) = Q3 − Q1. A boxplot shows min, Q1, median, Q3, max.</p>
<h3>Normal distribution</h3>
<p>Symmetric and bell-shaped. About 68% of values lie within 1 SD of the mean, 95% within 2 SD, 99.7% within 3 SD.</p>`,
fast:['Turn every mean into a sum immediately.','For SD comparisons, look at the spacing of the numbers, not their size.','Even count? Median = average of the two middle values.'],
example:{q:'The mean of 5 numbers is 12. One number is removed and the mean of the rest is 10. Which number was removed?', a:`Sum before = 5 × 12 = 60. Sum after = 4 × 10 = 40. Removed number = <b>20</b>.`},
traps:['Taking the median without sorting first.','Thinking a set of bigger numbers must have a bigger SD.']},

{id:'q-prob', exam:'gre', sec:'quant', title:'Probability & counting', mins:18,
summary:'Combinations, permutations, independent events, the complement rule and Venn diagrams.',
body:`
<h3>Counting</h3>
<ul>
<li><b>Does order matter?</b> Yes → permutation: n! ÷ (n − k)!. No → combination: n! ÷ (k!(n − k)!).</li>
<li>A committee, a group, a hand of cards: order does <i>not</i> matter. A ranking, a password, seats in a row: order matters.</li>
<li>C(7, 3) = (7 × 6 × 5) ÷ (3 × 2 × 1) = 35.</li>
</ul>
<h3>Probability</h3>
<p>P = favourable outcomes ÷ total equally likely outcomes.</p>
<ul>
<li>Independent events, A <b>and</b> B: multiply.</li>
<li>A <b>or</b> B: P(A) + P(B) − P(A and B).</li>
<li><b>At least one</b>: 1 − P(none). This complement trick is the biggest time-saver.</li>
</ul>
<h3>Coins and dice</h3>
<p>3 coin flips have 2³ = 8 outcomes. Exactly k heads: C(3, k) ÷ 8. Two dice: 36 outcomes; a sum of 7 occurs 6 ways.</p>
<h3>Venn diagrams</h3>
<p>Total = A + B − both + neither.</p>`,
fast:['"At least one" → 1 − P(none).','Write the order-matters question first, then divide by k! if order does not matter.','For small cases, list the outcomes; it is often faster than a formula.'],
example:{q:'What is the probability of at least one head in 3 coin flips?', a:`P(no heads) = (½)³ = ⅛. So P(at least one) = 1 − ⅛ = <b>⅞</b>.`},
traps:['Using permutations for a committee.','Adding probabilities of events that can happen together without subtracting the overlap.']},

{id:'q-data', exam:'gre', sec:'quant', title:'Data Interpretation sets', mins:12,
summary:'Reading tables and graphs quickly and computing only what the question needs.',
body:`
<p>A Data Interpretation set gives one display (a table or graph) and several questions about it.</p>
<ol>
<li><b>Skim the display first</b>: title, axes, units, footnotes. "In thousands" or "percent of total" changes every answer.</li>
<li>Read the question and find only the cells you need.</li>
<li><b>Estimate before you calculate.</b> If choices are far apart, rounding is enough.</li>
<li>Use the calculator for division with ugly numbers.</li>
</ol>
<p>Watch for broken axes (a scale that doesn't start at zero makes changes look larger) and for the difference between "percent of" and "percent change".</p>`,
fast:['Circle the unit in your head before any question.','Percent change always divides by the earlier value.','Use only the data shown; don\'t assume trends continue.'],
example:{q:'Sales rose from 120 to 195 (thousands). Percent increase?', a:`Change = 75. 75 ÷ 120 = 0.625 → <b>62.5%</b>.`},
traps:['Dividing by the later value.','Ignoring "in thousands" or "in millions".']},

{id:'q-calc', exam:'gre', sec:'quant', title:'Using the on-screen calculator', mins:8,
summary:'How the ETS calculator works, and when it helps or wastes time.',
body:`
<p>The GRE calculator is basic but it <b>respects order of operations</b>. Typing 1 + 2 × 4 = gives 9.</p>
<ul>
<li><b>√ goes before the number.</b> Press √ 1 6 = to get 4. For √(9 + 16), press √ ( 9 + 1 6 ) =.</li>
<li><b>Memory:</b> M+ adds the display to memory (an M appears), MR brings it back, MC clears it. Use it to store a denominator.</li>
<li><b>Transfer Display</b> copies the result into a Numeric Entry box, avoiding typing errors.</li>
<li>The display holds 8 digits. Very large results show ERROR; press C.</li>
<li>CE clears only the last number you typed; C clears everything except memory.</li>
</ul>
<h3>When to use it</h3>
<p>Long division, square roots of non-perfect squares, multi-digit multiplication, and final checks of Data Interpretation questions.</p>
<h3>When not to</h3>
<p>Simple arithmetic you can do in your head, and fraction answers (the calculator turns ⅓ into 0.3333333). Estimate first so you notice a keying mistake.</p>
<p>Open the calculator from any Quant practice question or Quant test using the <b>Calculator</b> button.</p>`,
fast:['Estimate first, calculate second.','Use Transfer Display on Numeric Entry to avoid retyping.','For a fraction like (a + b) ÷ c, press ( a + b ) ÷ c =.'],
example:{q:'Compute 195 ÷ 600 as a percent.', a:`Press 1 9 5 ÷ 6 0 0 = → 0.325. Multiply by 100: <b>32.5</b>.`},
traps:['Pressing 16 then √: the root applies to the next number, not the last one.','Rounding in the middle of a calculation.']},

{id:'q-numeric', exam:'gre', sec:'quant', title:'Numeric Entry & select-one-or-more', mins:8,
summary:'Answer formats with no choices to fall back on, and all-or-nothing scoring.',
body:`
<h3>Numeric Entry</h3>
<ul>
<li>Type an integer or decimal in one box, or a fraction in two boxes. Fractions do not need to be reduced: 6/36 is accepted for 1/6.</li>
<li>Answer exactly what is asked: units, percent versus decimal, how many decimal places.</li>
<li>Round only at the end, and only if the question tells you to.</li>
</ul>
<h3>Select one or more</h3>
<ul>
<li>Credit only if you choose <b>all and only</b> the correct answers.</li>
<li>Judge each choice on its own; the number of correct answers may not be stated.</li>
<li>For ranges, test the smallest and largest possible values first.</li>
</ul>`,
fast:['Re-read the question\'s final words before typing an answer.','For "which could be" questions, find the full range, then check each choice against it.'],
example:{q:'If −3 &lt; x &lt; 2, which could equal x²: 0, 4, 8, 9?', a:`x² ranges from 0 (x = 0) up to just under 9 (x near −3). So <b>0, 4 and 8</b> are possible; 9 is not.`},
traps:['Typing 0.15 when the question asks for a percent.','Selecting only one choice in a select-all question.']},

/* ================= GRE VERBAL ================= */
{id:'v-tc', exam:'gre', sec:'verbal', title:'Text Completion', mins:15,
summary:'Clue words, signal words, predicting the blank, and handling two or three blanks.',
body:`
<p>Text Completion gives 1 to 5 sentences with 1 to 3 blanks. One blank has 5 choices; two or three blanks have 3 choices each. You only get credit if <b>every</b> blank is right.</p>
<h3>The four-step method</h3>
<ol>
<li><b>Read the whole passage</b> without looking at the choices.</li>
<li><b>Find the clue</b>: the part of the sentence that tells you what the blank must mean.</li>
<li><b>Find the signal</b>: is the blank the same as the clue or the opposite?</li>
<li><b>Predict</b> your own simple word, then pick the choice closest to it.</li>
</ol>
<div class="tblwrap"><table class="tbl"><thead><tr><th>Signal</th><th>Words</th></tr></thead><tbody>
<tr><td>Opposite direction</td><td>although, though, despite, but, yet, however, rather than, far from, anything but</td></tr>
<tr><td>Same direction</td><td>and, because, so, thus, indeed, in fact, a colon or semicolon that explains</td></tr>
</tbody></table></div>
<h3>Two or three blanks</h3>
<p>Start with the blank that has the clearest clue, which is not always the first. Once one blank is fixed, it becomes a clue for the others. Finally, re-read the whole passage with your choices: it must make sense as a whole.</p>`,
fast:['Cover the choices and predict a plain word first.','Underline the signal word; it tells you whether to copy or reverse the clue.','Fill the easiest blank first.','"Anything but X" means "not X at all".'],
example:{q:'Although the senator was known for her ______ speeches, her final address was strikingly brief.', a:`Signal: <i>although</i> (opposite). Clue: <i>strikingly brief</i>. So the blank means "long". <b>Verbose</b> fits. "Laconic" means brief, which would remove the contrast.`},
traps:['Choosing a word that matches the clue when the signal reverses it.','Picking a word that sounds academic but doesn\'t answer the clue.','Checking only one blank in a multi-blank question.']},

{id:'v-se', exam:'gre', sec:'verbal', title:'Sentence Equivalence', mins:12,
summary:'Finding the two answers that fit the sentence and produce the same meaning.',
body:`
<p>One sentence, one blank, six choices. Pick <b>exactly two</b> that both complete the sentence and give sentences with the same meaning. No partial credit.</p>
<h3>Method</h3>
<ol>
<li>Predict a word for the blank from the clue and signal, exactly as in Text Completion.</li>
<li>Find every choice that matches your prediction.</li>
<li>Among those, choose the pair that means the same thing.</li>
</ol>
<h3>The two classic traps</h3>
<ul>
<li><b>The wrong-way pair:</b> two synonyms that mean the opposite of what the sentence needs. They feel right because they pair up.</li>
<li><b>The lonely fit:</b> one word fits well but has no partner with the same meaning among the choices.</li>
</ul>
<p>The two correct words don't have to be perfect synonyms, but the two finished sentences must mean essentially the same.</p>`,
fast:['Predict first, then look for a pair.','If you find a synonym pair, check it fits; if it fits the opposite meaning, discard it.','Unknown words: eliminate the known wrong ones and pair what remains.'],
example:{q:'Despite the director\'s reputation for ______, the film\'s budget was managed with remarkable care.', a:`<i>Despite</i> reverses <i>managed with remarkable care</i>, so the blank means "wasteful spending". <b>Extravagance</b> and <b>prodigality</b> fit and match. "Frugality" and "parsimony" also pair up but point the wrong way.`},
traps:['Choosing a synonym pair that does not fit the sentence.','Choosing two words that each fit but give different meanings.']},

{id:'v-rc', exam:'gre', sec:'verbal', title:'Reading Comprehension', mins:20,
summary:'Reading for structure, the main question types, and how wrong answers are built.',
body:`
<h3>Read for structure, not details</h3>
<p>As you read, keep a 4-line mental map: <b>topic</b>, <b>the author's point</b>, <b>what each part does</b> (gives evidence, raises an objection, concedes a point), and <b>the author's tone</b>. Details can be looked up later.</p>
<h3>Question types</h3>
<ul>
<li><b>Main idea / primary purpose:</b> the answer covers the whole passage, not one sentence.</li>
<li><b>Detail:</b> "according to the passage" — the answer is a paraphrase of a line.</li>
<li><b>Inference:</b> what must be true based on the passage. Choose the most modest statement the text supports.</li>
<li><b>Function:</b> why the author mentions something. Ask "what role does this play in the argument?"</li>
<li><b>Select one or more:</b> judge each of the 3 choices on its own; 1, 2 or 3 may be correct.</li>
</ul>
<h3>How wrong answers are built</h3>
<ul>
<li><b>Too extreme:</b> "always", "proves", "entirely".</li>
<li><b>Out of scope:</b> sounds reasonable but the passage never discusses it.</li>
<li><b>Half right:</b> starts well, then adds something false.</li>
<li><b>Reversal:</b> uses the passage's words but flips the relationship.</li>
</ul>`,
fast:['Spend more time on the first read than on the questions; it pays back.','For primary purpose, choose the answer whose verb matches the author (argue, challenge, describe, compare).','Prove every word of your answer from a line in the passage.'],
example:{q:'A passage says a view "rested on the assumption" X, then gives survey evidence against X. What is the author doing?', a:`Challenging an assumption with evidence. Choices like "proving X is wrong in all cases" are too extreme; "describing survey methods" is a detail, not the purpose.`},
traps:['Answering from your own knowledge.','Choosing an answer that is true but doesn\'t answer the question asked.','Falling for strong words like "proves" or "always".']},

{id:'v-sip', exam:'gre', sec:'verbal', title:'Select-in-Passage', mins:8,
summary:'Clicking the sentence that performs a described role.',
body:`
<p>The question describes a role (for example "the sentence in which the author concedes a point") and you click that sentence in the passage.</p>
<ol>
<li>Translate the description into a simple job: <i>concede</i> = admit something against your own side; <i>provide evidence</i> = give data or an example; <i>qualify</i> = limit a claim.</li>
<li>Look for the words that do that job: concessions often contain <i>although, admittedly, does not imply, of course</i>; evidence often contains numbers, studies or examples.</li>
<li>Check the sentences on each side to make sure the role isn't shared.</li>
</ol>`,
fast:['Name the role in one plain word before scanning.','Concession clues: "admittedly", "to be sure", "does not mean", "although".'],
example:{q:'Which sentence concedes a point that might weaken the author\'s argument?', a:`The sentence that says the findings "do not imply that informality is benign" admits a downside before the author's main claim. That is the concession.`},
traps:['Choosing the sentence with the right topic but the wrong role.']},

{id:'v-vocab', exam:'gre', sec:'verbal', title:'Building GRE vocabulary', mins:6,
summary:'How to learn words so you recognise them under time pressure.',
body:`
<p>Text Completion and Sentence Equivalence are about half of Verbal, and they depend on vocabulary. Learn words in a way that sticks:</p>
<ul>
<li><b>Learn words in families.</b> Group by meaning: words for "talkative" (verbose, garrulous), for "praise" (laud, extol), for "calm someone down" (mollify, placate, assuage).</li>
<li><b>Learn the direction</b> (positive or negative) even when you forget the exact meaning; it is often enough to eliminate choices.</li>
<li><b>Use roots:</b> <i>bene</i> = good, <i>mal</i> = bad, <i>loqu</i> = speak, <i>ver</i> = truth.</li>
<li><b>Review on a schedule.</b> The Vocabulary tab brings back words you missed.</li>
</ul>`,
fast:['10 new words a day plus review of the previous days beats 70 words once a week.'],
example:{q:'Which group does "placate" belong to?', a:`"Calm someone down", with mollify and assuage.`},
traps:['Memorising definitions without example sentences.']},

/* ================= GRE WRITING ================= */
{id:'w-issue', exam:'gre', sec:'writing', title:'Analyze an Issue essay', mins:20,
summary:'A 30-minute plan, a reliable structure, and what raters reward.',
body:`
<p>You read a short claim and specific instructions, then write a response taking a position. Read the instructions carefully: some ask you to address the strongest counter-arguments, others to discuss when the claim would or would not hold.</p>
<h3>The 30-minute plan</h3>
<div class="tblwrap"><table class="tbl"><tbody>
<tr><td class="num">0–5 min</td><td>Decide a position with a nuance ("largely true, except when…"). List 2–3 reasons, each with one specific example.</td></tr>
<tr><td class="num">5–25 min</td><td>Write: introduction, 2–3 body paragraphs, one paragraph addressing the other side, short conclusion.</td></tr>
<tr><td class="num">25–30 min</td><td>Proof-read. There is no spell-check.</td></tr>
</tbody></table></div>
<h3>What scores a 5 or 6</h3>
<ul>
<li>A clear, <b>qualified</b> position that follows the specific instructions.</li>
<li>Reasons developed with <b>specific</b> examples (a historical event, a scientific finding, a real policy), not general statements.</li>
<li>Logical organisation with transitions between ideas.</li>
<li>Varied sentences and precise vocabulary. Minor errors are fine.</li>
</ul>
<h3>A paragraph pattern that works</h3>
<p>Claim sentence → explanation → specific example → link back to your position.</p>`,
fast:['Take a nuanced position; it makes the "complexities" part automatic.','Prepare 6–8 flexible examples (science, history, education, technology, government) before the test.','Aim for 450–550 words; quality matters more than length.'],
example:{q:'Claim: Governments should fund only research with clear practical applications.', a:`A nuanced thesis: "Practical research deserves priority, but restricting funding only to it would starve the basic science that later practical advances depend on." Example: research on how bacteria defend against viruses had no obvious use, yet it led to CRISPR gene editing.`},
traps:['Ignoring the specific instructions in the prompt.','Using only hypothetical examples.','Spending the last minutes writing instead of proof-reading.']},

/* ================= IELTS LISTENING ================= */
{id:'il-technique', exam:'ielts', sec:'listening', title:'Prediction, signposts & distractors', mins:12,
summary:'What to do before, during and after each part of the recording.',
body:`
<p>You hear the recording once. Success depends on knowing what you are listening for <b>before</b> it is said.</p>
<h3>Before: predict</h3>
<p>For each gap, decide the word type (noun, number, adjective, name) and a likely answer. "Cost: £___" needs a number; "Lessons on ___" probably needs a day.</p>
<h3>During: follow signposts</h3>
<p>Speakers announce where they are going: "first of all", "another point", "moving on to", "finally". These tell you which question is coming.</p>
<h3>Distractors</h3>
<p>IELTS deliberately mentions wrong answers first. Listen for:</p>
<ul>
<li><b>Corrections:</b> "Tuesday — oh, no, wait, Thursday."</li>
<li><b>Changed plans:</b> "I was going to get an individual one, but…"</li>
<li><b>Price adjustments:</b> "normally £52, but with the discount…"</li>
</ul>
<p>The answer is the final, confirmed information.</p>
<h3>After: check</h3>
<p>Check spelling, singular/plural, and the word limit.</p>`,
fast:['Underline the keyword in each question while you wait.','When you hear "but", "actually" or "instead", get ready to change your answer.','Never leave a gap empty; guess from your prediction.'],
example:{q:'You hear: "We run lessons on Tuesdays and Thursdays." "Tuesday would be — oh, no, the kids have football then. Thursday, please." Lesson day: ____', a:`<b>Thursday</b>. Tuesday was mentioned first and then rejected.`},
traps:['Writing the first number or day you hear.','Losing your place and missing the next three questions; follow the signposts.']},

{id:'il-forms', exam:'ielts', sec:'listening', title:'Form & note completion: word limits and spelling', mins:10,
summary:'The marking rules that decide whether a correct idea scores a mark.',
body:`
<h3>Word limits</h3>
<p>"NO MORE THAN TWO WORDS AND/OR A NUMBER" means up to two words, or two words plus a number, or just a number. Any answer longer than the limit is wrong, even if the idea is correct.</p>
<ul>
<li>A number written as digits (48) counts as a number, not a word.</li>
<li>Hyphenated words count as one word.</li>
<li>Don't repeat words already printed around the gap.</li>
</ul>
<h3>Spelling</h3>
<p>Misspellings lose the mark. British and American spellings are both fine (colour/color). Practise months, days, common surnames, and words like <i>accommodation</i>, <i>necessary</i>, <i>environment</i>.</p>
<h3>Letters and numbers</h3>
<p>Names are often spelled aloud: "H-A-R-L-O-W". "Double L" means LL. Phone numbers use "oh" for zero. Dates can be written 15 March or March 15.</p>
<h3>Grammar fit</h3>
<p>The completed note must be grammatical. If the gap follows "a", the answer is singular.</p>`,
fast:['Count the words in your answer before moving on.','Write numbers as digits; it is faster and avoids spelling errors.'],
example:{q:'Notes: "Material of bag: ______" (NO MORE THAN TWO WORDS). You hear: "It\'s brown leather — well, imitation leather."', a:`<b>imitation leather</b>. "Leather" alone was corrected; "brown imitation leather" is three words.`},
traps:['Adding an article or colour that pushes you over the limit.','Writing the word before it was corrected.']},

/* ================= IELTS READING ================= */
{id:'ir-skim', exam:'ielts', sec:'reading', title:'Skimming, scanning & time control', mins:10,
summary:'Getting the gist fast and finding details without reading every word.',
body:`
<h3>Skim first (2–3 minutes per passage)</h3>
<p>Read the title, the first sentence of each paragraph and the last paragraph. Write one or two words beside each paragraph: its topic.</p>
<h3>Scan for details</h3>
<p>For each question, choose a keyword that is easy to spot: a name, a number, a date, a capitalised term. Move your eyes quickly to find it, then read that area carefully.</p>
<h3>Paraphrase</h3>
<p>Questions rarely copy the text. "Needs less water" in a question may appear as "uses a fraction of the water" in the text. Look for meaning, not matching words.</p>
<h3>Time</h3>
<p>About 15, 20 and 25 minutes for the three sections. If a question takes more than 2 minutes, guess and move on.</p>`,
fast:['Use names and numbers as scanning anchors.','Most question types follow the order of the text.','Answer every question; there is no penalty.'],
example:{q:'Question: "The writer suggests vertical farms will remain a supplement." Where would you look?', a:`The last paragraph: overall views and predictions usually come at the end.`},
traps:['Reading every word of the passage before looking at questions.','Matching words instead of meaning.']},

{id:'ir-tfng', exam:'ielts', sec:'reading', title:'True / False / Not Given and Yes / No / Not Given', mins:15,
summary:'The difference between contradicted and missing information, and facts versus opinions.',
body:`
<div class="tblwrap"><table class="tbl"><thead><tr><th>Answer</th><th>Means</th></tr></thead><tbody>
<tr><td><b>TRUE / YES</b></td><td>The text says the same thing, usually in different words.</td></tr>
<tr><td><b>FALSE / NO</b></td><td>The text says the <b>opposite</b>. You can point to the line that contradicts the statement.</td></tr>
<tr><td><b>NOT GIVEN</b></td><td>The text gives no information to decide. You cannot find a line that confirms or contradicts it.</td></tr>
</tbody></table></div>
<p><b>True/False/Not Given</b> is about facts in the text. <b>Yes/No/Not Given</b> is about the writer's opinions or claims. Don't mix up the labels; writing "True" in a Yes/No question is wrong.</p>
<h3>Method</h3>
<ol>
<li>Find the part of the text the statement refers to (questions follow text order).</li>
<li>Compare each part of the statement: who, what, how much, how often.</li>
<li>Watch the qualifiers: <i>all, most, some, always, only, never</i>. "All companies closed" versus "several companies closed, while others expanded" is FALSE.</li>
</ol>
<p>If the text talks about weekdays and the statement says "every day", weekends are not mentioned at all: NOT GIVEN.</p>`,
fast:['FALSE needs a contradicting line; if you cannot find one, it is probably NOT GIVEN.','Circle qualifiers like "all", "most", "only" in the statement.','Ignore what you know about the topic.'],
example:{q:'Text: "The museum opens at 9 a.m. on weekdays." Statement: "The museum opens at 9 a.m. every day."', a:`<b>NOT GIVEN</b>. The text says nothing about weekends, so it neither confirms nor contradicts "every day".`},
traps:['Choosing FALSE when information is simply missing.','Using background knowledge.','Missing a small qualifier like "most".']},

{id:'ir-headings', exam:'ielts', sec:'reading', title:'Matching headings', mins:10,
summary:'Choosing the heading that captures a whole paragraph\'s main idea.',
body:`
<ol>
<li>Do this question type first for the passage, or after skimming; it doubles as your skim.</li>
<li>Read the paragraph, then say its main idea in five words or fewer.</li>
<li>Choose the heading that matches <b>the whole paragraph</b>, not one detail or one word in it.</li>
<li>Cross out used headings. There are always more headings than paragraphs.</li>
</ol>
<p>Main ideas often sit in the first or second sentence, but a paragraph that starts with "However" may turn to a new point.</p>`,
fast:['Summarise first, then read the heading list.','A heading with a word copied from the paragraph is often a trap.'],
example:{q:'A paragraph describes high electricity costs for lighting and cooling, and companies closing after energy prices rose.', a:`Main idea: energy costs. Heading: <b>"A power problem"</b>.`},
traps:['Matching a heading to a single detail.','Choosing a heading because it repeats a word from the paragraph.']},

{id:'ir-completion', exam:'ielts', sec:'reading', title:'Sentence & summary completion', mins:10,
summary:'Copying the exact words from the text within the word limit.',
body:`
<ul>
<li>Answers come <b>from the text</b>; copy the spelling exactly.</li>
<li>Respect the word limit. "NO MORE THAN TWO WORDS" means one or two.</li>
<li>Predict the word type first: after "their low ___", you need a noun.</li>
<li>The completed sentence must be grammatical and true to the text.</li>
</ul>`,
fast:['Find the paraphrased sentence in the text, then lift the exact word.','Check singular/plural against the text.'],
example:{q:'"The LEDs provide only the ______ that plants need." Text: "LEDs supply exactly the wavelengths needed for photosynthesis."', a:`<b>wavelengths</b>`},
traps:['Changing the word form (wavelength vs wavelengths).','Writing three words when the limit is two.']},

/* ================= IELTS WRITING ================= */
{id:'iw-task1', exam:'ielts', sec:'writing', title:'Academic Task 1: describing charts', mins:20,
summary:'A four-paragraph structure, the overview, and the language of trends.',
body:`
<h3>Structure (150–180 words, 20 minutes)</h3>
<ol>
<li><b>Introduction:</b> paraphrase what the chart shows (what, where, when, units).</li>
<li><b>Overview:</b> the two or three most important features. No numbers. This is the sentence examiners look for first.</li>
<li><b>Body 1:</b> details of one group of data, with numbers.</li>
<li><b>Body 2:</b> details of the other group, with comparisons.</li>
</ol>
<h3>What goes in an overview</h3>
<p>The overall trend (rising, falling, stable), the highest and lowest, and any crossing point or major contrast.</p>
<h3>Trend language</h3>
<div class="tblwrap"><table class="tbl"><tbody>
<tr><td>Up</td><td>rose, increased, climbed, surged (fast), grew steadily</td></tr>
<tr><td>Down</td><td>fell, declined, dropped, plummeted (fast)</td></tr>
<tr><td>Flat</td><td>remained stable, levelled off, plateaued</td></tr>
<tr><td>Up and down</td><td>fluctuated around…</td></tr>
<tr><td>Comparing</td><td>while, whereas, compared with, the highest proportion</td></tr>
</tbody></table></div>
<p>Don't give reasons or opinions; describe only what the data shows.</p>`,
fast:['Write the overview second, right after the introduction.','Group data by trend rather than describing every point in order.','Use "approximately" or "just under" to describe numbers you read from a line.'],
example:{q:'A line graph shows bus use in three cities, 2000–2020.', a:`Overview: "Overall, bus use declined in City A but rose sharply in City B, which had overtaken City A by 2020, while City C remained broadly stable."`},
traps:['No overview.','Listing every number with no comparison.','Adding causes or opinions.']},

{id:'iw-task1gt', exam:'ielts', sec:'writing', title:'General Training Task 1: letters', mins:12,
summary:'Tone, purpose, and covering all three bullet points.',
body:`
<ul>
<li><b>Tone</b> follows the reader: a company or official → formal ("Dear Sir or Madam … Yours faithfully"); a named person you don't know well → semi-formal ("Dear Mr Patel … Yours sincerely"); a friend → informal ("Hi Sam … Best wishes").</li>
<li><b>Purpose</b> in the first sentence: "I am writing to complain about…"</li>
<li><b>Cover all three bullet points</b>, one paragraph each. Missing one lowers Task Achievement.</li>
<li>Close with an action request: "I would be grateful if you could…"</li>
</ul>`,
fast:['Decide the tone from the reader before writing a word.','Turn each bullet into a paragraph.'],
example:{q:'Write to your landlord about a broken heater.', a:`Semi-formal: "Dear Mr Patel, I am writing to let you know that the heater in my flat has stopped working…"`},
traps:['Using informal openings with an official.','Forgetting one bullet point.']},

{id:'iw-task2', exam:'ielts', sec:'writing', title:'Task 2: essay types & structure', mins:20,
summary:'Recognising the five question types and answering every part.',
body:`
<div class="tblwrap"><table class="tbl"><thead><tr><th>Type</th><th>Question looks like</th><th>You must</th></tr></thead><tbody>
<tr><td>Opinion</td><td>To what extent do you agree or disagree?</td><td>Give a clear position and keep it throughout</td></tr>
<tr><td>Discussion</td><td>Discuss both views and give your own opinion.</td><td>Explain both sides fairly, then state your view</td></tr>
<tr><td>Advantages / disadvantages</td><td>Do the advantages outweigh the disadvantages?</td><td>Weigh both and decide which is greater</td></tr>
<tr><td>Problem / solution</td><td>What are the causes? What can be done?</td><td>Answer both questions</td></tr>
<tr><td>Two-part</td><td>Two direct questions</td><td>Answer each one fully</td></tr>
</tbody></table></div>
<h3>Four-paragraph structure (260–300 words, 40 minutes)</h3>
<ol>
<li>Introduction: paraphrase the topic + your answer (thesis).</li>
<li>Body 1: first main idea → explanation → example.</li>
<li>Body 2: second main idea → explanation → example.</li>
<li>Conclusion: restate your position; no new ideas.</li>
</ol>
<p>Spend 5 minutes planning. A clear plan improves both Task Response and Coherence.</p>`,
fast:['Underline every instruction in the question and tick each one in your plan.','State your opinion in the introduction when the question asks for it.'],
example:{q:'"More people work from home. Do the advantages outweigh the disadvantages?"', a:`Type: advantages/disadvantages. Thesis: "Although home working can isolate employees, I believe its benefits — saved commuting time and greater flexibility — outweigh this drawback."`},
traps:['Answering only half the question.','Changing position between introduction and conclusion.','Memorised paragraphs that don\'t fit the topic.']},

{id:'iw-criteria', exam:'ielts', sec:'writing', title:'How Writing is scored', mins:8,
summary:'The four criteria in plain words and what moves you up a band.',
body:`
<div class="tblwrap"><table class="tbl"><thead><tr><th>Criterion</th><th>The examiner asks</th></tr></thead><tbody>
<tr><td>Task Achievement / Response</td><td>Did you answer every part, with a clear position (Task 2) or overview (Task 1), and support your ideas?</td></tr>
<tr><td>Coherence and Cohesion</td><td>Is it logically organised in paragraphs, with linking words used naturally, not mechanically?</td></tr>
<tr><td>Lexical Resource</td><td>Is your vocabulary precise and varied, with good collocations and few spelling errors?</td></tr>
<tr><td>Grammatical Range and Accuracy</td><td>Do you use a mix of simple and complex sentences, and are most sentences error-free?</td></tr>
</tbody></table></div>
<p>Read the official 2023 descriptors linked in the Official guide for the exact band wording.</p>`,
fast:['For band 7: a clear overview/position, logical paragraphs, some less common vocabulary, frequent error-free complex sentences.'],
example:{q:'Which criterion does "Firstly… Secondly… Moreover…" in every sentence affect?', a:`Coherence and Cohesion: mechanical linking is a band-6 feature.`},
traps:['Overusing linking words.','Using rare words incorrectly to sound advanced.']},

/* ================= IELTS SPEAKING ================= */
{id:'is-parts', exam:'ielts', sec:'speaking', title:'Speaking Parts 1, 2 and 3', mins:15,
summary:'How long to answer in each part and simple structures that keep you talking.',
body:`
<h3>Part 1 — short, natural answers</h3>
<p><b>Answer + reason + example.</b> "Yes, I enjoy cooking, mainly because it helps me relax after work. Last weekend, for example, I made biryani for my family."</p>
<h3>Part 2 — the long turn</h3>
<p>Use the minute to write 3–5 keywords for each prompt on the card. Then speak for the full 2 minutes. A simple order: <b>set the scene → describe → tell a short story → explain feelings or why it matters</b>. If you finish early, add a comparison or a lesson you learned.</p>
<h3>Part 3 — discussion</h3>
<p>Questions are more abstract. Use: <b>opinion → reason → example → other side</b>. "I'd say technology has made learning easier, largely because… For instance… That said, some students…"</p>
<h3>Buying thinking time</h3>
<p>"That's an interesting question." "I haven't thought about that before, but…" These keep you fluent while you think.</p>`,
fast:['Part 1: 2–3 sentences. Part 2: full 2 minutes. Part 3: 4–5 sentences.','Use the past tense correctly when telling a Part 2 story.'],
example:{q:'Part 1: "Do you like cooking?"', a:`"Yes, quite a lot, mainly because it relaxes me after a long day. Last weekend, for example, I tried making biryani for the first time."`},
traps:['One-word answers in Part 1.','Stopping after one minute in Part 2.','Memorised answers; examiners notice and mark them down.']},

{id:'is-criteria', exam:'ielts', sec:'speaking', title:'Speaking criteria & pronunciation', mins:8,
summary:'What each criterion means and practical ways to improve each one.',
body:`
<ul>
<li><b>Fluency and Coherence:</b> speak at a natural pace without long pauses, and connect ideas (because, so, although).</li>
<li><b>Lexical Resource:</b> topic vocabulary and paraphrase when you can't find a word.</li>
<li><b>Grammatical Range and Accuracy:</b> mix tenses and complex sentences (relative clauses, conditionals).</li>
<li><b>Pronunciation:</b> clear individual sounds, word stress, and intonation. An accent is fine; clarity is what counts.</li>
</ul>
<p>Practise by recording yourself answering a Part 2 card, then listening for long pauses and repeated words.</p>`,
fast:['Stress the key word in each sentence to sound natural.'],
example:{q:'You forget the word "commute". What do you say?', a:`Paraphrase: "the journey to work every day". Paraphrasing shows Lexical Resource.`},
traps:['Speaking very fast to sound fluent; it lowers clarity.']},

/* ================= IELTS SCORES & ACCURACY ================= */
{id:'i-bands', exam:'ielts', sec:'scores', title:'Band scores & rounding', mins:6,
summary:'How four skill bands become one overall band.',
body:`
<p>Each skill gets a band from 0 to 9 in half steps. The overall band is the average, rounded:</p>
<ul>
<li>Ends in .25 → round <b>up</b> to the next half: 6.25 → 6.5.</li>
<li>Ends in .75 → round <b>up</b> to the next whole: 6.75 → 7.0.</li>
<li>Anything else goes to the <b>nearest</b> half band: 6.125 → 6.0, 6.375 → 6.5, 6.625 → 6.5, 6.875 → 7.0.</li>
</ul>
<p>Worked: L 6.5, R 6.5, W 5.5, S 6.0 → total 24.5 → average 6.125 → <b>6.0</b>.</p>
<p>Worked: L 6.5, R 6.5, W 6.0, S 6.0 → average 6.25 → <b>6.5</b>.</p>`,
fast:['Add the four bands, divide by 4, then apply the .25/.75 rule.'],
example:{q:'L 7.0, R 7.5, W 6.0, S 6.5', a:`Total 27.0 → average 6.75 → rounds up to <b>7.0</b>.`},
traps:['Rounding 6.25 down to 6.0.']},

{id:'i-grammar', exam:'ielts', sec:'scores', title:'Accuracy essentials', mins:12,
summary:'Articles, tenses and complex sentences: the errors that cap Writing and Speaking at band 6.',
body:`
<h3>Articles</h3>
<ul><li><b>a/an</b>: one of many, first mention. <b>the</b>: a specific one both people know. No article for general plural or uncountable nouns: "Technology changes education."</li></ul>
<h3>Tenses for Task 1</h3>
<ul><li>Past data → past simple ("rose"). Future projections → "is expected to", "is projected to". Present tables with no date → present simple.</li></ul>
<h3>Complex sentences</h3>
<ul>
<li>Relative clause: "Cities that invest in buses reduce congestion."</li>
<li>Conditional: "If governments taxed fuel, people would drive less."</li>
<li>Concession: "Although it is costly, it saves time."</li>
</ul>
<p>Band 7 needs <i>frequent</i> error-free complex sentences. Fewer, correct sentences beat ambitious, broken ones.</p>`,
fast:['Read your essay once just for articles and verb endings.'],
example:{q:'Correct: "The unemployment rose in 2010."', a:`"Unemployment rose in 2010." General uncountable noun, no article.`},
traps:['Mixing present and past when describing past data.']}
];
