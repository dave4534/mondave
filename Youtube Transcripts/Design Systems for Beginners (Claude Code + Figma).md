
The full transcript of the video **"Design Systems for Beginners (Claude Code + Figma)"** by *The Design Project* is provided below:

0:00 Your design system is built for humans.
0:03 And that's the problem. The moment you
0:05 hand it to an AI agent, it starts
0:07 inventing buttons, guessing at spacing,
0:09 hallucinating variants you didn't even
0:11 build, it is silently asking five
0:14 questions. Should I use this component?
0:17 Which variant? What goes inside of it?
0:21 What rules must I obey? And what should
0:24 I never do? Your Figma file does not
0:27 answer them. Your readme sort of kind of
0:29 does your Claude maybe, but if your
0:32 agent can't read between the lines, it's
0:34 not going to understand. So, in this
0:36 video, I'm going to show you how to
0:38 build a component library that isn't
0:39 just for humans, but it's also going to
0:42 be for agents. Same components, same
0:44 decisions, but encoded as a structured
0:47 metadata and AI can actually query. So,
0:50 now you'll be able to ship features that
0:52 actually pull the components directly
0:54 into code, and it's speaking its
0:56 language. It's going to make things
0:58 speed up 10x what you currently have and
1:00 it's really exciting from both the
1:02 design and engineering standpoint. Hey,
1:04 I'm Diane. I'm the founder of the design
1:06 project. We work with SAS B2B companies
1:08 to ship products faster. We worked with
1:10 companies that have been acquired by
1:11 Slack, Nvidia, and Mr. Beast. Let's get
1:14 started. This is kind of the mental
1:16 model and the three pillars that each
1:19 component should always include this
1:21 idea of props. So, properties um these
1:24 are things. So if we look into Figma,
1:26 these are basically all of our
1:29 definitions. Um, false, true, all of the
1:33 different states. Those are the
1:34 properties that we're aligning to. And
1:37 then relationships, what the agent must
1:39 understand before placing a component.
1:41 So what is it a child of, what's the
1:44 parent, what will it when will it be
1:46 used most often in a form, in um a text
1:50 box, things like that. So just defining
1:51 it very clearly, the relationship. And
1:53 then of of course tokens which we know
1:55 have always been really important in
1:56 design systems um they become even more
1:59 important and we're going to talk in a
2:00 minute about the best setup for design
2:02 systems something like this. So then if
2:06 we talk more specifically about metadata
2:09 there are four different decisions that
2:11 need to go into it. The first one is
2:13 what is the state? What are the implied
2:15 tokens? Is it a primary primary hover
2:18 press disabled? These are super
2:20 important. um as well as the variance.
2:22 Um so if we think about the axes, what
2:25 is the appearance? What is the size?
2:27 What is the density? It lets the agent
2:29 pick up on the cell. We'll talk a little
2:30 bit more about this and the
2:32 accessibility. So how is it rel in
2:34 relation to everything? Um and you
2:37 describe basically you describe how the
2:39 component fits in. What is the purpose
2:41 of it? And that's super important. And
2:43 it's basically like what they always
2:45 say, what's the um Carpathy quote that
2:48 AI language is English. So we're
2:50 basically just communicating very
2:52 clearly what the point of that button or
2:55 that state or that field is. And then
2:58 just as important as we want to say when
2:59 not to use it. Um
3:02 and I've been doing this more and more
3:04 and I think this is just I say this in a
3:05 lot of my videos. AI you have to
3:07 instruct it not to do what not to do
3:10 which is almost just as important as
3:12 what you are supposed to do and what
3:15 this metadata will look like and I'll
3:18 show you more of how we actually create
3:20 this but what this metad data could look
3:22 like is something like this right um so
3:24 it's defining the component it's saying
3:27 what it the relationship the tokens and
3:30 these hence how to use it how not to use
3:32 it um priority things like that so this
3:35 is kind of what each component component
3:37 should have under the hood. Okay. So,
3:39 there's a few steps that I'm going to
3:40 take you on this journey for us to be
3:42 able to actually create this. Um, but
3:45 before that, one other thing I want to
3:48 communicate is all of these files that
3:51 we're going to be creating for each
3:52 component like I was just mentioning
3:55 about metadata. So, this is a really
3:58 good visual representation. We have the
4:00 actual component which is the
4:02 implementation. Behind it, we have the
4:04 metadata. So those are what we just went
4:06 through. Um the four pillars, the AI
4:08 hints, then we have the tokens. What is
4:11 the button? Well, this is for a button
4:13 specifically. So what is the button
4:14 token CSS? And then we are going to be
4:19 creating all of these components in
4:21 storybook. So storybook is a really
4:24 great framework for the team to visually
4:28 see clearly how each component interacts
4:33 and is built. And it's also a place
4:35 where we can keep this as the source of
4:37 truth. So I've loved storybook forever
4:39 and I think it's even more important now
4:41 with AI in the picture because we can
4:42 get into the details and see them very
4:44 clearly. So we will be creating a story
4:46 book. Um which is super cool. And then
4:49 there's this test idea. So we can
4:51 actually make sure that every time a
4:53 component is used that it's actually
4:54 testing that it is in the right place
4:56 and it's following all the rules. And
4:57 then just an index for it. So let's get
4:59 started. You're going to go into your
5:00 terminal. Okay. and we're going to be
5:03 working on cal.com. I use cal.com as my
5:06 example in a lot of my videos. It's an
5:08 open source platform. It's amazing. We
5:10 are going to be building components in
5:11 cal.com. So, I'm in the repo. There are
5:15 a couple of amazing skills
5:19 that I'm going to pull up right now that
5:21 are from this awesome guy. Shout out to
5:23 you, Chris, for creating them. Um, this
5:26 one right here, AI component metadata is
5:30 amazing because everything you saw how
5:32 we built well I showed you that example.
5:34 He basically has a skill so that it'll
5:36 run and it'll create this or ask the
5:38 right questions to make sure that this
5:40 is in all of your components. I'll send
5:42 you the link to this but basically npx
5:45 cloud skill and I'm going to be
5:46 installing the AI component metadata
5:48 skill. It is installed. Yay. This is
5:50 going to be awesome. So now I'm going to
5:51 open Claude.
5:53 And first things first, if you're a
5:55 designer or someone that is
5:57 experimenting and wanting to try this
5:59 and you're in your company repo, you
6:01 should make a branch. Um, basically
6:02 you're going to make a si you're going
6:04 to work in a branch and you're going to
6:05 be creating a sibling package inside so
6:08 that you are actually just creating your
6:10 components in this separate folder. And
6:13 when you're ready and it all works and
6:15 you can test it, then you can move over
6:17 to this new component library with your
6:19 whole product. But I suggest that we
6:23 create a sibling package. Um, and
6:25 basically what this means is that you
6:27 can just switch over to it later. So
6:29 first things first is let's create a new
6:32 branch. Um, I'm going to call it aentic
6:35 design systems.
6:41 Okay. Okay. So, I'm going to do step
6:42 one. Um, so I have again, so I have this
6:46 MD file that I use, which is basically
6:49 through all my knowledge I created it. I
6:51 will create a skill soon. I'm still
6:53 testing it out to make sure it's got all
6:55 the pieces together. But if you guys are
6:57 interested in actually getting this file
7:00 and working with it, I am actually
7:02 creating a community. It's called the
7:04 TDP community. Um, and it's a place
7:06 where you can sign up and you can get
7:08 access to all of these awesome files and
7:11 skills that I'm creating as well as we
7:13 do workshops and monthly we come
7:15 together and we do like a live working
7:17 session if that's something you're
7:18 interested in. There is a link in the
7:20 description. If not, you can just kind
7:22 of create this yourself and work through
7:24 it and ask questions to cloud code and
7:26 it's going to define it for you. Um, so
7:28 what I want to say is basically I want
7:29 to create this. Okay, perfect. So now
7:31 it's going to create this UI next
7:34 package
7:36 which I'll build all my components off
7:38 of.
7:40 So next we want to have this defined
7:43 schema. So I'm actually it is a skill.
7:46 Um so we actually have that skill
7:48 already in there. And I'm also just
7:49 going to make sure it knows that this is
7:51 the
7:53 the format. Step two,
7:58 find the metadata
8:02 should
8:05 all components should
8:16 perfect.
8:19 Okay. And then we're going to actually
8:21 build one component first.
8:24 component has this
8:30 is gentic.
8:33 It is. So my example
8:37 says button
8:43 component.
8:45 So basically copying this perfect
9:00 Perfect. So now it built these out as a
9:03 template to add to a component. Copy
9:05 template and put it find and replace.
9:08 Okay. So let's first spin up storybook.
9:22 So what you'll see here is I actually
9:24 have a plugin called context 7. I
9:27 suggest you guys use it. It basically
9:29 means that anything open source it'll go
9:31 and it'll read all the documentation. So
9:33 it is pulling and creating what it needs
9:35 to do. Looks like it's done and it's
9:37 working. So we have storybook going. The
9:40 next thing we want to do is we want to
9:42 go into Figma and check out um all of
9:43 our components. Okay. So now we're in
9:45 Figma and this is our component library
9:49 that we have. We have everything
9:51 documented here which is great.
9:54 Um and we're going to start with
9:56 something simple. We're going to start
9:57 with buttons. So here are all of our
9:59 button states. And remember when we are
10:01 looking at the metadata properties. So
10:03 it is important that you guys make sure
10:05 that your components are built in a way
10:08 that has all of the states defined
10:11 clearly. Um, so you can see here we have
10:15 all of these states, type, state, size,
10:18 icons, everything here, which is
10:20 perfect. The other thing that is really
10:23 important that we want to look at is if
10:25 this is good, we also want to look at
10:27 variables.
10:29 So what is the example of a good
10:30 variable and a bad variable? This is a
10:33 good variable. See how everything um we
10:36 we define it as emphasis, default,
10:38 subtle. Um actually let's take a look at
10:40 a bad example so you can compare primary
10:42 secondary like this and then it has the
10:46 actual coded colors in here right so a
10:51 good example is when you define how it
10:53 should be used emphasis default subtle
10:56 that's actually speaking more English so
10:59 the AI can understand more of the
11:01 context behind it as well as the core
11:04 colors that are clearly defined so core
11:06 gray 200 these are examples of um how a
11:10 good design system should be structured.
11:12 The other really important thing here is
11:14 see how we have this description. Um so
11:18 I suggest that you go in and you make
11:20 sure that all of your tokens have really
11:22 good descriptors to them. Um and so it
11:26 just helps the AI know when to use this
11:29 color active items and emphasizing.
11:33 Let's look at this one.
11:36 Oh, this one's not defined.
11:39 Hovers on items, subtle raising. So,
11:41 it's just communicating, right? So,
11:43 those are some of the core things that
11:45 you should make sure that your
11:47 components do clearly have. Um, so let's
11:50 go back to our file here,
11:53 and we're going to start with one
11:54 component. So, what we're going to do
11:57 is, um, so we, if you set up your, um,
12:02 your Figma console MCP, you'll see it
12:04 here. And what we're going to do is we
12:07 are going to copy this link.
12:12 And now we're going to go in here and
12:14 we're going to say using the Figma MCT
12:17 council
12:20 and knowledge
12:22 of how to create a component that we
12:25 defined above.
12:28 take the button component in Figma and
12:33 turn them into
12:39 a component in storybook that is agent.
12:44 That's the word I'm looking for. Okay.
12:46 So then I'm going to paste the link and
12:49 let's get to work.
12:51 So see how it's getting all of the
12:53 details. The primary, secondary, ghost,
12:56 destructive, and the five states.
12:57 Perfect. And two sizes.
13:01 And while this is working, I wanted to
13:03 call out that if you are implementing
13:07 your design system into your current
13:09 product and you are looking for ways of
13:11 how to make sure your whole team is more
13:14 designed to code, I am currently running
13:16 workshops to help teams adapt these best
13:18 practices um and kind of give you a
13:22 playbyplay of how you and your team
13:24 personalized can go into this workflow
13:27 and be able to actually produce
13:29 front-end code so that your team from
13:32 designers to engineers have a way more
13:36 closely knit, tighter, faster design to
13:40 dev loop. So if you're interested, there
13:42 is a more details in the description.
13:45 You can sign up. Okay, so it looks like
13:46 now it's creating all of these files,
13:48 right? The six different files. So the
13:50 first one it's working on
13:56 is the CSS. Perfect. Okay, now it's the
13:58 button. Perfect.
14:01 Now it's writing the meta, right? So,
14:04 this is the one we saw a few times. Um,
14:06 let's take let's actually say yes and
14:08 then let's take a look at it. Oh, we'll
14:11 have to go back. Perfect. Here it is.
14:14 So,
14:20 button category atom perfect interactive
14:24 trigger a single decisive action. the
14:27 most common interactive primitive use
14:28 exactly one per intent and let visual
14:30 variant signals hierarchy. This might be
14:32 something I want to change a little bit
14:34 more but it's a good start. Um so the
14:37 variance there's primary secondary
14:38 minimal destructive and then it explains
14:41 a little bit why primary the service
14:43 main CTA secondary supporting minimal
14:46 destructive irreversible amazing and
14:49 then when to use the primary standalone
14:52 CTAs
14:56 and then within this one um loading b
14:59 okay the boolean we have disabled we
15:02 have the leading icon on click Again,
15:06 every description, right? This is the
15:08 most powerful thing, making sure
15:10 everything has a description. The
15:12 variance,
15:16 relationships,
15:20 common patterns, and dialogue form,
15:22 toolbar,
15:25 tokens.
15:27 These are all of the defined tokens.
15:29 It's using spacing.
15:32 I love this. This is so good. Um, and
15:34 this is also a place you should go back
15:35 and forth. So if you read something that
15:36 doesn't make sense, go and make changes.
15:38 Make sure this is optimal. Um, and this
15:41 is a process, right? This is not
15:42 something where you guys just accept
15:43 everything and do it. If you really want
15:45 your aentic design system to work, you
15:47 need to make sure that it does have all
15:49 the information and you need to read
15:51 through and make sure it's correct. And
15:52 then the AI hints common patterns
15:55 destructive. Okay, perfect. Can use it
15:58 as submit as a common pattern. Okay.
16:03 anti patterns. Two primary buttons side
16:05 by side. We don't want that. Using
16:07 buttons for navigation disabled. I
16:09 probably actually have a lot more anti
16:10 patterns and you and your product should
16:12 go in and there's probably specific
16:14 places where you know don't work. This
16:16 is living and breathing so you can
16:17 always come in and update. Um but this
16:19 is a little generic and I would go
16:20 deeper and deeper into it to make sure
16:22 that we are covering all the anti
16:24 patterns.
16:25 This is really good. Now it's going to
16:27 create the stories for story book.
16:30 Okay. So, seeing what went into building
16:32 this one button, we now have these six
16:35 files within the button file.
16:41 Let's check it out.
16:46 Oh, we don't have the right fonts. We'll
16:48 make sure fonts are in there.
16:50 Interesting. Um what it does have
16:53 primary secondary minimal destructive
16:58 and let's yeah let's go back. So we
17:01 definitely have some issues here we can
17:02 see right. So if we go to the Figma
17:07 it's not pulling some of these patterns
17:09 for the destructive.
17:15 Oh there it is on hovers destructive
17:17 which
17:19 oh actually it is sorry it is correct.
17:21 is correct on hover. Perfect. That makes
17:23 sense. Um,
17:27 yeah, it didn't pull some of the tokens
17:28 like the typography. So, I'm going to
17:30 ask some questions about it, but I'm
17:32 just looking to see a little bit more.
17:36 Right. Perfect. Okay. Loading actually
17:40 looks different than this loading. Okay.
17:41 So, you'll see you guys got to go in. We
17:43 got to get really detailed. And I'm
17:45 Figma can only take us so far. So, it's
17:47 here. Um let's go in and let's actually
17:50 pick up and fix some of these things.
17:56 So first one, let's go in. Um
18:00 if we look at
18:03 the button styling
18:06 looks like it is not picking up the
18:10 font.
18:14 Why not?
18:22 Okay, perfect. So now it's What was
18:24 wrong was it essentially was not pulling
18:29 from the defined um cal.com
18:33 repo. And so now it's going to make sure
18:37 that it's inheriting the fonts that are
18:40 defined, which means that of course it's
18:43 living and breathing. So if you change
18:44 the font family, it'll change
18:45 everywhere. Um, so now it just needs to
18:49 make these changes.
18:51 Okay, perfect.
19:00 I should be following
19:03 the media
19:09 to a little bolt here.
19:18 Um, okay. So, each of these should now
19:21 function
19:24 correctly.
19:27 And now the metadata is under the hood
19:30 so that everything's connected.
19:32 Actually, before I move on, I want to
19:34 ask
19:58 So what I'm telling it is to make sure
20:00 that like what so what happened was
20:02 there was an error. It wasn't pulling up
20:03 the right fonts and I am understanding
20:06 more but I don't understand the reasons
20:08 why. So I'm asking it okay so how do we
20:09 make sure as we build more components
20:11 that it's going to make sure that it
20:13 will be checking and making sure it's
20:14 pulling the right tokens. So this is
20:16 also as you build it, you're creating
20:20 more processes and turn we're going to
20:22 turn this into a skill. Um that would be
20:24 the goal at the end when you feel like
20:26 you're actually building components and
20:28 it makes sense. I would suggest doing a
20:29 few more components and you feel like
20:30 it's got it and it's working well you
20:32 create that skill so it just pulls from
20:34 that skill. Great. So that's basically
20:38 the first component and that's how you
20:40 would continue. So then you would do
20:41 icon buttons and this one could go a
20:44 little smoother, right? And then you
20:45 would go and check and make sure and
20:47 then you're building all these
20:48 components and under the hood you are
20:51 basically creating this agentic AI
20:54 system so that as you build the
20:59 component library when you're ready
21:01 you'll be able to go in and say I want
21:04 to build a page and it's going to
21:06 understand the context of the page and
21:08 make sure that it's pulling the
21:09 components that make the most sense
21:11 because of how you defined them very
21:13 clearly in the metadata. at it and with
21:15 all the descriptions and what anti not
21:18 to use. Um, I hope this was really
21:20 helpful. I am going to continue to
21:22 create more videos about design systems,
21:23 getting more in depth of how to make
21:24 sure you really truly are building the
21:26 best agentic system you can. And please
21:28 like and subscribe. I'm putting out
21:30 content weekly on how to build quicker
21:32 with AI. Thanks so much.