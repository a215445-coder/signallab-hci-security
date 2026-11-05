# SignalLab — revised demonstration

Actual UI captures and illustrative motion graphics. Neural English narration at +12% generation rate and 1.32× pitch-preserving tempo adjustment. No peer-study footage.

## 0:00 — SignalLab

A warning can catch an attack, or interrupt a genuine task. SignalLab lets you explore both outcomes, then connect them to human centred security design.

## 0:06 — A familiar message can mislead

An urgent campus message asks you to act. A familiar name and a polished layout can feel convincing. The useful question is: what evidence supports the request?

## 0:13 — What changes when the threshold falls?

Before the results appear, choose a prediction. The distractors expose two misconceptions: that both errors must decrease, or that a different warning rule makes the messages themselves more dangerous.

## 0:22 — Start at threshold 4

At threshold four, three threats trigger warnings. One threat is missed. One genuine task is interrupted. These counts come from eight disclosed teaching messages, split evenly between phishing and legitimate examples.

## 0:32 — Lower the threshold to 2

Now lower the threshold to two. All four authored threats trigger warnings, but two genuine tasks are interrupted. Changing the threshold changes the decision rule; the message evidence stays fixed.

## 0:41 — More sensitive means more interruptions

Compare the two runs. Missed threats fall from one to zero, while false alarms rise from one to two. This is the central trade-off: catching more attacks may consume more attention.

## 0:49 — Always warn? Never warn?

The boundary cases clarify the rule. Threshold zero warns on every message. Threshold ten warns on none. One catches every authored threat; the other avoids interruptions but misses all four threats.

## 0:58 — Follow one message through the calculation

Open a message trace. The selected example has three points for an unfamiliar service, zero for a sensitive request, one for urgency, and zero for an unexpected task. The total is four.

## 1:07 — 4 ≥ 4 → show a warning

The score equals the threshold, so the interface warns. The authored ground truth then determines whether that warning is useful or unnecessary. A cue score by itself does not establish whether a message is legitimate.

## 1:16 — A generic warning leaves work to the learner

Next, hold the message fixed and change only the interface. A minimal notice offers little explanation. It asks the learner to work out which evidence matters and what action to take.

## 1:24 — Make the safer action understandable

Actionable guidance names the relevant evidence and gives a practical next step. The fictional destination differs from the known campus service. The warning explains that difference instead of relying on visual alarm alone.

## 1:33 — Expose the actual destination

The destination inspector reveals the full address without opening it. This supports recognition and inspection. It also makes an important distinction visible: a familiar display name does not authenticate the sender or the linked service.

## 1:43 — Mira connects the story to the rule

Mira explains the inbox gatekeeper metaphor beside the technical process. The same HTML file contains the avatar, interface and calculations. There are no real sign-ins, credential fields or phishing destinations to visit.

## 1:54 — Three levels. Visible recommendations.

Practice spans three authored difficulty levels. Two preferred decisions suggest more challenge. Two risky decisions unlock an evidence hint and an easier-level suggestion. Cautious independent verification remains a safe alternative, with no negative score.

## 2:05 — Choose an action AND a reason

The fresh-case check records an action, a reason and confidence. Explanations wait until all three cases are completed. Requiring a reason helps reveal the learner’s thinking, rather than treating a lucky choice as understanding.

## 2:15 — Recall without the inbox

The report separates first attempts from repeated practice. Recall hides the inbox, and previously missed ideas return when the learner reopens the app. Progress stays locally in the browser and can be exported.

## 2:24 — Evidence informs the design

The research log records actual Scopus AI and NotebookLM use, source checks and corrections. Machine classification accuracy was not treated as proof of student learning. Software checks and real human review are recorded separately.

## 2:35 — Explore. Explain. Apply.

SignalLab makes a security decision visible, lets learners change it, and asks them to explain the result. Try the public simulator and inspect the source. Peer trials and course review remain pending; learning gains have not been measured.